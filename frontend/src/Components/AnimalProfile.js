/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const AnimalProfile = ({ user, animal, pageDispatch }) => {

    useEffect(() => {
    }, []);

    const [currentAnimal, setAnimal] = useState({});

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