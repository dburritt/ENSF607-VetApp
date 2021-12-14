/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import AnimalHeader from './AnimalHeader';
import AnimalFooter from './AnimalFooter';

const AnimalProfile = ({ user, animal, pageDispatch }) => {

    const [value, setValue] = useState(true);
    const [currentAnimal, setCurrentAnimal] = useState(animal);

    useEffect(() => {
        fetchAnimalHandler();
        fetchStatus()
    }, [value]);

    const fetchAnimalHandler = () => {
        axios.get(`http://localhost:8001/api/animals?id=${animal.id}`)
            .then((res) => {
                setCurrentAnimal(res.data.animals[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const fetchStatus = () => {
        axios.get(`http://localhost:8001/api/animals/status?animalId=${animal.id}`)
            .then((res) => {
                setAnimalStatus(res.data.animalStatus.status);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
                var confirmation = window.confirm("Apply changes?");
                if (confirmation) {
                    axios.put(`http://localhost:8001/api/animals?id=${animal.id}`,
                        JSON.stringify({
                            name: animalName, bithdate: dateToUnixConverter(animalBirthdate), breed: animalBreed, color: animalColor, features: animalFeatures, microchip: animalMicrochip,
                            rfid: animalRfid, sex: animalSex, species: animalSpecies, subspecies: animalSubspecies, tattooNum: animalTattooNum
                        }))
                    axios.put(`http://localhost:8001/api/animals/status?animalId=${animal.id}`,
                        JSON.stringify({
                            status: animalStatus
                        }))
                    setValue(!value);
                } else {
                    setAnimalName(currentAnimal.name);
                    setAnimalSex(currentAnimal.sex);
                    setAnimalSpecies(currentAnimal.species);
                    setAnimalSubspecies(currentAnimal.subspecies);
                    setAnimalBirthdate(timeConverter(currentAnimal.bithdate));
                    setAnimalColor(currentAnimal.color);
                    setAnimalFeatures(currentAnimal.features);
                    setAnimalMicrochip(currentAnimal.microchip);
                    setAnimalRfid(currentAnimal.rfid);
                    setAnimalTattoo(currentAnimal.tattooNum);
                    setAnimalTattoo(animalStatus);
                }
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
    const animalStatusHandler = (event) => {
        setAnimalStatus(event.target.value)
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
    const [animalName, setAnimalName] = useState(animal.name);
    const [animalBirthdate, setAnimalBirthdate] = useState(timeConverter(animal.bithdate));
    const [animalBreed, setAnimalBreed] = useState(animal.breed);
    const [animalColor, setAnimalColor] = useState(animal.color);
    const [animalFeatures, setAnimalFeatures] = useState(animal.features);
    const [animalMicrochip, setAnimalMicrochip] = useState(animal.microchip);
    const [animalRfid, setAnimalRfid] = useState(animal.rfid);
    const [animalSex, setAnimalSex] = useState(animal.sex);
    const [animalSpecies, setAnimalSpecies] = useState(animal.species);
    const [animalSubspecies, setAnimalSubspecies] = useState(animal.subspecies);
    const [animalTattooNum, setAnimalTattoo] = useState(animal.tattooNum);
    const [animalStatus, setAnimalStatus] = useState("");

    return (
        <div className="column is-centered is-three-quarters">
            <div className="box" css={css`height: 72vh;
                                                        padding:4px;
                                                        overflow-x: hidden;
                                                        overflow-y: auto;
                                                        position: relative;`}>
                <AnimalHeader
                    user={user}
                    animal={animal} />

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
                                        <td>{currentAnimal.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        {!editState ? (
                                            <td>
                                                {currentAnimal.name}
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
                                                {currentAnimal.sex}
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
                                                {currentAnimal.species}
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
                                                {currentAnimal.subspecies}
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
                                                {currentAnimal.breed}
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
                                                {timeConverter(currentAnimal.bithdate)}
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
                                                {currentAnimal.color}
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
                                                {currentAnimal.features}
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
                                                {currentAnimal.microchip}
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
                                                {currentAnimal.rfid}
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
                                                {currentAnimal.tattooNum}
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
                                    <tr>
                                        <td>Status</td>
                                        {!editState ? (
                                            <td>
                                                {animalStatus}
                                            </td>
                                        ) : <td><input
                                            value={animalStatus}
                                            onChange={animalStatusHandler}
                                            css={css`
                                                max-width: 50%;
                                                `}
                                            className="input is-small"
                                            type="text"
                                            placeholder={animalStatus} /></td>}
                                    </tr>
                                    <tr class="border_bottom"></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

            </div>
            <AnimalFooter
                pageDispatch={pageDispatch} />
        </div>
    )

}

export default AnimalProfile;