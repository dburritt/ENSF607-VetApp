/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const Login = ({ loginDispatch, userDispatch }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const loginChangeHandler = (event) => {
        setUserName(event.target.value)
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
    }

    const loginHandler = () => {
        if (username.length === 0 || password.length === 0) {
            alert("Username and password must be entered.")
            return
        }

        axios.post('http://localhost:8001/api/login/', JSON.stringify({ username, password }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then((response) => {
                let s = response.data.users[0]
                userDispatch({
                    command: "add",
                    name: s.fname,
                    accountType: s.accountType
                });
                loginDispatch({
                    nextPage: "animal"
                });
            })
            .catch((err) => {
                console.log(err);
            });

        setUserName("");
        setPassword("");
    };

    return (
        <div class="columns is-multiline is-mobile">
            <div class="column">
                <input
                    value={username}
                    onChange={loginChangeHandler}
                    className="input is-small"
                    type="text"
                    placeholder="Enter username." />
            </div>

            <div class="column">
            <input
                value={password}
                onChange={passwordChangeHandler}
                className="input is-small"
                type="text"
                placeholder="Enter password." />
            </div>

            <div class="column">
            <button
                onClick={loginHandler}
                className="button is-small is-success">Login</button>
            </div>

        </div>
    )
};

export default Login;