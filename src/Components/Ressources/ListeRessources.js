import React, { useState, useEffect } from "react";
import { LionPlayer } from 'lion-player'; //https://reactjsexample.com/open-source-react-video-player-powered-by-videojs/
import 'lion-player/dist/lion-skin.min.css';
import { Collapse } from "react-collapse";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import {Row, Col, Form, Pagination} from "react-bootstrap";
import { ListeRessourcesServer, DeleteRessource, SaveNewRes, EditRessource } from "../../api/APIUtils";
import {PAGINATION} from "../../App/config";
import "../../Styles/Ressources.css";
import RessourceItem from "./RessourceItem";


export default function ListeRessources(props){
    const ressources = props.ressources;
    //console.log("[listeRessource] ressources ",ressources);
    const [activeIndexRes, setActiveIndexRes] = useState(null);
    const [active,setActive] = useState(1);

    let nbPages = 0;
    let items = [];

    //const pagination = () => {

        if(ressources)
            nbPages = ressources.length / PAGINATION;
        for (let number = 1; number <= 3; number++) {
            items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => setActive(number)}>
                {number}
            </Pagination.Item>,
            );
        };

    //};
    

    return(
        <>
        {!ressources ? 
            <div className="row ligneRes">Loading ...</div>
            : ressources.map((ressource,index) => 
                   { console.log("[listeResssource] index : "+index)
            return (
            <RessourceItem index={index} ressource={ressource} ressources={ressources} categories={props.categories}/>
            )
            })
        }
        <div >
        <Pagination>{items}</Pagination>
        </div>
        </>      
    )
}