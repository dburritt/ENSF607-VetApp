/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const AnimalProfile = ({ user, animal, pageDispatch }) => {

    const [value, setValue] = useState(true);
    const [currentAnimal, setCurrentAnimal] = useState(animal);

    // useEffect(() => {
    //     fetchAnimalHandler();
    // }, [value]);

    const returnHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    }

    const navigationHandler = (event) => {
        if (event.target.value === "Animal Profile") {
            pageDispatch({
                nextPage: "animalProfile"
            });
        }
        if (event.target.value === "Weight Record") {
            pageDispatch({
                nextPage: "weightRecord"
            });
        }
        if (event.target.value === "Health Record") {
            pageDispatch({
                nextPage: "healthRecord"
            });
        }
        if (event.target.value === "Pictures") {
            pageDispatch({
                nextPage: "pictures"
            });
        }
        if (event.target.value === "Comments") {
            pageDispatch({
                nextPage: "comments"
            });
        }
    }

    // const fetchAnimalHandler = () => {
    //     axios.get(`http://localhost:8001/api/animals?id=${animal.id}`)
    //         .then((res) => {
    //             setCurrentAnimal(res.data.animals[0]);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }

    const editHandler = () => {
        if (editState) {
            if (animalName.length === 0 || animalSpecies.length === 0) {
                alert("Animal must have a name and species entered.");
                return;
            } else if (animalSex.length > 1) {
                alert("Sex must be one character.");
                return;
            }
            else {
                axios.put(`http://localhost:8001/api/animals?id=${animal.id}`,
                    JSON.stringify({
                        name: animalName, bithdate: dateToUnixConverter(animalBirthdate), breed: animalBreed, color: animalColor, features: animalFeatures, microchip: animalMicrochip,
                        rfid: animalRfid, sex: animalSex, species: animalSpecies, subspecies: animalSubspecies, tattooNum: animalTattooNum
                    }))
                setValue(!value);
            }
        }
        setEditState(!editState);
    };

    const animalNameHandler = (event) => {
        setAnimalName(event.target.value)
    }
    const animalSexHandler = (event) => {
        setAnimalSex(event.target.value)
    }
    const animalSpeciesHandler = (event) => {
        setAnimalSpecies(event.target.value)
    }
    const animalSubspeciesHandler = (event) => {
        setAnimalSubspecies(event.target.value)
    }
    const animalBreedHandler = (event) => {
        setAnimalBreed(event.target.value)
    }
    const animalBirthdayHandler = (event) => {
        setAnimalBirthdate(event.target.value)
    }
    const animalColorHandler = (event) => {
        setAnimalColor(event.target.value)
    }
    const animalFeaturesHandler = (event) => {
        setAnimalFeatures(event.target.value)
    }
    const animalMicrochipHandler = (event) => {
        setAnimalMicrochip(event.target.value)
    }
    const animalRfidHandler = (event) => {
        setAnimalRfid(event.target.value)
    }
    const animalTattooHandler = (event) => {
        setAnimalTattoo(event.target.value)
    }

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var year = a.getFullYear();
        var month = (a.getMonth() + 1) < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
        var date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
        var time = year + '-' + month + '-' + date;
        return time;
    }

    const dateToUnixConverter = (dateString) => {
        let dateStringSplit = dateString.split("-")
        let date = new Date();

        date.setDate(dateStringSplit[2]);
        date.setMonth(dateStringSplit[1] - 1);
        date.setFullYear(dateStringSplit[0]);

        let unixSeconds = Math.floor(date.getTime())

        return unixSeconds;

    }

    const getTodayForMax = () => {

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;

    }

    const [editState, setEditState] = useState(false);
    const [animalId, setAnimalId] = useState(animal.id)
    const [animalName, setAnimalName] = useState(animal.name)
    const [animalBirthdate, setAnimalBirthdate] = useState(timeConverter(animal.bithdate))
    const [animalBreed, setAnimalBreed] = useState(animal.breed)
    const [animalColor, setAnimalColor] = useState(animal.color)
    const [animalFeatures, setAnimalFeatures] = useState(animal.features)
    const [animalMicrochip, setAnimalMicrochip] = useState(animal.microchip)
    const [animalRfid, setAnimalRfid] = useState(animal.rfid)
    const [animalSex, setAnimalSex] = useState(animal.sex)
    const [animalSpecies, setAnimalSpecies] = useState(animal.species)
    const [animalSubspecies, setAnimalSubspecies] = useState(animal.subspecies)
    const [animalTattooNum, setAnimalTattoo] = useState(animal.tattooNum)

    return (
        <div className="column is-centered is-three-quarters">
            <div className="box">
                <div className="columns is-full"
                    css={css`max-height: 90px;`}>
                    <div className="column is-one-quarter" >
                        <div className="box" css={css`height: 90px;`}>
                            Profile picture
                        </div>
                    </div>
                    <div className="column is-one-quarter">
                        <div className="box" css={css`height: 90px;`}>
                            <nav >
                                <ul css={css`list-style-type: none;
                                margin: 0em;
                                padding: 0;
                                max-height: 90px;`}>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Name: {animal.name}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Type: {animal.subspecies}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Colour: {animal.color}</li>
                                    <li className="content is-small" css={css`list-style-type: none; margin-bottom: -1.25rem; margin-top: -1.25rem;`}>Status: { }</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="column is-one-half">
                        <div className="box" css={css`height: 90px;`}>
                            Reminders
                        </div>
                    </div>
                </div>


                <div className="column is-full">
                    <div className="box">
                        <div className="columns is-full">
                            <div className="column is-half">
                                Basic Info
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType !== "Student" ? (
                                    <button className="button is-success" onClick={editHandler}>
                                        {!editState ? (
                                            "Edit"
                                        ) : "Save"}
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        <div className="column is-full">
                            <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>Attribute</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody class="table is-primary">
                                    <tr>
                                        <td>Animal ID</td>
                                        <td>{animalId}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        {!editState ? (
                                            <td>
                                                {animalName}
                                            </td>
                                        ) : <td><input
                                            value={animalName}
                                            onChange={animalNameHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalName} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Sex</td>
                                        {!editState ? (
                                            <td>
                                                {animalSex}
                                            </td>
                                        ) : <td><input
                                            value={animalSex}
                                            onChange={animalSexHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalSex} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Species</td>
                                        {!editState ? (
                                            <td>
                                                {animalSpecies}
                                            </td>
                                        ) : <td><input
                                            value={animalSpecies}
                                            onChange={animalSpeciesHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalSpecies} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Subspecies</td>
                                        {!editState ? (
                                            <td>
                                                {animalSubspecies}
                                            </td>
                                        ) : <td><input
                                            value={animalSubspecies}
                                            onChange={animalSubspeciesHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalSubspecies} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Breed</td>
                                        {!editState ? (
                                            <td>
                                                {animalBreed}
                                            </td>
                                        ) : <td><input
                                            value={animalBreed}
                                            onChange={animalBreedHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalBreed} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Birthday</td>
                                        {!editState ? (
                                            <td>
                                                {animalBirthdate}
                                            </td>
                                        ) : <td><input
                                            value={animalBirthdate}
                                            onKeyDown={(e) => e.preventDefault()}
                                            onChange={animalBirthdayHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="date"
                                            min="1850-01-01"
                                            max={getTodayForMax()}
                                            placeholder={animalBirthdate} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Colour</td>
                                        {!editState ? (
                                            <td>
                                                {animalColor}
                                            </td>
                                        ) : <td><input
                                            value={animalColor}
                                            onChange={animalColorHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalColor} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Notable Features</td>
                                        {!editState ? (
                                            <td>
                                                {animalFeatures}
                                            </td>
                                        ) : <td><input
                                            value={animalFeatures}
                                            onChange={animalFeaturesHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalFeatures} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Microchip #</td>
                                        {!editState ? (
                                            <td>
                                                {animalMicrochip}
                                            </td>
                                        ) : <td><input
                                            value={animalMicrochip}
                                            onChange={animalMicrochipHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalMicrochip} /></td>}
                                    </tr>
                                    <tr>
                                        <td>RFID</td>
                                        {!editState ? (
                                            <td>
                                                {animalRfid}
                                            </td>
                                        ) : <td><input
                                            value={animalRfid}
                                            onChange={animalRfidHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalRfid} /></td>}
                                    </tr>
                                    <tr>
                                        <td>Tattoo Number</td>
                                        {!editState ? (
                                            <td>
                                                {animalTattooNum}
                                            </td>
                                        ) : <td><input
                                            value={animalTattooNum}
                                            onChange={animalTattooHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalTattooNum} /></td>}
                                    </tr>
                                    <tr class="border_bottom"></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
            <div className="columns"
                css={css`position: relative;
                            width: 100%;
                            margin-right: auto;
                            margin-left: auto;
                            margin-bottom: 0.5rem;`}>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Animal Profile" onClick={navigationHandler}>Animal Profile</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Weight Record" onClick={navigationHandler}>Weight Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Health Record" onClick={navigationHandler}>Health Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Pictures" onClick={navigationHandler}>Pictures</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`} value="Comments" onClick={navigationHandler}>Comments</button>
                </div>
            </div>
            <div className="columns is-centered"
                css={css`position: relative;
                            width: 30%;
                            margin-left: auto;
                            margin-right: auto;`}>
                <div className="column">
                    <button className="button is-fullwidth is-small is-success" css={css`width: 90%;`} onClick={returnHandler}>Return to Search</button>
                </div>
            </div>
        </div>
    )

}

export default AnimalProfile