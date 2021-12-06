/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { css } from "@emotion/react";

const style = document.createElement('style');
style.innerHTML = `
        .table {
            table-layout: auto;
            width: 90%;
        }

        .table th {
            background-color: #DDEFEF;
            border: solid 1px #DDEEEE;
            color: #336B6B;
            padding: 2px;
            text-align: center;
            vertical-align: bottom;
            font-size: 12px;
        }

        .table td {
            border: solid 1px #DDEEEE;
            color: #333;
            word-wrap: break-word;
            font-size: 9px;
        }
    `;
document.head.appendChild(style);

const Admin = ({ user, pageDispatch }) => {

    const [value, setValue] = useState(true);
    const [users, setUsers] = useState([]);
    const [inEditMode, setEditState] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [value]);

    const fetchUsers = () => {
        axios.get('http://localhost:8001/api/users/register')
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => {
                console.log(err);
            });

    };

    const approvalsHandler = () => {
        pageDispatch({
            nextPage: "approvals"
        });
    };

    const commentHandler = () => {
        pageDispatch({
            nextPage: "allComments"
        });
    };

    const editingHandler = () => {
        setEditState(!inEditMode)
    }

    const deleteHandler=  (userId) => {
        axios.delete('http://localhost:8001/api/users/register?id=' + userId)
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

    return (
        <>
            <div className="column is-full has-text-centered"
            >
                <div className="columns is-centered"
                    css={css`position: absolute;
                    top: 1vh;
                    width: 100%;`}>
                    <title className="column has-text-left">User and Comment Management</title>
                    <title className="column has-text-right">{user.accountType} - {user.name}</title>
                </div>

                <div className="columns"
                    css={css`position: relative;
                            width: 40%;
                            margin-right: auto;
                            margin-left: auto;`}>
                    <div className="column">
                        <button className="button is-small" css={css`width: 90%;`} onClick={commentHandler}>Manage Comments</button>
                    </div>
                    <div className="column">
                        <button className="button is-small" css={css`width: 90%;`} onClick={approvalsHandler}>Manage Approvals</button>
                    </div>
                    <div className="column">
                        <button
                            onClick={() => editingHandler()}
                            css={css`width: 90%;`}
                            className={`button is-small ${inEditMode ? "is-success" : "is-grey"}`}>
                            {inEditMode ? "Managing" : "Manage Users"}</button>
                    </div>
                    <div className="column">
                        <button className="button is-small" css={css`width: 90%;`}>Search Animals</button>
                    </div>
                </div>

                <div className="columns is-centered"
                    css={css`position: relative;`}>
                    <div className="column">
                        <title className="tile has-text-left">Staff</title>
                        <table className="table">
                            <thead class="table is-primary">
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Account Type</th>
                                    <th>Activation Date</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="table is-primary">
                                {users.filter((user) => (user.accountType === "Admin" || user.accountType === "Health Technician" || user.accountType === "Instructor"))
                                    .map((user, index) => {
                                        const { id, username, password, accountType, activationDate, fname, lname, email } = user
                                        return (
                                            <tr key={id}>
                                                <td>{id}</td>
                                                <td>{username}</td>
                                                <td>{accountType}</td>
                                                <td>{timeConverter(activationDate)}</td>
                                                <td>{fname}</td>
                                                <td>{lname}</td>
                                                <td>{email}</td>
                                                {inEditMode ? (
                                                    <button
                                                        onClick={() => deleteHandler(id)}
                                                        className="delete is-small is-danger">
                                                    </button>
                                                ) : <td></td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <title className="tile has-text-left">Students</title>
                        <table className="table">
                            <thead class="table is-primary">
                                <tr>
                                    <th>Id</th>
                                    <th>Username</th>
                                    <th>Activation Date</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody class="table is-primary">
                                {users.filter((user) => user.accountType === "Student")
                                    .map((user, index) => {
                                        const { id, username, password, accountType, activationDate, fname, lname, email } = user
                                        return (
                                            <tr key={id}>
                                                <td>{id}</td>
                                                <td>{username}</td>
                                                <td>{timeConverter(activationDate)}</td>
                                                <td>{fname}</td>
                                                <td>{lname}</td>
                                                <td>{email}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>

    );

}

export default Admin;