import React, { useState, useEffect } from "react";
import logo from '../Images/logo.svg';
import '../Styles/App.css';
import Login from './Login/Login';
import useToken from '../App/useToken';
import Categories from './Categories/Categories';
import Ressources from './Ressources/Ressources';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Administration 
        </p>
      </header>
    </div>
  );
}

export default App;
