import axios from 'axios';
import React, {useState, useEffect} from 'react';



const AnimalMenu = () => {

  const [animals,setAnimals] = useState([]);
  const [animalStatus, setAnimalStatus] = useState();
  const [animalCheckout, setAnimalCheckout] = useState();

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
          <option>Select Animal</option>
          {animals.map((animal) => (
            <option class="button" onClick = {() => setAnimalStatus(animal.name)}>{animal.name}</option>
            ))}
        </select>
      </div>
      
      <div class="select is-primary">
        <select>
          <option>Checkout?</option>
          <option class="button" onClick = {() => setAnimalCheckout(animalStatus + " is checked out")}>Yes</option>
          <option class="button">No</option>
        </select>
      </div>
      <div>{animalCheckout}</div>
    </div>
  );
  
}

export default AnimalMenu;
