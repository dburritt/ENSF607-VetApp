/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import WeightRecordGraph from './WeightRecordGraph'


const WeightRecord = ({ user, animal, pageDispatch }) => {
    const [weightRecords, setWeightRecords] = useState([]);
    const [inEditMode, setEditState] = useState(false);
    const [newWeight, setNewWeight] = useState("");
    const [newNotes, setNewNotes] = useState("");
    const [value, setValue] = useState(true);

    useEffect(() => {
        fetchAnimalWeightRecord()
        console.log(animal)
    }, [value]);

    const returnHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    }


    const editingHandler = () => {
        setEditState(!inEditMode)
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
        var time = date + ' ' + month + ' ' + year;
        return time;
    }
    const weightHandler = (event) => {
        setNewWeight(event.target.value)
    }
    const notesHandler = (event) => {
        setNewNotes(event.target.value)
    }
    const resetState = () =>{
        setEditState(false);
        setNewWeight("");
        setNewNotes("");
    }
    const addHandler = () => {
        if(newWeight.length === 0){
            alert("Weight must be entered.")
            return
        }
        axios.post(`http://localhost:8001/api/animals/weight?id=${animal.id}`, JSON.stringify({
            weight: newWeight, notes: newNotes}))
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
            resetState();

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
                <div className="column is-full">
                    <div className="box">

                        <div className="columns is-full">
                            <div className="column is-half">
                                Weight Record
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType !== "Student" ? (
                                    <button className="button is-success" onClick={editingHandler}>Add Record</button>
                                ) : null}
                            </div>
                        </div>
                        <div className="columns is-full">

                            <div className="column">
                                <div className="box is-fullwidth">
                                    {weightRecords != null ? (
                                        <WeightRecordGraph data={weightRecords} />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="column is-full">
                            <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>Weight</th>
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
                                                    onChange={weightHandler}
                                                    type="number" step=".1" />
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
                                            const { date, weight, notes } = weightRecord
                                            return (
                                                <>
                                                    <tr key={date}>
                                                        <td>{weight}</td>
                                                        <td>{timeConverter(date)}</td>
                                                        <td>{notes}</td>
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

export default WeightRecord