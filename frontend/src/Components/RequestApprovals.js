/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from "@emotion/react";

const RequestApprovals = ({ user, pageDispatch }) => {

    const [value, setValue] = useState(true);
    // const [pressable, setPressable] = useState([]);

    const approveHandler = (index) => {

        animalRequests[index].currentState = "approve"
        axios.put(`http://localhost:8001/api/animals/requests?userid=${user.userId}`,
            JSON.stringify(animalRequests[index])
        )
            .catch(err => console.log(err))

        // setPressable([...pressable, !pressable[index]])

        // var button = document.getElementById(animalRequests[index].requestId);
        // button.setAttribute('className', "button is-small is-dark");
        // var button2 = document.getElementById(animalRequests[index].requestId+"reject").setAttribute('className', "button is-small is-dark");
        // button2.setAttribute('className', "button is-small is-dark");

        setValue(value => !value);
    }

    const rejectHandler = (index) => {

        animalRequests[index].currentState = "reject"
        axios.put(`http://localhost:8001/api/animals/requests?userid=${user.userId}`,
            JSON.stringify(animalRequests[index])
        )
            .catch(err => console.log(err))

        setValue(value => !value);
    }

    const returnHandler = () => {
        if (user.accountType === "Admin") {
            pageDispatch({
                nextPage: "admin"
            });
        }
        if (user.accountType === "Health Technician") {
            pageDispatch({
                nextPage: "basicSearch"
            });
        }
    }

    // const [requests, setRequests] = useState({requestedAnimals: [], animalRequests: []})
    const [animalRequests, setAnimalRequests] = useState([]);
    //{ requestId: "none", animalId: "none", userId: "none", currentState: "none" }
    // const [requestedAnimals, setRequestedAnimals] = useState([{ id: "none", name: "none", userId: "none", subspecies: "none" }]);

    useEffect(() => {
        fetchAnimalRequests();
    }, [value]);

    // useEffect(() => {
    //     fetchAnimal(animalRequests);
    //     //console.log(animalRequests); 
    // }, [animalRequests]);

    const fetchAnimalRequests = () => {
        // let tempRequests = [];
        axios.get('http://localhost:8001/api/animals/requests')
            .then((res) => {
                // tempRequests = [...tempRequests, res.data.animalRequests]
                setAnimalRequests(res.data.animalRequests);//, function() {console.log(animalRequests); } );
                // for (let i = 0; i < animalRequests.length; i++) {
                //     fetchAnimal(animalRequests[i].animalId)
                // }

            })
            .catch((err) => {
                console.log(err);
            });

        // return tempRequests[0];

    };
    // { animalRequests }
    // const fetchAnimal = () => {
    //     let tempAnimals = [];
    //     for (let i = 0; i < animalRequests.length; i++) {
    //         axios.get('localhost:8001/api/animals?id='+ animalRequests[i].animalId)
    //             .then((res) => {
    //                 tempAnimals = [...tempAnimals, res.data.animals]
    //                 setRequestedAnimals(res.data.animals)
    //                 console.log(requestedAnimals)
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //      }
    //      return tempAnimals[0];
    // };

    return (
        <>
            <div className="container is-flex-direction-column has-text-centered">
                <div className="tile is-parent">
                    <title className="tile is-child">Current Outstanding Requests</title>
                </div>
                <div className="tile is-parent">
                    <title className="tile is-child">{user.accountType} - {user.name}</title>
                </div>
                <div className="tile is-parent">
                    <table className="tile is-child">
                        <thead class="table is-primary">
                            <tr>
                                <th>Request Id</th>
                                <th>Animal Id</th>
                                <th>User Id</th>
                                <th>State of Request</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table is-primary">
                            {animalRequests.map((animalRequest, index) => {
                                const { requestId, animalId, userId, currentState } = animalRequest
                                return (
                                    <tr key={requestId}>
                                        <td>{requestId}</td>
                                        <td>{animalId}</td>
                                        <td>{userId}</td>
                                        <td>{currentState}</td>
                                        <td>
                                            <button id={requestId}
                                                className={`button is-small is-success`}
                                                onClick={() => approveHandler(index)}>
                                                approve
                                            </button>
                                        </td>
                                        <td>
                                            <button id={requestId}
                                                className={`button is-small is-danger`}
                                                onClick={() => rejectHandler(index)}>
                                                reject
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                        {/* <tbody class="table is-primary">
            {requestedAnimals.map((animal) => {
                console.log(requestedAnimals);
                    return (
                        <tr key={animal.animalId}>
                            <td>{animal.id}</td>
                            <td>{animal.name}</td>
                            <td>{animal.subspecies}</td>
                            <td>
                                <button class="button is-small is-success">approve</button>
                            </td>
                            <td>
                                <button class="button is-small is-fail">reject</button>
                            </td>
                        </tr>
                    )
                }
                )}
            </tbody> */}
                    </table>
                </div>

                <div className="column">
                    <button className="button is-small" css={css`width: 40%;`} onClick={returnHandler}>Return</button>
                </div>

            </div>
        </>
    );

}

export default RequestApprovals;