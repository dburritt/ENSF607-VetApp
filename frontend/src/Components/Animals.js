import axios from 'axios';
import React, {useState, useEffect} from 'react';

const AnimalMenu = () => {

  const [animals,setAnimals] = useState([]);
  const [animalStatus, setAnimalStatus] = useState(0);

    useEffect(() => {
        fetchAnimals();
      }, []);

    const fetchAnimals = () => {
        axios.get('http://localhost:8001/api/animals')
            
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
          <option>Select Animal</option>
          {animals.map((animal) => (
            <option class="button" onClick = {() => setAnimalStatus(animal.species)}>{animal.name}</option>
            ))}
        </select>
      </div>
      <div>{animalStatus}</div>
      <div class="select is-primary">
        <select>
          <option>Checkout?</option>
          <option class="button">Yes</option>
          <option class="button">No</option>
        </select>
      </div>
    </div>
  );
  
}

export default AnimalMenu;
