/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const AnimalProfile = ({ user, animal, pageDispatch }) => {

    useEffect(() => {
        fetchAnimal()
    }, []);

    const [currentAnimal, setAnimal] = useState({});

    const fetchAnimal = () => {
        axios.get('http://localhost:8001/api/animals?id=' + animal.animalId)
            .then((res) => {
                setAnimal(res.data.animals[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const returnHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    }

    return (
        <div>
            <div className="columns"
                css={css`position: relative;
                            width: 40%;
                            margin-right: auto;
                            margin-left: auto;`}>
                <div className="column">
                    <button className="button is-small" css={css`width: 90%;`} onClick={returnHandler}>Return</button>
                </div>
            </div>
        </div>
    )

}

export default AnimalProfile