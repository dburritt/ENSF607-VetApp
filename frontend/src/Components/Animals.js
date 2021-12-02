import axios from 'axios';
import React, {useState, useEffect} from 'react';

const Animals = () => {
    const [animals,setAnimals] = useState([])

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
      <>
      <p>----</p>
      {animals.map((animal) => (
        <>
            <h1>
            ID: {animal.id} 
            </h1>
            <> 
            Type: {animal.type}, Weight: {animal.weight}lbs, Breed: {animal.breed}, Color: {animal.color}
            </>
            <p>----</p>
            
        </>
    
        ))}
      </>
    </div>
  )
}
export default Animals;