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
import Accueil from "./Accueil";

function App() {
  const { token, setToken } = useToken();
  const [ menuSelect, setMenu ] = useState();


  if(!token && menuSelect==undefined) {
    return <Login setToken={setToken} />
  }

  console.log("[app] var menuSelect "+menuSelect);
  if(token && menuSelect==undefined){
    return <Accueil userSelect={setMenu}/>
  }


  return (
    <div>
      <h1>Menu {menuSelect}</h1>
    </div>
  );
}

export default App;
