/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const AddAnimal = ({ user, pageDispatch, animalSelectionDispatch }) => {

    const returnHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    }

    const addHandler = () => {
        if (animalName.length === 0 || animalSpecies.length === 0 ) {
            alert("You must at least enter an animal name and species.")
        } else if(animalSex.length > 1) {
            alert("Sex must be one character.")
        }
        else {
            axios.post(`http://localhost:8001/api/animals`,
                JSON.stringify({
                    name: animalName, bithdate: dateToUnixConverter(animalBirthdate), breed: animalBreed, color: animalColor, features: animalFeatures, microchip: animalMicrochip,
                    rfid: animalRfid, sex: animalSex, species: animalSpecies, subspecies: animalSubspecies, tattooNum: animalTattooNum
                }))
                .then((res) => {
                    console.log(res.data);
                    setAnimalId(res.data);
                    animalSelectionDispatch({
                        command: "add",
                        animal: {
                            id: res.data, name: animalName, bithdate: dateToUnixConverter(animalBirthdate), breed: animalBreed, color: animalColor, features: animalFeatures, microchip: animalMicrochip,
                            rfid: animalRfid, sex: animalSex, species: animalSpecies, subspecies: animalSubspecies, tattooNum: animalTattooNum
                        }
                    });
                    pageDispatch({
                        nextPage: "animalProfile"
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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

    const [animalId, setAnimalId] = useState("")
    const [animalName, setAnimalName] = useState("")
    const [animalBirthdate, setAnimalBirthdate] = useState(getTodayForMax())
    const [animalBreed, setAnimalBreed] = useState("")
    const [animalColor, setAnimalColor] = useState("")
    const [animalFeatures, setAnimalFeatures] = useState("")
    const [animalMicrochip, setAnimalMicrochip] = useState("")
    const [animalRfid, setAnimalRfid] = useState("")
    const [animalSex, setAnimalSex] = useState("")
    const [animalSpecies, setAnimalSpecies] = useState("")
    const [animalSubspecies, setAnimalSubspecies] = useState("")
    const [animalTattooNum, setAnimalTattoo] = useState("")

    return (
        <div className="column is-centered is-three-quarters">
            <div className="box">
                <div className="column is-full">
                    <div className="box">
                        <div className="columns is-full">
                            <div className="column is-half">
                                New Animal
                            </div>
                            <div className="column is-half has-text-right">
                                <button className="button is-success" onClick={addHandler}>
                                    Add Animal
                                </button>
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
                                        <td>Auto-generated</td>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td>
                                            <input
                                                value={animalName}
                                                onChange={animalNameHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalName} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Sex</td>
                                        <td>
                                            <input
                                                value={animalSex}
                                                onChange={animalSexHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalSex} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Species</td>
                                        <td>
                                            <input
                                                value={animalSpecies}
                                                onChange={animalSpeciesHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalSpecies} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Subspecies</td>
                                        <td>
                                            <input
                                                value={animalSubspecies}
                                                onChange={animalSubspeciesHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalSubspecies} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Breed</td>
                                        <td>
                                            <input
                                                value={animalBreed}
                                                onChange={animalBreedHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalBreed} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Birthday</td>
                                        <td>
                                            <input
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
                                                placeholder={animalBirthdate} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Colour</td>
                                        <td>
                                            <input
                                                value={animalColor}
                                                onChange={animalColorHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalColor} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Notable Features</td>
                                        <td>
                                            <input
                                                value={animalFeatures}
                                                onChange={animalFeaturesHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalFeatures} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Microchip #</td>
                                        <td>
                                            <input
                                                value={animalMicrochip}
                                                onChange={animalMicrochipHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalMicrochip} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>RFID</td>
                                        <td>
                                            <input
                                                value={animalRfid}
                                                onChange={animalRfidHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalRfid} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Tattoo Number</td>
                                        <td>
                                            <input
                                                value={animalTattooNum}
                                                onChange={animalTattooHandler}
                                                css={css`
                                                max-width: 50%;
                                                `}
                                                className="input is-small"
                                                type="text"
                                                placeholder={animalTattooNum} />
                                        </td>
                                    </tr>
                                    <tr class="border_bottom"></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

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

export default AddAnimal