/** @jsxImportSource @emotion/react */
import { useState, useEffect, state } from 'react';
import axios from 'axios';


const RequestApprovals = ({user}) => {

    const approveHandler = (event) => {

    }

    const rejectHandler = (event) => {

    }

    // const [requests, setRequests] = useState({requestedAnimals: [], animalRequests: []})
    const [animalRequests, setAnimalRequests] = useState([]);
    //{ requestId: "none", animalId: "none", userId: "none", currentState: "none" }
    // const [requestedAnimals, setRequestedAnimals] = useState([{ id: "none", name: "none", userId: "none", subspecies: "none" }]);

    useEffect(() => {
        fetchAnimalRequests();
    }, []);

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
            <div>
                <title>Current Outstanding Requests</title>
            </div>
            <table>
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
            {animalRequests.map((animalRequest) => {
                    const { requestId, animalId, userId, currentState } = animalRequest
                    return (
                        <tr key={requestId}>
                            <td>{requestId}</td>
                            <td>{animalId}</td>
                            <td>{userId}</td>
                            <td>{currentState}</td>
                            <td>
                                <button class="button is-small is-success" onClick={approveHandler}>approve</button>
                            </td>
                            <td>
                                <button class="button is-small is-danger"onClick={rejectHandler}>reject</button>
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
            </>
    );

}

export default RequestApprovals;