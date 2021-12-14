/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import WeightRecordGraph from './WeightRecordGraph'
import AnimalHeader from './AnimalHeader';
import AnimalFooter from './AnimalFooter';


const WeightRecord = ({ user, animal, pageDispatch }) => {
    const [weightRecords, setWeightRecords] = useState([]);
    const [inEditMode, setEditState] = useState(false);
    const [inDeleteMode, setDeleteState] = useState(false);
    const [newWeight, setNewWeight] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [value, setValue] = useState(true);

    useEffect(() => {
        fetchAnimalWeightRecord()
        console.log(animal)
    }, [value]);

    const editingHandler = () => {
        setDeleteState(false)
        setEditState(!inEditMode)
    }
    const deletingHandler = () => {
        setEditState(false)
        setDeleteState(!inDeleteMode)
    }

    const fetchAnimalWeightRecord = () => {
        axios.get(`http://localhost:8001/api/animals/weight/?id=${animal.id}`)
            .then((res) => {
                console.log(res.data.animalWeight);
                setWeightRecords(res.data.animalWeight);
            })
            .catch((err) => {
                console.log(err);
                setWeightRecords(null);
            });
    };
    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }
    const weightHandler = (event) => {
        setNewWeight(event.target.value)
    }
    const notesHandler = (event) => {
        setNewNotes(event.target.value)
    }
    const resetState = () => {
        setEditState(false);
        setNewWeight("");
        setNewNotes("");
    }
    const addHandler = () => {
        if (newWeight.length === 0) {
            alert("Weight must be entered.")
            return
        }
        axios.post(`http://localhost:8001/api/animals/weight?id=${animal.id}`, JSON.stringify({
            weight: newWeight, notes: newNotes
        }))
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
        resetState();

    }
    const deleteHandler = (animalId, date) => {
        axios.delete(`http://localhost:8001/api/animals/weight?id=${animalId}&time=${date}`)
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div className="column is-centered is-three-quarters">
            <div className="box" css={css`height: 72vh;
                                                        padding:4px;
                                                        overflow-x: hidden;
                                                        overflow-y: auto;
                                                        position: relative;`}>

                <AnimalHeader
                    user={user}
                    animal={animal} />

                <div className="box">
                    <div className="columns is-full">
                        <div className="column is-half">
                            Weight Record
                        </div>
                        <div className="column is-half has-text-right">
                            {user.accountType !== "Student" ? (
                                <button className="button is-success" onClick={editingHandler}>Add Record</button>
                            ) : null}
                            {user.accountType === "Admin" ? (
                                <button className="button is-danger" onClick={deletingHandler}>Delete Record</button>
                            ) : null}
                        </div>

                    </div>
                    <div className="box is-fullwidth">
                        {weightRecords != null ? (
                            <WeightRecordGraph data={weightRecords} />
                        ) : null}
                    </div>
                    <div className="table-container has-text-centered is-scrollable">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Weight</th>
                                    <th>Date</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inEditMode ? (
                                    <tr>
                                        <td>
                                            <input
                                                className="input is-small"
                                                onChange={weightHandler}
                                                type="number" step=".1" min="0" max="5000" />
                                        </td>
                                        <td>Current Date</td>
                                        <td>
                                            <input
                                                className="input is-small"
                                                onChange={notesHandler}
                                                type="text" />
                                        </td>
                                        <td> <button
                                            onClick={() => addHandler()}
                                            className="button is-small is-success is-rounded">
                                            ADD</button></td>
                                    </tr>
                                ) : null}

                                {weightRecords != null ? (
                                    weightRecords.map((weightRecord, index) => {
                                        const { animalId, date, weight, notes } = weightRecord
                                        return (
                                            <>
                                                <tr key={date}>
                                                    <td>{weight}</td>
                                                    <td>{timeConverter(date)}</td>
                                                    <td>{notes}</td>
                                                    {inDeleteMode ? (
                                                        <button
                                                            onClick={() => deleteHandler(animalId, date)}
                                                            className="delete is-small is-danger has-text-centered">
                                                        </button>
                                                    ) : null}
                                                </tr>

                                            </>
                                        )
                                    })
                                ) : null}
                                <tr class="border_bottom" />
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
            <AnimalFooter
                pageDispatch={pageDispatch} />
        </div>
    )

}

export default WeightRecord