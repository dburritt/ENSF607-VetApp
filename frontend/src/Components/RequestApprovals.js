/** @jsxImportSource @emotion/react */
import { useState, useEffect, state } from 'react';
import axios from 'axios';


const RequestApprovals = () => {

    const [animalRequests, setAnimalRequests] = useState([]);
    //{ requestId: "none", animalId: "none", userId: "none", currentState: "none" }
    const [requestedAnimals, setRequestedAnimals] = useState([]);

    useEffect(() => {
        fetchAnimalRequests();
       // console.log(animalRequests); 
    }, []);

    useEffect(() => {
        fetchAnimal(animalRequests);
        //console.log(animalRequests); 
    }, [animalRequests]);

    const fetchAnimalRequests = () => {
        axios.get('http://localhost:8001/api/animals/requests')
            .then((res) => {
                setAnimalRequests(res.data.animalRequests);//, function() {console.log(animalRequests); } );
                // for (let i = 0; i < animalRequests.length; i++) {
                //     fetchAnimal(animalRequests[i].animalId)
                // }
            })
            .catch((err) => {
                console.log(err);
            });
            
    };
   // { animalRequests }
    const fetchAnimal = () => {
        console.log(animalRequests.length);
        for (let i = 0; i < animalRequests.length; i++) {
            console.log(animalRequests[i].animalId);
        //     axios.get('localhost:8001/api/animals?id='+ animalRequests[i].animalId)
        //         .then((res) => {
        //             setRequestedAnimals(res.data.animals)
        //             console.log(requestedAnimals)
        //         })
        //         .catch((err) => {
        //             console.log(err);
        //         });
         }
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