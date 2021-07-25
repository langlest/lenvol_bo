import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Container, Col, Row,Navbar, Nav, Image} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import logo from '../Images/Logo-Blanc-CMJN.png';
import '../Styles/App.css';
import Login from './Login/Login';
import useToken from '../App/useToken';
import Accueil from "./Accueil";
import Ressources from "./Ressources/Ressources";
import Categories from "./Categories/Categories";

export default function App() {
  const { token, setToken } = useToken();
  const [ MenuSelectAccueil, setMenu ] = useState();
  const menu1 = {path:'/ressources',name:'Gestion des ressources'};
  const menu2 = {path:'/categories',name:'Gestion des catégories'};
  const [niv1, setNiv1] = useState(window.location.pathname);

  /// Mise en commentaire pour ne pas retomber sur la page de connexion à chaque mise à jour
  /*if(!token && MenuSelectAccueil==undefined) {
    return <Login setToken={setToken} />
  }

  if(token && MenuSelectAccueil==undefined){
    return <Accueil userSelect={setMenu}/>
  } */

  const RedirectionAccueil = () => {
    switch (MenuSelectAccueil) {
      case "res" :
        <Redirect to={menu1.path} push />
        break;
      case "cat" :
        <Redirect to={menu2.path} push />
        break;
      default :
        break;
    }
  };


  return (
    <Router>
      <Navbar style={{backgroundColor:"rgb(36,155,215)"}}  className="p-0 m-0">
        <Container className="m-0 p-0 ">
          <Navbar.Brand className="p-0 m-0" >
            <div className="logoMenu" />
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link 
              style={niv1 === menu1.path ? styles.navItemActived : styles.navItem}
              as={Link} 
              to={menu1.path} 
              onClick={() => setNiv1(menu1.path)}
              >{menu1.name}</Nav.Link>
            <Nav.Link 
              style={niv1 === menu2.path ? styles.navItemActived : styles.navItem}
              as={Link} 
              to={menu2.path} 
              onClick={() => setNiv1(menu2.path)}
              >{menu2.name}
              </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Switch>
          <Route exact path={menu1.path} >
            <Ressources />
          </Route>
          <Route path={menu2.path}>
            <Categories />
          </Route>
      </Switch>
    </Router>
  );
}

const styles = {};

styles.navItem = {
  fontSize:"1.3em",
  paddingTop:"5rem",
  paddingBottom:"0",
  margin:"0",
  color:"rgb(174, 224, 250)",  
};

styles.navItemActived = {
  ...styles.navItem,
  borderBottom:"2px solid white",
  color:"white"
};

