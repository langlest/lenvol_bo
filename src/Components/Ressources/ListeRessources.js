import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import "../../Styles/Ressources.css";


export default function ListeRessources(props){
    //////// Charges des ressources
    const [ressources, setRessources] = useState();
    useEffect(() => {
        fetch("ressources.json") // Fichier statique de prod placé dans public
            .then(resp => resp.json())
            .then(data => {
                setRessources(data);
                console.log("data : ",data)
                console.log("ressources : ",ressources);
                }
                );
    }, []);
        

    const editResDemand = (id) => {};
    const deleteConfirm = (id) => {};
    
return(
        <>
        {!ressources ? 
            <div className="row ligneRes">Loading ...</div>
            : ressources.map((ressource) => 
            {
            return (
            <div className="row ligneRes" >
                <div className="col-10 libelleRes">
                    {ressource.nom}
                </div> 
                <div className="col-2 d-flex text-center">
                    <div style={{cursor: "pointer", paddingRight:"20px"}}  onClick={() => editResDemand(ressource.id)}>
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    <div style={{cursor: "pointer"}}  onClick={() => deleteConfirm(ressource.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                </div>
            </div>
            )
            })
        }
        </>      
    )
}