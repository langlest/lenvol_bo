import React, { useState } from "react";
import 'lion-player/dist/lion-skin.min.css';
import {Pagination} from "react-bootstrap";
import {PAGINATION} from "../../App/config";
import "../../Styles/Ressources.css";
import RessourceItem from "./RessourceItem";
import { Ressource } from "./../../model/Ressource"


export default function ListeRessources(props:any){
    const ressources:Ressource[] = props.ressources;
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
                   { return (
                <RessourceItem index={index} ressource={ressource} ressources={ressources} categories={props.categories}/>
                    )}
            )
        }
        <div >
        <Pagination>{items}</Pagination>
        </div>
        </>      
    )
}