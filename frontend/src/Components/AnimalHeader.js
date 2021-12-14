/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const AnimalHeader = ({ user, animal }) => {

    const [value, setValue] = useState(true);
    const [images, setImages] = useState([]);

    useEffect(async () => {
        if (typeof(await fetchAnimalImages()) !== 'undefined'){
            document.getElementById("profilePic").src = `data:image/jpeg;base64,${await fetchAnimalImages()}`;
        }
        fetchReminders();
        fetchStatus();
    }, [value]);

    const fetchReminders = () => {
        axios.get(`http://localhost:8001/api/animals/reminders?animalId=${animal.id}`)
            .then((res) => {
                setAnimalReminders(res.data.animalReminders);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getReminderFirstName = (reminderId, userId) => {
        axios.get(`http://localhost:8001/api/users/register?id=${userId}`)
            .then((res) => {
                if (document.getElementById(reminderId + 1) !== null) {
                    document.getElementById(reminderId + 1).innerText = res.data.users[0].fname;
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const editRemindersHandler = () => {
        setEditReminderState(!editReminderState);
        if (editReminderState) {
            var confirmation = window.confirm("Apply changes?");
            if (confirmation) {
                for (let reminder in animalReminders) {
                    axios.put(`http://localhost:8001/api/animals/reminders?reminderId=${animalReminders[reminder].reminderId}`, JSON.stringify({
                        text: animalReminders[reminder].text, dueDate: animalReminders[reminder].dueDate
                    }))
                }
            }
        }
        setValue(!value);
    }

    const addRemindersHandler = () => {
        if (newReminderText.length === 0) {
            alert("Reminder text field must be entered.")
            return
        }

        axios.post('http://localhost:8001/api/animals/reminders', JSON.stringify({
            userId: user.userId, text: newReminderText, creationDate: dateToUnixConverter(getTodayForMax()),
            dueDate: dateToUnixConverter(newReminderDueDate), animalId: animal.id
        }))
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
        setNewReminderText("");
        setNewReminderDueDate(getTodayForMax());
    }

    const deleteReminderHandler = (reminderId) => {
        axios.delete(`http://localhost:8001/api/animals/reminders?reminderId=${reminderId}`)
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const reminderTextUpdateHandler = (event, index) => {
        setAnimalReminders(prevAnimalReminders => {
            const newAnimalReminders = [...prevAnimalReminders];
            newAnimalReminders[index].text = event.target.value;
            return newAnimalReminders;
        })
    }

    const reminderDueDateUpdateHandler = (event, index) => {
        setAnimalReminders(prevAnimalReminders => {
            const newAnimalReminders = [...prevAnimalReminders];
            newAnimalReminders[index].dueDate = dateToUnixConverter(event.target.value);
            return newAnimalReminders;
        })
    }

    const fetchAnimalImages = async () => {
        return await axios.get(`http://localhost:8001/api/users/image?AnimalId=${animal.id}`)
            .then((res) => {
                setImages(res.data.images);
                return res.data.images[0].imageData;
            })
            .catch((err) => {
                console.log(err);
            });
        
    };

    const fetchStatus = () => {
        axios.get(`http://localhost:8001/api/animals/status?animalId=${animal.id}`)
            .then((res) => {
                setAnimalStatus(res.data.animalStatus.status);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const reminderTextHandler = (event) => {
        setNewReminderText(event.target.value)
    }
    const reminderDueDateHandler = (event) => {
        setNewReminderDueDate(event.target.value)
    }

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var year = a.getFullYear();
        var month = (a.getMonth() + 1) < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
        var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
        var time = year + '-' + month + '-' + date;
        return time;
    }

    const dateToUnixConverter = (dateString) => {
        let dateStringSplit = dateString.split("-")
        let date = new Date();

        date.setDate(dateStringSplit[2]);
        date.setMonth(dateStringSplit[1] - 1);
        date.setFullYear(dateStringSplit[0]);

        let unixSeconds = Math.floor(date.getTime())

        return unixSeconds;

    }

    const getTodayForMax = () => {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;

    }

    const [editReminderState, setEditReminderState] = useState(false);
    const [animalReminders, setAnimalReminders] = useState([]);
    const [newReminderText, setNewReminderText] = useState("");
    const [newReminderDueDate, setNewReminderDueDate] = useState(getTodayForMax());
    const [animalStatus, setAnimalStatus] = useState("");

    return (
        <div className="columns is-full"
            css={css`height: 200px;`}>
            <div className="column is-one-quarter" >
                <div className="box" css={css`height: 100%;`}>
                    <div className="columns is-full"
                        css={css`height: 200px;`}>
                        <div className="column is-half" >
                            {(images !== null && images.length !== 0) ? (
                                <img id="profilePic"/>
                            ) :
                                <div className="subtitle is-6 has-text-centered">
                                    No picture available
                                </div>}
                        </div>
                        <div className="column is-half" >
                            <nav className="list is-pulled-right">
                                <ul css={css`list-style-type: none;
                                margin: 0em;
                                padding: 0;
                                max-height: 90px;`}>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1rem; margin-top: -1rem;`}>
                                        <div className="subtitle">
                                            {animal.name}
                                        </div>
                                    </li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1rem; margin-top: -1rem;`}>{animal.subspecies}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1rem; margin-top: -1rem;`}>{animal.color}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1rem; margin-top: -1rem;`}>Status: {animalStatus}</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="column is-three-quarters">
                <div className="box" css={css`height: 100%;
                                                        padding:4px;
                                                        overflow-x: hidden;
                                                        overflow-y: auto;
                                                        position: relative;`}>
                    <div className="subtitle">
                        Reminders
                        {user.accountType !== "Student" ? (
                            <button className="button is-success is-small is-pulled-right" onClick={editRemindersHandler}>
                                {!editReminderState ? (
                                    "Edit Reminders"
                                ) : "Save / Return"}
                            </button>
                        ) : null}

                    </div>
                    <div>
                        <table className="table has-text-centered" css={css`position: absolute; top: 40px; width: 99%;`}>
                            <thead class="table is-primary">
                                <tr>
                                    <th>Name</th>
                                    <th css={css`width: 20%;`}>Due Date</th>
                                    <th css={css`width: 20%;`}>Creation Date</th>
                                    <th css={css`width: 50%;`}>Reminder</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody class="table is-primary">
                                {editReminderState ? (
                                    <tr>
                                        <td>{user.name}</td>
                                        <td><input
                                            value={newReminderDueDate}
                                            onKeyDown={(e) => e.preventDefault()}
                                            onChange={reminderDueDateHandler}
                                            css={css`
                                                            max-width: 100%;
                                                            `}
                                            className="input is-small"
                                            type="date"
                                            min={getTodayForMax()} /></td>
                                        <td>{getTodayForMax()}</td>
                                        <td><input
                                            value={newReminderText}
                                            onChange={reminderTextHandler}
                                            css={css`
                                                            max-width: 100%;
                                                            `}
                                            className="input is-small"
                                            type="text"
                                            placeholder="Enter reminder text." /></td>
                                        <td>
                                            <button
                                                onClick={() => addRemindersHandler()}
                                                className="button is-small is-success is-rounded">
                                                ADD</button>
                                        </td>
                                    </tr>
                                ) : null}
                                {animalReminders.map((reminder, index) => {
                                    const { reminderId, dueDate, creationDate, text, animalId, userId } = reminder
                                    return (
                                        <>
                                            <tr key={reminderId}>
                                                <td id={reminderId + 1}>{getReminderFirstName(reminderId, userId)}</td>
                                                {!editReminderState ? (
                                                    <td>
                                                        {timeConverter(dueDate)}
                                                    </td>
                                                ) : <td>
                                                    <input
                                                        value={timeConverter(animalReminders[index].dueDate)}
                                                        onKeyDown={(e) => e.preventDefault()}
                                                        onChange={() => reminderDueDateUpdateHandler(window.event, index)}
                                                        css={css`
                                                                max-width: 100%;
                                                                `}
                                                        className="input is-small"
                                                        type="date"
                                                        min={getTodayForMax()}
                                                        placeholder={timeConverter(animalReminders[index].dueDate)} />
                                                </td>}
                                                <td>{timeConverter(creationDate)}</td>
                                                {!editReminderState ? (
                                                    <td>
                                                        {text}
                                                    </td>
                                                ) : <td><input
                                                    value={animalReminders[index].text}
                                                    onChange={() => reminderTextUpdateHandler(window.event, index)}
                                                    css={css`
                                                                    max-width: 100%;
                                                                    `}
                                                    className="input is-small"
                                                    type="text"
                                                    placeholder={animalReminders[index].text} /></td>}
                                                {editReminderState ? (
                                                    <td>
                                                        <button
                                                            onClick={() => deleteReminderHandler(reminderId)}
                                                            className="delete is-small is-danger">
                                                        </button></td>
                                                ) : <td></td>}
                                            </tr>

                                        </>
                                    )
                                })
                                }
                                <tr class="border_bottom"></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnimalHeader;