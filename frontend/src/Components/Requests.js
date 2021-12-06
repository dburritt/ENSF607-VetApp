import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RequestsMenu = ({ userInfo, pageDispatch }) => {

  const [animals, setAnimals] = useState([]);
  const [animalStatus, setAnimalStatus] = useState();
  const [animalCheckout, setAnimalCheckout] = useState();
  const [selectedSpecies, setSelectedSpecies] = useState();
  const [speciesList, setSpecies] = useState([]);
  const [userAnimalList, setUserAnimalList] = useState([]);
  const [updateState, setState] = useState(false);

  // const animalList = GetUserAnimals()userAnimalList.filter(ual => ual.userId === userInfo.userId);

  useEffect(() => {
    fetchAnimals();
    console.log(animals)
    fetchSpecies();
    fetchUserAnimals();
  }, [updateState]);

  // useEffect(() => {
  //   fetchSpecies();
  // }, []);

  // useEffect(() => {
  //   fetchUserAnimals();
  // }, []);

  // const GetSpecies = () => {
  //   

    // const speciesList = GetSpecies();

    const fetchSpecies = () => {
      axios.get('http://localhost:8001/api/animals?subspecies=0')

        .then((res) => {
          setSpecies([...new Set(res.data.animals.map(s => s.subspecies))]);
        })
        .catch((err) => {
          console.log(err);
        });
    };

  //   return (
  //     [...new Set(species.map(s => s.subspecies))]
  //   );
  // }

  // const GetUserAnimals = () => {

  //   
    

    const fetchUserAnimals = () => {
      axios.get('http://localhost:8001/api/animals/requests')

        .then((res) => {
          setUserAnimalList(res.data.animalRequests);
          // console.log(userAnimalList)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // return (
    //   userAnimalList
    // );
  // }

  const fetchAnimals = () => {
    axios.get('http://localhost:8001/api/animals/available')

      .then((res) => {
        setAnimals(res.data.animals);
        // console.log(animals)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setStatus = () => {
    console.log(JSON.stringify({ animalId: animalStatus, userId: userInfo.userId }))
    axios.post('http://localhost:8001/api/animals/requests', JSON.stringify({ animalId: animalStatus, userId: userInfo.userId }))
      .then((res) => {
        this.setState({ updatedAt: res.data.updatedAt })
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancelRequest = (test) => {
    console.log(test)
    test.currentState = "cancel"
    axios.put(`http://localhost:8001/api/animals/requests?userid=${userInfo.userId}`,
      JSON.stringify(test))
      .then((res) => {
        console.log(res)
        setState(!updateState)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const returnHandler = () => {
    pageDispatch({
      nextPage: "basicSearch"
    })
  }

  const speciesSelectHandler = (event) =>{
    setSelectedSpecies(event.target.value);
  }

  const animalSelectHandler = (event) =>{
    setAnimalStatus(event.target.value); 
  }

  const checkoutHandler = (event) =>{
    if (event.target.value === "Yes"){
      setStatus(event.target.value); 
      setState(!updateState)
    }
  }

  return (
    <>
      <div>
        <div>Currently Available Animals</div>
        <div class="select is-primary">
          <select onChange={speciesSelectHandler}>
            <option>Select Species</option>
            {speciesList.map((speciesList) => (
              <option className="button" >{speciesList}</option>
            ))}
          </select>
        </div>

        <div class="select is-primary">
          <select onChange={animalSelectHandler}>
            <option>Select Animal</option>
            {animals.filter((animal) => animal.subspecies === selectedSpecies).map((animal) => (
              <option class="button" value={animal.id}>{animal.name}</option>
            ))}
          </select>
        </div>

        <div class="select is-primary">
          <select onChange={checkoutHandler}>
            <option>Checkout?</option>
            <option class="button">Yes</option>
            <option class="button">No</option>
          </select>
        </div>
        <div>Currently Requested Animals</div>
        <tbody class="table is-primary">
          {userAnimalList.filter(ual => ual.userId === userInfo.userId).map((animalRequest, index) => {

            const { requestId, animalId, currentState } = animalRequest
            return (
              <tr key={animalId}>
                <td>{animalId}</td>
                <td>{currentState}</td>
                <td>
                  <button class="button is-small is-danger" onClick={() => cancelRequest(animalRequest)}>Cancel</button>
                </td>
              </tr>
            )
          }
          )}
        </tbody>
      </div>

      <footer>
        <div className="columns">
          <div className="column has-text-centered">
            <button class="button" onClick={returnHandler}>Return</button>
          </div>
        </div>
      </footer>
    </>

  );
}

export default RequestsMenu;
