import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { css } from "@emotion/react";
import 'bulma/css/bulma.css';

const AdvancedSearch = () => {
    
    return (
        <div>
            <header>
                <span>Advanced Search</span>
            </header>

            <div>
                <div class="box">
                    <input class="input" type="text" placeholder="Enter keywords"></input>
                </div>
            </div>

            <div class="box">
                <div class="select is-multiple">
                    <select multiple size="5">
                        <option>Filter Option 1</option>
                        <option>Filter Option 2</option>
                        <option>Filter Option 3</option>
                        <option>Filter Option 4</option>
                        <option>Filter Option 5</option>
                        <option>Filter Option 6</option>
                    </select>
                </div>
            </div>

            <div>
                <button class="button">Search</button>
            </div>
        </div>
    )
}

const SearchView = () => {
    useEffect(() => {
        fetchAllAnimals()
    }, []);
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState([]);

    const fetchAllAnimals = () => {
        axios.get('http://localhost:8001/api/animals?id=0')
            .then((res) => {
                setResults(res.data.animals);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const selectHandler = (animal) => {
        
        setSelected(animal);
        console.log(selected);
        
    };
    return (
        <div>
            <header>
                <div className="columns is-centered"
                    css={css`position: absolute;
                    top: 1vh;
                    width: 100%;`}>
                    <title className="column has-text-left">Search by Animal</title>
                </div>
                <button class="button" onClick={fetchAllAnimals}>All Animals </button>
                <button class="button">My Animals</button>
            </header>

            <div class="columns">
                <div class="column is-half">
                    <input class="input" type="text" placeholder="Enter name or ID"></input>
                </div>
                <div class="column is-half">
                    <button class="button">Search</button>
                    <button class="button">Advanced Search</button>
                </div>
                </div>
                    
            <div className="column">
                <div class="box">
                    <div class="select is-multiple">
                        <select multiple size="5"  >
                            {results.map((animal, index) => {
                                const { id, name, species, subspecies, breed } = animal
                                return (
                                    
                                        <option value = {id} onClick={() => selectHandler(animal)}> {name} : {breed}</option>
                                   
                                )
                            })
                            }       
                        </select>  
                    </div>
                    <div className="column">
                    <div class="box"> <p> {selected.id} :  {selected.name}, {selected.species}, {selected.subspecies}</p>
                    </div>
                    </div>
                </div>
            </div>

            <footer>
                <div class="has-text-centered">
                    <button class="button">Goto Animal Profile</button>
                </div>
                <div class="has-text-centered">
                    <button class="button">Logout</button>
                    <button class="button">Admin Access</button>
                </div>
            </footer>
        </div>
    );
}

export default SearchView