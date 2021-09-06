import React from "react";
import "../../reducers/categoriesReducer";
import { useDispatch } from 'react-redux';
import {Nav} from "react-bootstrap";
import RessourcesTable from "./RessourcesTable";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

import "../../Styles/Categorie.css";
import "../../Styles/Ressources.css";


export default function Ressources(){
    const dispatch = useDispatch();
    
    return(
        <>

        {/* Section liste ressources*/}
        <div className="containerCustom">
            <div>
                <Nav.Link 
                    style={{fontSize:".8em",
                        backgroundColor:"rgb(141, 141, 141)",
                        border:"0px",
                        borderRadius: "5px",
                        margin:"0",
                        padding:"2px 10px",
                        width:"auto",
                        color:"white",
                        display: "initial"}}
                    // onClick = {() => setModalCreate(true)}
                    as={Link}
                    to={"/ressource/Add"}
                    >+ Ajout d'une nouvelle ressource
                </Nav.Link>
            </div>
            <div>
                <RessourcesTable />
            </div>
        </div>
        </>
    );
}