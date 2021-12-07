/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const AnimalComments = ({ user, animal, pageDispatch }) => {

    useEffect(() => {
        fetchComments();
    }, []);

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

    const fetchComments = () => {
        axios.get('http://localhost:8001/api/admin/comment')
            .then((res) => {
                setComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }

    const [comments, setComments] = useState([]);

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
                                Staff Comments
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType !== "Student" ? (
                                    <button className="button is-success">Add Comment</button>
                                ) : null}
                            </div>
                        </div>
                        <div className="column is-full">
                            <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>User ID</th>
                                        <th>Comment Date</th>
                                        <th>Comment Text</th>
                                    </tr>
                                </thead>

                                <tbody class="table is-primary">
                                    {comments.map((comment) => {
                                        const { commentId, userId, animalId, commentDate, commentText } = comment
                                        return (
                                            <>
                                                <tr key={commentId}>
                                                    <td>{userId}</td>
                                                    <td>{timeConverter(commentDate)}</td>
                                                    <td>{commentText}</td>
                                                </tr>

                                            </>
                                        )
                                    })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="box">
                        <div className="columns is-full">
                            <div className="column is-half">
                                Student Comments
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType === "Student" ? (
                                    <button className="button is-success">Add Comment</button>
                                ) : null}
                            </div>
                        </div>
                        <div className="column is-full">
                        <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>User ID</th>
                                        <th>Comment Date</th>
                                        <th>Comment Text</th>
                                    </tr>
                                </thead>

                                <tbody class="table is-primary">
                                    {comments.map((comment) => {
                                        const { commentId, userId, animalId, commentDate, commentText } = comment
                                        return (
                                            <>
                                                <tr key={commentId}>
                                                    <td>{userId}</td>
                                                    <td>{timeConverter(commentDate)}</td>
                                                    <td>{commentText}</td>
                                                </tr>

                                            </>
                                        )
                                    })
                                    }
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

export default AnimalComments