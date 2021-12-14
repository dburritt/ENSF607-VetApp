/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';
import AnimalHeader from './AnimalHeader';
import AnimalFooter from './AnimalFooter';

const AnimalComments = ({ user, animal, pageDispatch }) => {

    const [value, setValue] = useState(true);

    useEffect(() => {
        fetchStudentComments();
        fetchStaffComments();
    }, [value]);

    const fetchStudentComments = () => {
        axios.get(`http://localhost:8001/api/admin/comment?commentType=student&animalId=${animal.id}`)
            .then((res) => {
                setStudentComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchStaffComments = () => {
        axios.get(`http://localhost:8001/api/admin/comment?commentType=staff&animalId=${animal.id}`)
            .then((res) => {
                setStaffComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const addCommentHandler = (event) => {
        setNewComment(event.target.value)
    };

    const deleteCommentsHandler = (commentId) => {
        axios.delete('http://localhost:8001/api/admin/comment?id=' + commentId)
        .then((res) => {
            setValue(!value)
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const removeCommentsHandler = (commentId) => {
        setDeleteState(!inDeleteMode);
    }

    const addSaveHandler = () => {
        setAddState(!addState)
        if (addState) {
            if (newComment.length > 0) {
                axios.post('http://localhost:8001/api/admin/comment', JSON.stringify({
                    commentText: newComment, userId: user.userId, animalId: animal.id
                }))
            }
            setNewComment("");
            setValue(!value);
        }
    };

    const getUserFirstName = (commentId, userId) => {
        axios.get(`http://localhost:8001/api/users/register?id=${userId}`)
            .then((res) => {
                document.getElementById(commentId + 1).innerText = res.data.users[0].fname;
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const getUserLastName = (commentId, userId) => {
        axios.get(`http://localhost:8001/api/users/register?id=${userId}`)
            .then((res) => {
                document.getElementById(commentId + 2).innerText = res.data.users[0].lname;
            })
            .catch((err) => {
                console.log(err);
            });

    }

    const timeConverter = (UNIX_timestamp) => {
        var a = new Date(UNIX_timestamp);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
        var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        var time = month + ' ' + date + ', ' + year + ' ' + hour + ':' + min + ':' + sec;
        return time;
    }

    const [studentComments, setStudentComments] = useState([]);
    const [staffComments, setStaffComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [addState, setAddState] = useState(false);
    const [inDeleteMode, setDeleteState] = useState(false)

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
                                <div className="title is-3">
                                    Staff Comments
                                </div>
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType !== "Student" ? (
                                    <button className="button is-success is-small" css={css`margin-right: 4px;`} onClick={addSaveHandler}>
                                        {!addState ? (
                                            "Add Comment"
                                        ) : "Save"}
                                    </button>
                                ) : null}
                                {user.accountType === "Admin" ? (
                                    <button className="button is-danger is-small" onClick={removeCommentsHandler}>
                                        {!inDeleteMode ? (
                                            "Remove Comments"
                                        ) : "Return"}
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        {(addState && user.accountType !== "Student") ? (
                            <textarea css={css`
                                max-width: 100%;
                                height: 15vh;
                                `}
                                onChange={addCommentHandler}
                                className="input"
                                type="text"
                                placeholder="Please enter your comment here.">

                            </textarea>
                        ) : null}
                        <div className="column is-full">
                            <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Comment Date</th>
                                        <th>Comment Text</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody class="table is-primary">
                                    {staffComments.map((comment) => {
                                        const { commentId, userId, animalId, commentDate, commentText } = comment
                                        return (
                                            <>
                                                <tr key={commentId}>
                                                    <td>{userId}</td>
                                                    <td id={commentId + 1}>{getUserFirstName(commentId, userId)}</td>
                                                    <td id={commentId + 2}>{getUserLastName(commentId, userId)}</td>
                                                    <td>{timeConverter(commentDate)}</td>
                                                    <td>{commentText}</td>
                                                    {inDeleteMode ? (
                                                        <td>
                                                            <button
                                                                onClick={() => deleteCommentsHandler(commentId)}
                                                                className="delete is-small is-danger">
                                                            </button>
                                                        </td>
                                                    ) : <td></td>}
                                                </tr>

                                            </>
                                        )
                                    })
                                    }
                                    <tr class="border_bottom"></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="box">
                        <div className="columns is-full">
                            <div className="title is-3">
                                Student Comments
                            </div>
                            <div className="column is-half has-text-right">
                                {user.accountType === "Student" ? (
                                    <button className="button is-success" onClick={addSaveHandler}>
                                        {!addState ? (
                                            "Add Comment"
                                        ) : "Save"}
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        {(addState && user.accountType === "Student") ? (
                            <textarea css={css`
                                max-width: 100%;
                                height: 15vh;
                                `}
                                onChange={addCommentHandler}
                                className="input"
                                type="text"
                                placeholder="Please enter your comment here.">

                            </textarea>
                        ) : null}
                        <div className="column is-full">
                            <table className="table has-text-centered">
                                <thead class="table is-primary">
                                    <tr>
                                        <th>User ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Comment Date</th>
                                        <th>Comment Text</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody class="table is-primary">
                                    {studentComments.map((comment) => {
                                        const { commentId, userId, animalId, commentDate, commentText } = comment
                                        return (
                                            <>
                                                <tr key={commentId}>
                                                    <td>{userId}</td>
                                                    <td id={commentId + 1}>{getUserFirstName(commentId, userId)}</td>
                                                    <td id={commentId + 2}>{getUserLastName(commentId, userId)}</td>
                                                    <td>{timeConverter(commentDate)}</td>
                                                    <td>{commentText}</td>
                                                    {inDeleteMode ? (
                                                        <td>
                                                            <button
                                                                onClick={() => deleteCommentsHandler(commentId)}
                                                                className="delete is-small is-danger">
                                                            </button>
                                                        </td>
                                                    ) : <td></td>}
                                                </tr>

                                            </>
                                        )
                                    })
                                    }
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

export default AnimalComments