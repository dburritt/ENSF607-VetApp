/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from "@emotion/react";

const style = document.createElement('style');
style.innerHTML = `
        .table {
            table-layout: auto;
            width: 100%;
        }

        .table thead th {
            background-color: #DDEFEF;
            border: solid 1px #DDEEEE;
            color: #336B6B;
            padding: 2px;
            text-align: center;
            vertical-align: bottom;
            font-size: 12px;
        }

        .table tbody td {
            border: solid 1px #DDEEEE;
            color: #333;
            word-wrap: break-word;
            font-size: 12px;
        }
    `;
document.head.appendChild(style);

const AdminComments = ({ user, pageDispatch }) => {

    const [value, setValue] = useState(true);

    useEffect(() => {
        fetchComments()
    }, [value]);

    const fetchComments = () => {
        axios.get('http://localhost:8001/api/admin/comment')
            .then((res) => {
                setComments(res.data.comments);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editingHandler = () => {
        setEditState(!inEditMode)
    }

    const returnHandler = () => {
        pageDispatch({
            nextPage: "admin"
        });
    }

    const deleteHandler = (commentId) => {
        axios.delete('http://localhost:8001/api/admin/comment?id=' + commentId)
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    const getUserType = (commentId, userId) => {
        axios.get(`http://localhost:8001/api/users/register?id=${userId}`)
            .then((res) => {
                console.log(res.data.users[0]);
                document.getElementById(commentId + 3).innerText = res.data.users[0].accountType;
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

    const [inEditMode, setEditState] = useState(false)
    const [comments, setComments] = useState([]);

    return (
        <>
            <div className="columns"
                css={css`position: relative;
                            width: 40%;
                            margin-right: auto;
                            margin-left: auto;`}>
                <div className="column">
                    <button
                        onClick={() => editingHandler()}
                        css={css`width: 90%;`}
                        className={`button is-small ${inEditMode ? "is-success" : "is-grey"}`}>
                        {inEditMode ? "Finish" : "Edit"}
                    </button>
                </div>
                <div className="column">
                    <button className="button is-small" css={css`width: 90%;`} onClick={returnHandler}>Return</button>
                </div>
            </div>
            <div className="columns is-centered"
                css={css`position: relative;
                width: 75%;
                margin-right: auto;
                margin-left: auto;`}>
                <div className="column">
                    <title className="tile has-text-left">Comments</title>
                    <table className="table has-text-centered">
                        <thead class="table is-primary">
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Animal ID</th>
                                <th>Comment Date</th>
                                <th>Comment Text</th>
                                <th>Account Type</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table is-primary">
                            {comments.map((comment, index) => {
                                const { commentId, userId, animalId, commentDate, commentText } = comment
                                return (
                                    <>
                                        <tr key={commentId}>
                                            <td>{userId}</td>
                                            <td id={commentId + 1}>{getUserFirstName(commentId, userId)}</td>
                                            <td id={commentId + 2}>{getUserLastName(commentId, userId)}</td>
                                            <td>{animalId}</td>
                                            <td>{timeConverter(commentDate)}</td>
                                            <td>{commentText}</td>
                                            <td id={commentId + 3}>{getUserType(commentId, userId)}</td>
                                            {inEditMode ? (
                                                <td>
                                                    <button
                                                        onClick={() => deleteHandler(commentId)}
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
        </>
    )

}

export default AdminComments;