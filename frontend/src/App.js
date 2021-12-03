import './App.css';
import 'bulma/css/bulma.css'
import Animals from './Components/Animals';
import Login from './Components/Login'
import React, { useReducer } from 'react';
import { css } from "@emotion/react";

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

  const [currentView, pageDispatch] = useReducer(pageReducer, "login")

  return (
    <>

      <div className="App-header">
        <header>Vet Management System</header>
        {currentView === "login" ? (
              <Login
                dispatch={pageDispatch} />
            ) : null}
        {currentView === "animal" ? (
              <Animals
                dispatch={pageDispatch} />
            ) : null}
      </div>
    </>
  );
}

export default App;
