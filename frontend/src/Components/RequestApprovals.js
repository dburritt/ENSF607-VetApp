/** @jsxImportSource @emotion/react */
import { useState, useEffect, state } from 'react';
import axios from 'axios';


const RequestApprovals = () => {

    const [animalRequests, setRequests] = useState([]);
    const [requestedAnimals, setRequestedAnimals] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            const respRequests = await fetchAnimalRequests();
            setRequests(respRequests.data.animalRequests);
            const respAnimals = await fetchAnimals();
            setRequestedAnimals(respAnimals)
        }

        fetchData()
    }, []);

    const fetchAnimalRequests = () => {
        return axios.get('http://localhost:8001/api/animals/requests')
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchAnimals = () => {

        let temp = [];

        for (let i = 0; i < animalRequests.length; i++) {
            axios.get(`localhost:8001/api/animals?id="${animalRequests[i].animalId}"`)
                .then((res) => {
                    temp = [...temp, res.data.animalRequests[0]]
                })
                .catch((err) => {
                    console.log(err);
                });
            }
        
        return temp;

    };

    return (
        <>
            <div>
                <title>Current Outstanding Requests</title>
            </div>
            <tbody class="table is-primary">
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
            </tbody>
            <tbody class="table is-primary">
            {requestedAnimals.map((animal) => {
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
            </tbody>
            </>
    );

}

export default RequestApprovals;