/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from "@emotion/react";
import axios from 'axios';

const Login = ({ pageDispatch, userDispatch }) => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const loginChangeHandler = (event) => {
        setUserName(event.target.value)
        setMessage("")
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value)
        setMessage("")
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
                    userId: s.id,
                    accountType: s.accountType
                });
                if (s.accountType === "Admin") {
                    pageDispatch({
                        nextPage: "admin"
                    });
                }
                // else if (s.accountType === "Instructor"){
                //     pageDispatch({
                //         nextPage: "request"
                //     });
                // }
                else {
                    pageDispatch({
                        nextPage: "basicSearch"
                    });
                }
            })
            .catch((err) => {
                setMessage("Invalid credentials.")
                console.log(err);
            });

        setUserName("");
        setPassword("");
    };

    return (
        <div class="columns is-multiline is-mobile"
            css={css`vertical-align: top;`}>
            <div class="column" css={css`text-align: center; padding: 10px;`}>
                <input
                    value={username}
                    onChange={loginChangeHandler}
                    className="input is-small"
                    type="text"
                    placeholder="Enter username." />
            </div>

            <div class="column" css={css`text-align: center; padding: 10px;`}>
                <input
                    value={password}
                    onChange={passwordChangeHandler}
                    className="input is-small"
                    type="password"
                    placeholder="Enter password." />
            </div>

            <div class="column" css={css`text-align: center; padding: 10px;`}>
                <button
                    onClick={loginHandler}
                    className="button is-small is-success">Login</button>
            </div>

            <div class="column" css={css`text-align: center; padding: 10px; font-size: small;`}>
                <p>{message}</p>
            </div>

        </div>
    )
};

export default Login;