import React, { useState } from "react";
import { Navbar, Nav} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import Login from './Login/Login'; 
import useToken from '../App/useToken';
import Accueil from "./Accueil";
import Ressources from "./Ressources/Ressources";
import Categories from "./Categories/Categories";
import {MENU1_PATH, MENU1_NAME, MENU2_PATH, MENU2_NAME} from "../App/constantes";

export default function App() {
  const { token, setToken } = useToken();
  const [ MenuSelectAccueil, setMenu ] = useState();
  const [niv1, setNiv1] = useState(window.location.pathname);

  /// Mise en commentaire pour ne pas retomber sur la page de connexion à chaque mise à jour
  /*if(!token && MenuSelectAccueil==undefined) {
    return <Login setToken={setToken} />
  }

  if(token && MenuSelectAccueil==undefined){
    return <Accueil userSelect={setMenu}/>
  }*/

  const RedirectionAccueil = () => {
    switch (MenuSelectAccueil) {
      case "cat" :
        <Redirect to={MENU1_PATH} push />
        break;
      case "res" :
        <Redirect to={MENU2_PATH} push />
        break;
      default :
        break;
    }
  };


  return (
    <Router>
      <Navbar style={{backgroundColor:"rgb(36,155,215)"}}  className="p-0 m-0">
        
          <Navbar.Brand className="p-0 m-2" >
            <div className="logoMenu" />
          </Navbar.Brand>
          <Nav className="me-auto justify-content-center text-center">
            <Nav.Link 
              style={niv1 === MENU1_PATH ? styles.navItemActived : styles.navItem}
              as={Link} 
              to={MENU1_PATH} 
              onClick={() => setNiv1(MENU1_PATH)}
              >{MENU1_NAME}
            </Nav.Link>
            <Nav.Link 
              style={niv1 === MENU2_PATH ? styles.navItemActived : styles.navItem}
              as={Link} 
              to={MENU2_PATH} 
              onClick={() => setNiv1(MENU2_PATH)}
              >{MENU2_NAME}
              </Nav.Link>
          </Nav>
      </Navbar>
      
      <Switch>
          <Route exact path={MENU1_PATH} >
            <Categories />
          </Route>
          <Route path={MENU2_PATH}>
              <Ressources />
          </Route>
      </Switch>
    </Router>
  );
}

const styles = {};

styles.navItem = {
  /*fontSize:"1.3em",*/
  paddingTop:"4rem",
  /*paddingBottom:"0",
  margin:"0", */
  color:"rgb(174, 224, 250)", 
};

styles.navItemActived = {
  ...styles.navItem,
  borderBottom:"2px solid white",
  color:"white"
};

