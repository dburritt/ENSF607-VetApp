import './App.css';
import 'bulma/css/bulma.css'
import Animals from './Components/Animals';
import Login from './Components/Login'
import RequestApprovals from './Components/RequestApprovals'
import React, { useReducer } from 'react';

function App() {

  const pageReducer = (state, action) => {

    let newState;
    switch (action.nextPage) {
      case 'animal':
        newState = "animal";
        break;
      case 'login':
        newState = "login";
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
      <div className="App-header">
        <header>U of C Veterinary Medicine Management System</header>
      </div>

      <div className="App-background">
        {currentView === "login" ? (
          <Login
            loginDispatch={pageDispatch}
            userDispatch={userDispatch} />
        ) : null}
        {(currentView === "animal" && user.accountType === "Instructor") ? (
          <Animals userInfo={user}
            user={user}
            pageDispatch={pageDispatch} />
        ) : null}
        {(currentView === "animal" && (user.accountType === "Admin" || user.accountType === "Health Technician")) ? (
          <RequestApprovals
            user={user}
            loginDispatch={pageDispatch}
            userDispatch={userDispatch} />
        ) : null}
      </div>

      <footer class="footer is-flex-direction-column has-text-centered">
        <button
          onClick={logoutHandler}
          className="button is-small is-gray">Logout</button>
      </footer>
    </>
  );
}

export default App;
