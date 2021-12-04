import axios from 'axios';
import React, {useState, useEffect} from 'react';

const GetSpecies = () => {
  const [species, setSpecies] = useState([]);

  useEffect(() => {
    fetchSpecies(); 
  }, []);

  const fetchSpecies = () => {
    axios.get('http://localhost:8001/api/animals?subspecies=0')
        
        .then((res) => {
           setSpecies(res.data.animals); 
           console.log()
        })
        .catch((err) => {
            console.log(err);
        });
  };

  return(
    [...new Set(species.map(s => s.subspecies))]
  );
}

const GetUserAnimals = () => {

  const [userAnimalList, setUserAnimalList] = useState([]);
  useEffect(() => {
    fetchUserAnimals(); 
  }, []);

  const fetchUserAnimals = () => {
    axios.get('http://localhost:8001/api/animals/requests')
        
        .then((res) => {
           setUserAnimalList(res.data.animalRequests); 
           console.log(userAnimalList)
        })
        .catch((err) => {
            console.log(err);
        });
  };

  return (
    userAnimalList
  );
}

const AnimalMenu = ({userInfo}) => {

  const [animals,setAnimals] = useState([]);
  const [animalStatus, setAnimalStatus] = useState();
  const [animalCheckout, setAnimalCheckout] = useState();
  const [selectedSpecies, setSelectedSpecies] = useState();

  const speciesList = GetSpecies();
  const animalList = GetUserAnimals().filter(ual => ual.userId === userInfo.userId);

    useEffect(() => {
        fetchAnimals(); 
      }, []);

    const fetchAnimals = () => {
        axios.get('http://localhost:8001/api/animals/available')
            
            .then((res) => {
               setAnimals(res.data.animals); 
               console.log(animals)
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setStatus = () => {
      axios.post('http://localhost:8001/api/animals/requests', JSON.stringify({animalId: animalStatus, userId: userInfo.userId}))
          .then((res) => {
             this.setState({updatedAt: res.data.updatedAt})
             console.log(res)
          })
          .catch((err) => {
              console.log(err);
          });
    };

    const cancelRequest = (test) => {
      console.log(test)
      console.log(animalList.animalRequestId)
      test.currentState="cancel"
      axios.put(`http://localhost:8001/api/animals/requests?userid=${userInfo.userId}`, 
          JSON.stringify(test))
          .then((res) => {
             console.log(res)
          })
          .catch((err) => {
              console.log(err);
          });
    };

  return (
    <div>
      <div>Currently Available Animals</div>
      <div class="select is-primary">
      <select>
        <option>Select Species</option>
        {speciesList.map((speciesList) => (
          <option class="button" onClick = {() => setSelectedSpecies(speciesList)}>{speciesList}</option>
          ))}
      </select>
      </div>

      <div class="select is-primary">
        <select>
          <option>Select Animal</option>
          {animals.filter((animal) => animal.subspecies === selectedSpecies).map((animal) => (
            <option class="button" onClick = {() => setAnimalStatus(animal.id)}>{animal.name}</option>
            ))}
        </select>
      </div>
      
      <div class="select is-primary">
        <select>
          <option>Checkout?</option>
          <option class="button" onClick = {() => setStatus()}>Yes</option>
          <option class="button">No</option>
        </select>
      </div>
      <div>Currently Requested Animals</div>
      <tbody class="table is-primary">
            {animalList.map((animalRequest, index) => {

                    const { requestId, animalId, currentState } = animalRequest
                    return (
                        <tr key={animalId}>
                            <td>{animalId}</td>
                            <td>{currentState}</td>
                            <td>
                                <button class="button is-small is-danger" onClick ={() => cancelRequest(animalRequest)}>Cancel</button>
                            </td>
                        </tr>
                    )
                }
                )}
            </tbody>
    </div>
  );
}

export default AnimalMenu;
