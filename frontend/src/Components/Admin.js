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
            min-width: 30px;
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

    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newAccountType, setNewAccountType] = useState("Student");
    const [newActivationDate, setNewActivationDate] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");

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

    const searchHandler = () => {
        pageDispatch({
            nextPage: "basicSearch"
        });
    };

    const editingHandler = () => {
        setEditState(!inEditMode)
    }

    const deleteHandler = (userId) => {
        axios.delete('http://localhost:8001/api/users/register?id=' + userId)
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const addHandler = () => {
        if (newUsername.length === 0 || newPassword.length === 0 || newActivationDate.length !== 10 ||
            newFirstName.length === 0 || newLastName.length === 0 || newEmail.length === 0) {
            alert("All fields must be entered.")
            return
        }

        axios.post('http://localhost:8001/api/users/register', JSON.stringify({
            username: newUsername, password: newPassword,
            accountType: newAccountType, activationDate: newActivationDate, fName: newFirstName, lName: newLastName, email: newEmail
        }))
            .then((res) => {
                setValue(!value)
            })
            .catch((err) => {
                console.log(err);
            });

        resetNewUserStates();
        editingHandler();
    }

    const usernameHandler = (event) => {
        setNewUsername(event.target.value)
    }
    const passwordHandler = (event) => {
        setNewPassword(event.target.value)
    }
    const accountTypeHandler = (event) => {
        setNewAccountType(event.target.value)
    }
    const activationDateHandler = (event) => {
        setNewActivationDate(event.target.value)
    }
    const firstNameHandler = (event) => {
        setNewFirstName(event.target.value)
    }
    const lastNameHandler = (event) => {
        setNewLastName(event.target.value)
    }
    const emailHandler = (event) => {
        setNewEmail(event.target.value)
    }

    const resetNewUserStates = () => {
        setNewUsername("")
        setNewPassword("")
        setNewAccountType("")
        setNewActivationDate("")
        setNewFirstName("")
        setNewLastName("")
        setNewEmail("")
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
            <div className="column is-full has-text-centered">
                <div className="columns"
                    css={css`position: relative;
                            width: 40%;
                            margin-right: auto;
                            margin-left: auto;`}>
                    <title className="column has-text-center">User and Comment Management</title>
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
                        <button className="button is-small" css={css`width: 90%;`} onClick={searchHandler}>Search Animals</button>
                    </div>



                </div>

                {

                    inEditMode ? (
                        <div className="columns"
                            css={css`position: relative;
                                width: 70%;
                                margin-right: auto;
                                margin-left: auto;`}>
                            <div className="column">
                                <title className="tile has-text-left">Add User</title>
                                <table className="table">
                                    <thead class="table is-primary">
                                        <tr>
                                            <th>Username</th>
                                            <th>Password</th>
                                            <th>Account Type</th>
                                            <th>Activation Date</th>
                                            <th>First Name</th>
                                            <th>Last Name</th>
                                            <th>Email</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody class="table is-primary">
                                        <tr>
                                            <td>
                                                <input
                                                    onChange={usernameHandler}
                                                    css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                    className="input is-small"
                                                    type="text" />
                                            </td>
                                            <td><input
                                                onChange={passwordHandler}
                                                css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                className="input is-small"
                                                type="text" /></td>
                                            <td>
                                                <select onChange={accountTypeHandler}>
                                                    <option>Student</option>
                                                    <option>Instructor</option>
                                                    <option>Health Technician</option>
                                                    <option>Admin</option>
                                                </select>
                                                {/* <input
                                                    onChange={accountTypeHandler}
                                                    css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                    className="input is-small"
                                                    type="text" /> */}
                                            </td>
                                            <td><input
                                                onChange={activationDateHandler}
                                                css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                className="input is-small"
                                                type="text"
                                                placeholder="YYYY-MM-DD" /></td>
                                            <td><input
                                                onChange={firstNameHandler}
                                                css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                className="input is-small"
                                                type="text" /></td>
                                            <td><input
                                                onChange={lastNameHandler}
                                                css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                className="input is-small"
                                                type="text" /></td>
                                            <td><input
                                                onChange={emailHandler}
                                                css={css`
                                                    max-width: 90%;
                                                    margin-right: 6px
                                                    `}
                                                className="input is-small"
                                                type="text" /></td>
                                            <td>
                                                <button
                                                    onClick={() => addHandler()}
                                                    className="button is-small is-success is-rounded">
                                                    ADD</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : null}

                <div className="columns is-centered"
                    css={css`position: relative;`}>
                    <div className="column">
                        <title className="tile has-text-left">Staff</title>
                        <table className="table">
                            <thead class="table is-primary">
                                <tr>
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
                                                <td>{username}</td>
                                                <td>{accountType}</td>
                                                <td>{timeConverter(activationDate)}</td>
                                                <td>{fname}</td>
                                                <td>{lname}</td>
                                                <td>{email}</td>
                                                {inEditMode ? (
                                                    <td>
                                                        <button
                                                            onClick={() => deleteHandler(id)}
                                                            className="delete is-medium is-danger">
                                                        </button></td>
                                                ) : <td></td>}
                                            </tr>
                                        )
                                    })
                                }
                                <tr class="border_bottom"></tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <title className="tile has-text-left">Students</title>
                        <table className="table">
                            <thead class="table is-primary">
                                <tr>
                                    <th>Username</th>
                                    <th>Activation Date</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody class="table is-primary">
                                {users.filter((user) => user.accountType === "Student")
                                    .map((user, index) => {
                                        const { id, username, password, accountType, activationDate, fname, lname, email } = user
                                        return (
                                            <tr key={id}>
                                                <td>{username}</td>
                                                <td>{timeConverter(activationDate)}</td>
                                                <td>{fname}</td>
                                                <td>{lname}</td>
                                                <td>{email}</td>
                                                {inEditMode ? (
                                                    <td>
                                                        <button
                                                            onClick={() => deleteHandler(id)}
                                                            className="delete is-medium is-danger">
                                                        </button></td>
                                                ) : <td></td>}
                                            </tr>
                                        )
                                    })
                                }
                                <tr class="border_bottom"></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>

    );

}

export default Admin;