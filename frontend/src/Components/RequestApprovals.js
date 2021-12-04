/** @jsxImportSource @emotion/react */
import { useState, useEffect, state } from 'react';
import axios from 'axios';


const RequestApprovals = ({user}) => {

    const approveHandler = (index) => {

        console.log(user)
        animalRequests[index].currentState = "approved"
        axios.put(`http://localhost:8001/api/animals/requests?userid=` + user.userId,
            JSON.stringify (animalRequests[index]), { headers: { "Access-Control-Allow-Origin": "*", } }
            ).then(response => console.log(response))
            .catch(err => console.log(err))
        
    }

    const rejectHandler = (index) => {

        animalRequests[index].currentState = "rejected"
        axios.put(`http://localhost:8001/api/animals/requests?userid=` + user.userId,
            JSON.stringify (animalRequests[index])
            ).then(response => console.log(response))
            .catch(err => console.log(err))

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
            {animalRequests.map((animalRequest, index) => {

                    const { requestId, animalId, userId, currentState } = animalRequest
                    return (
                        <tr key={requestId}>
                            <td>{requestId}</td>
                            <td>{animalId}</td>
                            <td>{userId}</td>
                            <td>{currentState}</td>
                            <td>
                                <button class="button is-small is-success" onClick={() => approveHandler(index)}>approve</button>
                            </td>
                            <td>
                                <button class="button is-small is-danger" onClick={() => rejectHandler(index)}>reject</button>
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