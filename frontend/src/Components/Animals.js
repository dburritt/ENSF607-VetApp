import axios from 'axios';
import React, {useState, useEffect} from 'react';

const AnimalMenu = () => {

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
    <div class="dropdown is-active">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Select Animal</span>
          <span class="icon is-small">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          {animals.map((animal) => (
          <a class="dropdown-item">{animal.color}</a>
          ))}
        </div>
      </div>
    </div>
  );
  
}

export default AnimalMenu;
