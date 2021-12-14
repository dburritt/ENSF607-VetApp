/** @jsxImportSource @emotion/react */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import 'bulma/css/bulma.css';

//Search screen and all associated functionality
const BasicSearchView = ({ user, pageDispatch, animalSelectionDispatch }) => {
    useEffect(() => {
        fetchAllAnimals();
    }, []);

    //results stores entire list of animals in db
    const [results, setResults] = useState([]);

    //selected stores animal user selects
    const [selected, setSelected] = useState([]);

    //search stores animal name or ID entered for filtering animal list
    const [search, setSearch] = useState("");

    //advancedSearchOpen controls whether advanced search window is open/close
    const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);

    //searchSpeciesFilter controls which option to filter animal list in advanved search
    const [searchSpeciesFilter, setSearchSpeciesFilter] = useState([]);

    //filterTypeSet stores animal filter type for advanced search functionality
    const [filterTypeSet, setFilterTypeSet] = useState("");

    //filtered displays the search results to the user
    const [filtered, setFiltered] = useState([]);

    const toggleAdvancedSearch = () => {
        setAdvancedSearchOpen(!advancedSearchOpen);
    }

    const fetchAllAnimals = () => {
        axios.get('http://localhost:8001/api/animals?id=0')
            .then((res) => {
                setResults(res.data.animals);
                setFiltered(res.data.animals);
                console.log(res.data.animals);
            })
            .catch((err) => {
                console.log(err);
                setResults([]);
            });
    };

    const addAnimalHandler = () => {
        pageDispatch({
            nextPage: "addAnimal"
        });
    }

    const fetchMyAnimals = () => {
        axios.get(`http://localhost:8001/api/animals?userId=${user.userId}`)
            .then((res) => {
                if(res == null){
                    setResults([]);
                }else{
                setResults(res.data.animals);
                }
                selectHandler([]);
            })
            .catch((err) => {
                setResults([]);
            });
    };

    const fetchSpecies = () => {
        axios.get('http://localhost:8001/api/animals?subspecies=0')
            
            .then((res) => {
                setSearchSpeciesFilter(res.data.animals);
                console.log(res.data.animals);
            })
            .catch((err) => {
                console.log(err);
            });
      };

    const fetchAnimalBreeds = () => {
        axios.get('http://localhost:8001/api/animals?breed=0')
            
            .then((res) => {
                setSearchSpeciesFilter(res.data.animals);
                console.log(res.data.animals);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const setAdvancedSearchFilter = (filterType) => {
        setFilterTypeSet(filterType);
        if (filterType === "species") {
            fetchSpecies();
        }
        else if (filterType === "subspecies") {
            fetchSpecies();
        }
        else if (filterType === "breed") {
            fetchAnimalBreeds();
        }
    };

    //Set opitions for user to pick from in advanced search
    const SetAdvancedSearchOptions = (filterType, props) => {
        if (filterType === "species") {
            return(<option onClick={() => filterResults(filterType, props)}>{props.species}</option>)
        }
        else if (filterType === "subspecies") {
            return(<option onClick={() => filterResults(filterType, props)}>{props.subspecies}</option>)
        }
        else if (filterType === "breed") {
            return(<option onClick={() => filterResults(filterType, props)}>{props.breed}</option>)
        }
    };

    //Filter animal list based on option user picked in advanced search
    const filterResults = (filterType, props) => {

        if (filterType === "species") {
            setFiltered(results.filter(r => r.species === props.species))
        }
        else if (filterType === "subspecies") {
            setFiltered(results.filter(r => r.subspecies === props.subspecies))
        }
        else if (filterType === "breed") {
            setFiltered(results.filter(r => r.breed === props.breed))
        }
    };

    const selectHandler = (animal) => {
        setSelected(animal);
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
                setFiltered(res.data.animals);
            })
            .catch((err) => {
                setResults([]);
                setFiltered([]);
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

    //Advanced search window
    const AdvancedSearchPopup = () => {
        return (
            <div className="popup-box">
              <div className="box">
                
                <div>
                <header>
                    <span>Advanced Search</span>
                </header>
    
                <div class="box">
                    <div>
                        <select multiple size="5">
                            <option class="has-background-success">Filter By</option>
                            <option onClick={() => setAdvancedSearchFilter("species")}>Species</option>
                            <option onClick={() => setAdvancedSearchFilter("subspecies")}>Subspecies</option>
                            <option onClick={() => setAdvancedSearchFilter("breed")}>Breed</option>
                        </select>
                        <select multiple size="5">
                            <option class="has-background-success">Options</option>
                            {searchSpeciesFilter.map(sp => (SetAdvancedSearchOptions(filterTypeSet, sp)))}
                        </select>
                    </div>
                    <div>
                        
                    </div>
                </div>
            </div>
              </div>
            </div>
          );
    }

    return (
        <div className="column is-four-fifths">
            <header>
                <div className="columns is-centered"
                    css={css`position: relative;
                    top: 1vh;
                    width: 100%;`}>
                    <title className="column has-text-left">Search by Animal</title>
                </div>
                <button class="button" onClick={fetchAllAnimals}>All Animals </button>
                {user.accountType !== "Student" ? (     
                    <>      
                    <button class="button"onClick={fetchMyAnimals}>My Animals</button>
                    <button class="button" onClick={addAnimalHandler}>Add Animal</button>
                    </>
                ) : null }
                
            </header>

            <div class="columns">
                <div class="column is-half">
                    <input value={search} onChange={searchChangeHandler} class="input" type="text" placeholder="Enter name or ID"></input>
                </div>
                <div class="column is-half">
                    <button class="button" onClick={searchHandler}>Search</button>
                    <button class="button" onClick={toggleAdvancedSearch}>Advanced Search</button>
                    {advancedSearchOpen && <AdvancedSearchPopup />}
                </div>
                </div>
            

            <div class="box">
                <div class="columns is-full">
                    <div className="column is-one-quarter">
                        <div class="select is-multiple is-fullwidth">
                            <select multiple size="5"  >
                                {filtered.map((animal, index) => {
                                    const { id, name, species, subspecies, breed } = animal
                                    return (
                                        
                                        <option key = {id} value={id} onClick={() => selectHandler(animal)}> {name} : {breed}</option>

                                    )
                                })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="column is-three-quarters">
                        {selected.length === 0 && results.length !== 0? (
                            <div class="box">
                                <p>Select an animal </p>       
                            </div>
                        ) : null}
                        {results.length === 0 ? (
                            <div class="box">
                            <p> No results</p>
                        </div>
                        ) : null}
                        {selected.length !== 0 && results.length !== 0 ? (
                            <div class="box">
                            <p> {selected.id} :  {selected.name}, {selected.species}, {selected.subspecies}</p>
                            <button className="button is-small is-success" css={css`width: 90%;`} onClick={animalProfileHandler}>Animal Profile</button>
                        </div>
                        ) : null}
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