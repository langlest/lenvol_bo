import React from "react";
import '../Styles/Accueil.css';
import {FOOTER_LOGIN, HEADER_LOGIN, MENU1_NAME, MENU2_NAME} from "../App/constantes";

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
                    <div style={{color:'white',fontWeight: 'lighter'}}>{HEADER_LOGIN}</div>
                    <div>
                        <button 
                        className='button'
                        onClick = {() => selectMenu('res')}
                        >{MENU2_NAME}</button> 
                    </div>
                    <div>
                        <button 
                        className='button'
                        onClick = {() => selectMenu('cat')}
                        >{MENU1_NAME}</button> 
                    </div>
                </div>
                <div className="footer" >
                    <div style={{width:"480px"}}>{FOOTER_LOGIN}</div>
                </div>
          </div>
        </div>
    );
}