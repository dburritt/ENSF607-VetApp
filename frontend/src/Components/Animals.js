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

const AnimalMenu = () => {

  const [animals,setAnimals] = useState([]);
  const [animalStatus, setAnimalStatus] = useState();
  const [animalCheckout, setAnimalCheckout] = useState();
  const [selectedSpecies, setSelectedSpecies] = useState();

  const speciesList = GetSpecies();

    useEffect(() => {
        fetchAnimals(); 
      }, []);

    const fetchAnimals = () => {
        axios.get('http://localhost:8001/api/animals/available')
            
            .then((res) => {
               setAnimals(res.data.animals); 
               console.log()
            })
            .catch((err) => {
                console.log(err);
            });
    };

  return (
    <div>
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
            <option class="button" onClick = {() => setAnimalStatus(animal.name)}>{animal.name}</option>
            ))}
        </select>
      </div>
      
      <div class="select is-primary">
        <select>
          <option>Checkout?</option>
          <option class="button" onClick = {() => setAnimalCheckout(animalStatus + " is now checked out")}>Yes</option>
          <option class="button">No</option>
        </select>
      </div>
      <div>{animalCheckout}</div>
    </div>
  );
}

export default AnimalMenu;
