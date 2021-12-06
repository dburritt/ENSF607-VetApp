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
        <div className="column is-centered is-three-quarters" css={css`position: relative; margin-bottom: 0.5rem;`}>
            <div className="box" css={css`border-color: coral; border-width: thin;`}>
                <div className="columns is-full">
                    <div className="column is-one-quarter">
                        <div className="box">
                            profile picture
                        </div>
                    </div>
                    <div className="column is-one-quarter">
                        <div className="box">
                            animal summary
                        </div>
                    </div>
                    <div className="column is-one-half">
                        <div className="box">
                            reminders
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
                                    <button className="button is-success">Edit</button>
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
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
                            <tr>
                                <td>Animal ID</td>
                                <td>{animal.id}</td>
                            </tr>
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
                    <button className="button is-small" css={css`width: 100%; margin: 0px;`}>Animal Profile</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`}>Weight Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`}>Health Record</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`}>Pictures</button>
                </div>
                <div className="column" css={css`padding-left: 1px; padding-right: 1px;`}>
                    <button className="button is-small" css={css`width: 100%;`}>Search Animals</button>
                </div>
            </div>
            <div className="columns"
                css={css`position: relative;
                            width: 30%;
                            margin-right: auto;
                            margin-left: auto;`}>
                <div className="column">
                    <button className="button is-small" css={css`width: 90%;`} onClick={returnHandler}>Return to Search</button>
                </div>
            </div>
        </div>
    )

}

export default AnimalProfile