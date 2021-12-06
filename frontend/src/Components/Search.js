import axios from 'axios';
import React, { useState, useEffect } from 'react';
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

const SearchView = ({ user, pageDispatch }) => {
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

    const adminPageHandler = () => {
        pageDispatch({
            nextPage: "admin"
        });
    };
    
    const animalProfileHandler = (animal) => {
        
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
            

            <div class="box">
                <div class="columns">
                    <div className="column is-one-quarter">
                        <div class="select is-multiple">
                            <select multiple size="5"  >
                                {results.map((animal, index) => {
                                    const { id, name, species, subspecies, breed } = animal
                                    return (

                                        <option value={id} onClick={() => selectHandler(animal)}> {name} : {breed}</option>

                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>
                
                <div className="column is-full">
                    <div class="box">
                        <p> {selected.id} :  {selected.name}, {selected.species}, {selected.subspecies}</p>
                        <button className="button is-small is-success" css={css`width: 90%;`} onClick={() => animalProfileHandler}>Animal Profile</button>
                    </div>
                </div>
                </div>
            </div>
            <footer>
                <div className="columns">
                    <div className="column has-text-centered" css={css`padding: 5px;`}>
                        <button class="button" >Go to Animal Profile</button>
                    </div>
                    {user.accountType === "Admin" ? (
                        <div class="column has-text-centered" css={css`padding: 5px;`}>
                            <button className="button" onClick={adminPageHandler}>Admin Access</button>
                        </div>
                    ) : null

                    }
                </div>
            </footer>
        </div>
    );
}

export default SearchView