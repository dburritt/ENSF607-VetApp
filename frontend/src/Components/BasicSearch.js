/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import 'bulma/css/bulma.css';
import AdvancedSearch from '../Components/AdvancedSearch';

const AdvancedSearchPopup = props => {
    return (
        <div className="popup-box">
          <div className="box">
            <button className="button" onClick={props.handleClose}>Close</button>
            <AdvancedSearch/>
          </div>
        </div>
      );
}

const BasicSearchView = ({ user, pageDispatch, animalSelectionDispatch }) => {
    useEffect(() => {
        fetchAllAnimals();
    }, []);
    const [results, setResults] = useState([]);

    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

    const toggleAdvancedSearch = () => {
        setAdvancedSearchOpen(!advancedSearchOpen);
    }

    const fetchAllAnimals = () => {
        axios.get('http://localhost:8001/api/animals?id=0')
            .then((res) => {
                setResults(res.data.animals);
                selectHandler(res.data.animals[0]);
            })
            .catch((err) => {
                console.log(err);
                setResults([]);
            });
    };
    const fetchMyAnimals = () => {
        axios.get(`http://localhost:8001/api/animals?userId=${user.userId}`)
            .then((res) => {
                console.log(res);
                setResults(res.data.animals);
                selectHandler(res.data.animals[0]);
            })
            .catch((err) => {
                setResults([]);
            });
    };
    const selectHandler = (animal) => {
        setSelected(animal);
        // console.log(selected);
    };
    const searchChangeHandler = (event) => {
        setSearch(event.target.value)
    }
    const searchHandler = () => {
        if (search.length === 0) {
            alert("Search must be entered.")
            return
        }
        axios.get(`http://localhost:8001/api/animals/search/?key=${search}`)
            .then((res) => {
                console.log(res);
                setResults(res.data.animals);
                //selectHandler(res.data.animals[0]);
            })
            .catch((err) => {
                setResults([]);
            });
    }
    const staffPageHandler = () => {
        if (user.accountType === "Admin"){
            pageDispatch({
                nextPage: "admin"
            });
        }
        if (user.accountType === "Health Technician"){
            pageDispatch({
                nextPage: "approvals"
            });
        }
        if (user.accountType === "Instructor"){
            pageDispatch({
                nextPage: "request"
            });
        }
    };
    
    const animalProfileHandler = () => {
        animalSelectionDispatch({
            command: "add",
            animal: selected
        });
        pageDispatch({
            nextPage: "animalProfile"
        });
    };

    return (
        <div className="column is-full">
            <header>
                <div className="columns is-centered"
                    css={css`position: absolute;
                    top: 1vh;
                    width: 100%;`}>
                    <title className="column has-text-left">Search by Animal</title>
                </div>
                <button class="button" onClick={fetchAllAnimals}>All Animals </button>
                {user.accountType !== "Student" ? (           
                    <button class="button"onClick={fetchMyAnimals}>My Animals</button>
                ) : null }
                
            </header>

            <div class="columns">
                <div class="column is-half">
                    <input value={search} onChange={searchChangeHandler} class="input" type="text" placeholder="Enter name or ID"></input>
                </div>
                <div class="column is-half">
                    <button class="button" onClick={searchHandler}>Search</button>
                    <button class="button" onClick={toggleAdvancedSearch}>Advanced Search</button>
                    {advancedSearchOpen && <AdvancedSearchPopup handleClose={toggleAdvancedSearch} />}
                </div>
                </div>
            

            <div class="box">
                <div class="columns is-full">
                    <div className="column is-one-quarter">
                        <div class="select is-multiple is-fullwidth">
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
                
                    <div className="column is-three-quarters">

                        <div class="box">
                            <p> {selected.id} :  {selected.name}, {selected.species}, {selected.subspecies}</p>
                            <button className="button is-small is-success" css={css`width: 90%;`} onClick={animalProfileHandler}>Animal Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer>
                <div className="columns">
                    {user.accountType === "Admin" ? (
                        <div class="column has-text-centered">
                            <button className="button" onClick={staffPageHandler}>Admin Access</button>
                        </div>
                    ) : null }
                    {user.accountType === "Health Technician" ? (
                        <div class="column has-text-centered">
                            <button className="button" onClick={staffPageHandler}>Approve Animal Requests</button>
                        </div>
                    ) : null }
                    {user.accountType === "Instructor" ? (
                        <div class="column has-text-centered">
                            <button className="button" onClick={staffPageHandler}>Request Animal</button>
                        </div>
                    ) : null }
                </div>
            </footer>
        </div>
        
    );
}

export default BasicSearchView