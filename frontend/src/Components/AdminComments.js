/** @jsxImportSource @emotion/react */
import { useState, useEffect, useReducer } from 'react';
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
    const [users, setUsers] = useState([]);

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

    const deleteHandler=  (commentId) => {
        axios.delete('http://localhost:8001/api/admin/comment?id=' + commentId)
            .then((res) => {
                setValue(!value)
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
        var time = date + ' ' + month + ' ' + year;
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
                                <th>Comment ID</th>
                                <th>User ID</th>
                                <th>Animal ID</th>
                                <th>Comment Date</th>
                                <th>Comment Text</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="table is-primary">
                            {comments.map((comment, index) => {
                                const { commentId, userId, animalId, commentDate, commentText } = comment
                                return (
                                    <>
                                        <tr key={commentId}>
                                            <td>{commentId}</td>
                                            <td>{userId}</td>
                                            <td>{animalId}</td>
                                            <td>{timeConverter(commentDate)}</td>
                                            <td>{commentText}</td>
                                            {inEditMode ? (
                                            <button
                                                onClick={() => deleteHandler(commentId)}
                                                className="delete is-small is-danger">
                                            </button>
                                        ) : <td></td>}
                                        </tr>
                                        
                                    </>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}

export default AdminComments;