/** @jsxImportSource @emotion/react */
import { useState, useEffect, state } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';


const RequestApprovals = () => {

    const [animalRequests, setRequests] = useState([]);
    //{ requestId: "none", animalId: "none", userId: "none", currentState: "none" }
    const [requestedAnimals, setRequestedAnimals] = useState([]);

    useEffect(() => {
        fetchAnimalRequests();
    }, []);

    const fetchAnimalRequests = () => {
        axios.get('http://localhost:8001/api/animals/requests')
            .then((res) => {
                setRequests(res.data.animalRequests);
                console.log(animalRequests);
                // for (let i = 0; i < animalRequests.length; i++) {
                //     fetchAnimal(animalRequests[i].animalId)
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchAnimal = ({ animalId }) => {

        axios.get(`localhost:8001/api/animals?id="${animalId}"`)
            .then((res) => {
                setRequestedAnimals(res.data.animals)
                console.log(requestedAnimals)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div>
                <title>Current Outstanding Requests</title>
            </div>
            <div class="table is-primary">
            {animalRequests.map((animalRequest) => {
                    const { requestId, animalId, userId, currentState } = animalRequest
                    return (
                        <tr key={requestId}>
                            <td>{requestId}</td>
                            <td>{animalId}</td>
                            <td>{userId}</td>
                            <td>{currentState}</td>
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
            </div>
        </div>
    );

}

export default RequestApprovals;