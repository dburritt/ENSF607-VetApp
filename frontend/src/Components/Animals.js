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
               setAnimals(res); 
               console.log(res.data.animals)
               console.log(animals.id)
            })
            .catch((err) => {
                console.log(err);
            });
    };
  return (
    <div>
      <pre>{JSON.stringify(animals.data, null, 1)}</pre>
    </div>
  )
}
export default Animals;