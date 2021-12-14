/** @jsxImportSource @emotion/react */
import './App.css';
import 'bulma/css/bulma.css';
import RequestsMenu from './Components/Requests';
import Login from './Components/Login';
import RequestApprovals from './Components/RequestApprovals';
import Admin from './Components/Admin';
import AdminComments from './Components/AdminComments';
import BasicSearch from './Components/BasicSearch';
import AnimalProfile from './Components/AnimalProfile';
import HealthRecord from './Components/HealthRecord';
import AnimalComments from './Components/Comments';
import WeightRecord from './Components/WeightRecord';
import Pictures from './Components/Pictures';
import AddAnimal from './Components/AddAnimal';
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
      case 'allComments':
        newState = "allComments";
        break;
      case 'basicSearch':
        newState = "basicSearch";
        break;
      case 'animalProfile':
        newState = "animalProfile";
        break;
      case 'healthRecord':
        newState = "healthRecord";
        break;
      case 'comments':
        newState = "comments";
        break;
      case 'pictures':
        newState = "pictures";
        break;
      case 'weightRecord':
        newState = "weightRecord";
        break;
      case 'addAnimal':
        newState = "addAnimal";
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

  const animalSelectionReducer = (state, action) => {
    let dict = {};

    if (action.command === "add") {
      dict = action.animal;
    }

    if (action.command === "delete") {
      dict = {};
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
    animalSelectionDispatch({
      command: "delete",
    });
  }

  const [currentView, pageDispatch] = useReducer(pageReducer, "login")
  const [user, userDispatch] = useReducer(userReducer, {})
  const [animalSelection, animalSelectionDispatch] = useReducer(animalSelectionReducer, {})

  return (
    <>
      <header>
        <div className="App-header">
          <div className="columns is-full">
            <div className="column has-text-centered" css={css`margin: auto;`}>
              {(currentView !== "login") ? (
                <button
                  onClick={logoutHandler}
                  className="button is-small is-gray">
                  Logout
                </button>
              ) : null}
            </div>
            <div className="column has-text-centered is-half"
              css={css`margin: auto;`}>
              <header>U of C Veterinary Medicine Management System</header>
            </div>
            <div className="column has-text-centered"
              css={css`margin: auto;`}>
              {(currentView !== "login" && user.name !== "guest" && user.name.length > 0) ? (
                <title className="column has-text-center">
                  {user.accountType} - {user.name}</title>
              ) : null}
            </div>
          </div>
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
            <RequestsMenu userInfo={user}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "approvals") ? (
            <RequestApprovals
              user={user}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "admin") ? (
            <Admin
              user={user}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "allComments") ? (
            <AdminComments
              user={user}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "basicSearch") ? (
            <BasicSearch
              user={user}
              pageDispatch={pageDispatch}
              animalSelectionDispatch={animalSelectionDispatch} />
          ) : null}
          {(currentView === "animalProfile") ? (
            <AnimalProfile
              user={user}
              animal={animalSelection}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "healthRecord") ? (
            <HealthRecord
              user={user}
              animal={animalSelection}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "comments") ? (
            <AnimalComments
              user={user}
              animal={animalSelection}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "weightRecord") ? (
            <WeightRecord
              user={user}
              animal={animalSelection}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "pictures") ? (
            <Pictures
              user={user}
              animal={animalSelection}
              pageDispatch={pageDispatch} />
          ) : null}
          {(currentView === "addAnimal") ? (
            <AddAnimal
              user={user}
              pageDispatch={pageDispatch}
              animalSelectionDispatch={animalSelectionDispatch} />
          ) : null}
        </div>
      </body>

    </>
  );
}

export default App;
