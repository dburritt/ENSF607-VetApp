/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const HealthRecord = ({ user, animal, pageDispatch }) => {

    const [healthRecords, setHealthRecords] = useState([]);
    const [inEditMode, setEditState] = useState(false);
    const [newRecordType, setNewRecordType] = useState("");
    const [newRecord, setNewRecord] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [value, setValue] = useState(true);

    useEffect(() => {
        console.log(animal)
        fetchAnimalHealthRecord()
    }, [value]);

    const returnHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    }

    const navigationHandler = (event) => {
        if (event.target.value === "Animal Profile") {
            pageDispatch({
                nextPage: "animalProfile"
            });
        }
        if (event.target.value === "Weight Record") {
            pageDispatch({
                nextPage: "weightRecord"
            });
        }
        if (event.target.value === "Health Record") {
            pageDispatch({
                nextPage: "healthRecord"
            });
        }
        if (event.target.value === "Pictures") {
            pageDispatch({
                nextPage: "pictures"
            });
        }
        if (event.target.value === "Comments") {
            pageDispatch({
                nextPage: "comments"
            });
        }
    }
    const fetchAnimalHealthRecord = () => {
        axios.get(`http://localhost:8001/api/animals/healthrecord/?id=${animal.id}`)
            .then((res) => {
                console.log(res.data);
                setHealthRecords(res.data);
            })
            .catch((err) => {
                console.log(err);
                setHealthRecords(null);
            });
    };
    const resetState = () =>{
        setEditState(false);
        setNewRecordType("");
        setNewRecord("");
        setNewNotes("");
    }
    const addHandler = () => {
        if(newRecord.length === 0){
            alert("Record must be entered.")
            return
        }
        axios.post(`http://localhost:8001/api/animals/healthrecord?id=${animal.id}`, JSON.stringify({
            type: newRecordType, record: newRecord, notes: newNotes}))
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
            resetState();

    }
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
    const editingHandler = () => {
        setEditState(!inEditMode)
    }
    const recordTypeHandler = (event) => {
        setNewRecordType(event.target.value)
    }
    const recordHandler = (event) => {
        setNewRecord(event.target.value)
    }
    const notesHandler = (event) => {
        setNewNotes(event.target.value)
    }
    return (
        <div className="column is-centered is-three-quarters">
            <div className="box">
                <div className="columns is-full"
                    css={css`max-height: 90px;`}>
                    <div className="column is-one-quarter" >
                        <div className="box" css={css`height: 90px;`}>
                            Profile picture
                        </div>
                    </div>
                    <div className="column is-one-quarter">
                        <div className="box" css={css`height: 90px;`}>
                            <nav >
                                <ul css={css`list-style-type: none;
                                margin: 0em;
                                padding: 0;
                                max-height: 90px;`}>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Name: {animal.name}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Type: {animal.subspecies}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Colour: {animal.color}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Status: { }</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="column is-one-half">
                        <div className="box" css={css`height: 90px;`}>
                            Reminders
                        </div>
                    </div>
                </div>


                
                    <div className="box">
                        <div className="columns is-full">
                            <div className="column is-half">
                                Health Record
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType !== "Student" ? (
                                    <button className="button is-success" onClick={editingHandler}>Add Record</button>
                                ) : null}
                            </div>
                        </div>
                        <div className="column is-full">
                            <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>Record Type</th>
                                        <th>Record</th>
                                        <th>Date</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody class="table is-primary">
                                {inEditMode ? (
                                        <tr>
                                            <td>
                                                <input
                                                    className="input is-small"
                                                    onChange={recordTypeHandler}
                                                    type="text" step=".1" />
                                            </td>
                                            <td>
                                                <input
                                                    className="input is-small"
                                                    onChange={recordHandler}
                                                    type="text" step=".1" />
                                            </td>
                                            <td>Current Date</td>
                                            <td>
                                                <input
                                                    className="input is-small"
                                                    onChange= {notesHandler}
                                                    type="text" />
                                            </td>
                                           <td> <button
                                                    onClick={() => addHandler()}
                                                    className="button is-small is-success is-rounded">
                                                    ADD</button></td>
                                        </tr>
                                    ) : null}   
                                {healthRecords != null ? (
                                    healthRecords.map((healthRecord, index) => {
                                        const { date, type, record, notes } = healthRecord
                                        return (
                                            <>
                                                <tr key={date}>
                                                    <td>{type}</td>
                                                    <td>{record}</td>
                                                    <td>{timeConverter(date)}</td>
                                                    <td>{notes}</td>
                                                </tr>
                                            </>
                                        )
                                    })
                                    ) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>


            </div>
            <div className="columns"
                css={css`position: relative;
                            width: 100%;
                            margin-right: auto;
                            margin-left: auto;
                            margin-bottom: 0.5rem;`}>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Animal Profile" onClick={navigationHandler}>Animal Profile</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Weight Record" onClick={navigationHandler}>Weight Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Health Record" onClick={navigationHandler}>Health Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Pictures" onClick={navigationHandler}>Pictures</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Comments" onClick={navigationHandler}>Comments</button>
                </div>
            </div>
            <div className="columns is-centered"
                css={css`position: relative;
                            width: 30%;
                            margin-left: auto;
                            margin-right: auto;`}>
                <div className="column">
                    <button className="button is-fullwidth is-small is-success" css={css`width: 90%;`} onClick={returnHandler}>Return to Search</button>
                </div>
            </div>
        </div>
    )

}

export default HealthRecord