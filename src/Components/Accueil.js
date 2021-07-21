import React from "react";
import '../Styles/Accueil.css';
import useToken from "../App/useToken";

export default function Accueil({userSelect}){

    const selectMenu = (menu) =>{
        userSelect(menu); 
    };

    return(
        <div style={{height: "100vh", backgroundColor:"rgb(36,155,215)"}}>
          <div className="logo" />
          <div className="WhiteCircle" />
          <div className="YellowCircle " />
          <div className="form">
              <div style={{textAlign:"center"}} >
                <div style={{color:'white',fontWeight: 'lighter'}}>Bienvenue dans l’administration l’Envol</div>
                <div>
                  <button 
                  className='button'
                  onClick = {() => selectMenu('res')}
                  >Gestion des ressources</button> 
                </div>
                <div>
                  <button 
                  className='button'
                  onClick = {() => selectMenu('cat')}
                  >Gestion des catégories</button> 
                </div>
              </div>
              <div className="footer" >
              <div style={{width:"480px"}}>Association reconnue d’utilité publique habilitée à recevoir dons, legs et donations</div>
              </div>
          </div>
        </div>
    );;
}