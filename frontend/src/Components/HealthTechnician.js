/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from "@emotion/react";

const style = document.createElement('style');
style.innerHTML = `
        .table {
            table-layout: auto;
            width: 90%;
        }

        .table th {
            background-color: #DDEFEF;
            border: solid 1px #DDEEEE;
            color: #336B6B;
            padding: 2px;
            text-align: center;
            vertical-align: bottom;
            font-size: 12px;
        }

        .table td {
            border: solid 1px #DDEEEE;
            color: #333;
            word-wrap: break-word;
            font-size: 9px;
        }
    `;
document.head.appendChild(style);
const nothing = () => {
    
};


const HealthTechnician = ({ user, pageDispatch }) => {
    const style = document.createElement('style');
    style.innerHTML = `
            .table {
                table-layout: auto;
                width: 90%;
            }
    
            .table th {
                background-color: #DDEFEF;
                border: solid 1px #DDEEEE;
                color: #336B6B;
                padding: 2px;
                text-align: center;
                vertical-align: bottom;
                font-size: 12px;
            }
    
            .table td {
                border: solid 1px #DDEEEE;
                color: #333;
                word-wrap: break-word;
                font-size: 9px;
            }

            `;
    const [results, setResults] = useState([]);
    const fetchAllAnimals = () => {
        axios.get('http://localhost:8001/api/animals?id=0')
            .then((res) => {
                setResults(res.data.animals);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className="column is-full has-text-centered">
                <div className="columns is-centered"
                    css={css`position: absolute;
                    top: 1vh;
                    width: 100%;`}>
                    <title className="column has-text-left">Homepage</title>
                    <title className="column has-text-right">{user.accountType} - {user.name}</title>
                </div>
               
                <div className="columns"
                    css={css`position: relative;
                            width: 50%;
                            margin-right: auto;
                            margin-left: 0;`}>
                    <div className="column">
                        <button className="button is-small" css={css`width: 90%;`} onClick={fetchAllAnimals}>All Animal</button>
                    </div>
                    <div className="column has-text-left">
                        <button className="button is-small" css={css`width: 90%;`} onClick={nothing}>My Animals</button>
                    </div>
                    <div class="column is-three-quarters">
                        <input class="input is-small"  css={css`height: 85%;`}
                            //value= password
                            // onChange={passwordChangeHandler}
                            className="input "
                            type="text"
                            placeholder="Search" />
                    </div>
                    <div className="column">
                     <button className="button is-small" css={css`width: 90%;`} onClick={nothing}>Search</button>
                    </div>
                    <div className="column has-text-left">
                        <button className="button is-small" css={css`width: 90%;`} onClick={nothing}>Advanced Search</button>
                    </div>
                    <div className="column ">
                        {/* <button
                            onClick={() => editingHandler()}
                            css={css`width: 90%;`}
                            className={`button is-small ${inEditMode ? "is-success" : "is-grey"}`}>
                            {inEditMode ? "Managing" : "Manage Users"}</button> */}
                    </div>
                </div>

                <div className="columns is-centered"
                    css={css`position: left;`}>
                    <div className="column">
                        <title className="tile has-text-left">Results</title>
                            <table className="table">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>Id</th>
                                        <th>Name</th>
                                        <th>Species</th>
                                        <th>Subspecies</th>
                                        <th>Breed</th>
                                        
                                    </tr>
                                </thead>
                                        <tbody class="table is-primary">
                                        {results.map((animal, index) => {
                                            const { id, name, species, subspecies, breed } = animal
                                            return (
                                                <>
                                                    <tr key={id}>
                                                        <td>{id}</td>
                                                        <td>{name}</td>
                                                        <td>{species}</td>
                                                        <td>{subspecies}</td>
                                                        <td>{breed}</td>
                                                        <button 
                                                                onClick={nothing}
                                                                className="button is-small"  css={css`width: 50%;`}>
                                                                Select
                                                        </button>
                                                    </tr>
                                                    
                                                </>
                                            )
                                        })
                                        }
                                    </tbody>
                            </table>
                    </div>
                </div>
            </div>
        </>
);

}

export default HealthTechnician;