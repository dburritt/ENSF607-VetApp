import './App.css';
import 'bulma/css/bulma.css';
import Animals from './Components/Animals';
import Login from './Components/Login';
import RequestApprovals from './Components/RequestApprovals';
import Admin from './Components/Admin';
import React, { useReducer } from 'react';
import { css } from "@emotion/react";

function App() {

  const pageReducer = (state, action) => {

    let newState;
    switch (action.nextPage) {
      case 'request':
        newState = "request";
        break;
      case 'login':
        newState = "login";
        break;
      case 'admin':
        newState = "admin";
        break;
      case 'approvals':
        newState = "approvals";
        break;
      case 'animal':
        newState = "animal";
        break;
      default:
        throw new Error();
    }
    return newState;

  }

  const userReducer = (state, action) => {
    let dict = {};

    if (action.command === "add") {
      dict["name"] = action.name;
      dict["userId"] = action.userId;
      dict["accountType"] = action.accountType;
    }

    if (action.command === "delete") {
      dict["name"] = "guest";
      dict["userId"] = "";
      dict["accountType"] = "";
    }

    return dict;

  }

  const logoutHandler = () => {
    pageDispatch({
      nextPage: "login"
    });
    userDispatch({
      command: "delete",
    });
  }

  const [currentView, pageDispatch] = useReducer(pageReducer, "login")
  const [user, userDispatch] = useReducer(userReducer, {})

  return (
    <>
      <header>
        <div className="App-header">
          <header>U of C Veterinary Medicine Management System</header>
        </div>
      </header>

      <body>
        <div className="App-background is-ancestor">
          {currentView === "login" ? (
            <Login
              pageDispatch={pageDispatch}
              userDispatch={userDispatch} />
          ) : null}
          {(currentView === "request") ? (
            <Animals userInfo={user}
              user={user} />
          ) : null}
          {(currentView === "approvals") ? (
            <RequestApprovals
              user={user} />
          ) : null}
          {(currentView === "admin") ? (
            <Admin
              user={user}
              pageDispatch={pageDispatch} />
          ) : null}
        </div>
      </body>

      <footer class="App-footer">
        <button
          onClick={logoutHandler}
          className="button is-small is-gray">Logout</button>
      </footer>
    </>
  );
}

export default App;
