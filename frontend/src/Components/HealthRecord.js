/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import AnimalHeader from './AnimalHeader';
import AnimalFooter from './AnimalFooter';

const HealthRecord = ({ user, animal, pageDispatch }) => {

    const [healthRecords, setHealthRecords] = useState([]);
    const [inEditMode, setEditState] = useState(false);
    const [inDeleteMode, setDeleteState] = useState(false);
    const [newRecordType, setNewRecordType] = useState("");
    const [newRecord, setNewRecord] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [value, setValue] = useState(true);

    useEffect(() => {
        console.log(animal)
        fetchAnimalHealthRecord()
    }, [value]);
    
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
    const resetState = () => {
        setEditState(false);
        setNewRecordType("");
        setNewRecord("");
        setNewNotes("");
    }
    const addHandler = () => {
        if (newRecord.length === 0) {
            alert("Record must be entered.")
            return
        }
        axios.post(`http://localhost:8001/api/animals/healthrecord?id=${animal.id}`, JSON.stringify({
            type: newRecordType, record: newRecord, notes: newNotes
        }))
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
        setDeleteState(false)
        setEditState(!inEditMode)
    }
    const deletingHandler = () => {
        setEditState(false)
        setDeleteState(!inDeleteMode)
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
    const deleteHandler = (animalId, date) => {
        console.log(date)
        axios.delete(`http://localhost:8001/api/animals/healthrecord?id=${animalId}&time=${date}`)
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
                            Health Record
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
                                                onChange={notesHandler}
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
                                        const { animalId, date, type, record, notes } = healthRecord
                                        return (
                                            <>
                                                <tr key={date}>
                                                    <td>{type}</td>
                                                    <td>{record}</td>
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

export default HealthRecord