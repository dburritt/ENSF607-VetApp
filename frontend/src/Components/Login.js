/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const Login = ({ loginDispatch, userDispatch }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

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

        axios.post(`http://localhost:8001/api/login/ `, JSON.stringify({username: username, password: password}), {headers: {"Content-Type" : "application/json"}})
        .then((response) => {
            let s = JSON.parse(response.data.user)
            userDispatch({command: "add",
                            name: s.fname, 
                            accountType: s.accountType});
            loginDispatch({
                nextPage: "animal"
            });
            console.log()
         })
        .catch((err) => {
            console.log(err);
        });

        setUserName("");
        setPassword("");
    };

    return (
        <div className="tile is-parent">

                    <input
                        value={username}
                        onChange={loginChangeHandler}
                        css={css`
                            display:flex;
                            flex-direction:column;
                            max-width: 60%;
                            margin-bottom: 10px
                            `}
                        className="input is-small"
                        type="text"
                        placeholder="Enter username." />

                    <input
                        value={password}
                        onChange={passwordChangeHandler}
                        css={css`
                            display:flex;
                            flex-direction:column;
                            max-width: 60%;
                            margin-bottom: 10px
                            `}
                        className="input is-small"
                        type="text"
                        placeholder="Enter username." />

                <button
                    onClick={loginHandler}
                    css={css`
                        display:flex;
                        flex-direction:column;
                        max-width: 60%;
                        margin-bottom: 10px
                        `}
                    className="button is-small is-success">Login</button>


        </div>
    )
};

export default Login;