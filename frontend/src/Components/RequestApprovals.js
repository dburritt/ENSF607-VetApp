/** @jsxImportSource @emotion/react */
import { useState, useEffect, state } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';


const RequestApprovals = () => {

    const [animalRequests, setRequests] = useState([{ requestId: "none", animalId: "none", userId: "none", currentState: "none" }]);
    const [requestedAnimals, setRequestedAnimals] = useState([]);

    useEffect(() => {
        fetchAnimalRequests();
    }, []);

    const fetchAnimalRequests = () => {
        axios.get('http://localhost:8001/api/animals/requests')
            .then((res) => {
                setRequests([...state, res.data.animalRequests]);
                for (let i = 0; i < animalRequests.length; i++) {
                    fetchAnimal(animalRequests[i].animalId)
                }
                console.log()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchAnimal = ({ animalId }) => {

        axios.get(`localhost:8001/api/animals?id="${animalId}"`)
            .then((res) => {
                setRequestedAnimals([...state, res.data.animals[0]])
                console.log()
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
            {animalRequests.map((animalRequest, index) => {
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