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
                console.log(res.data.animals)
                setAnimal(res.data.animals);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div></div>
    )

}

export default AnimalProfile