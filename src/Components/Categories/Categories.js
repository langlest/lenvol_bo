import React, { useState, useEffect } from "react";
import ListeCategories from "./ListeCategories";
import "../../Styles/Categorie.css";


export default function Categories() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cats, setCats] = useState([]);
    

    const getCats = ()=>{
        fetch("categories.json")
            .then(function(response){
                return response.json();
            })
            .then(function(listeCat) {
                setCats(listeCat);
            });
    };

    useEffect(()=>{
        getCats();
    },[]);

    const newCategorie = () => {};

    return (
        <div className="containerCustom">
            <div className="row ">
                <div className="col-10 ">
                    <button className="boutonAjout" >+ Ajout d'une nouvelle categorie</button>
                </div>
                <div className="intituleBtn col-1 d-flex justify-content-center text-center ">
                    <span>Modifier</span>
                </div>
                <div className="intituleBtn col-1 d-flex justify-content-center text-center ">
                    <span>Supprimer</span>
                </div>
            </div>
            <div>
                <ListeCategories cats={cats}/>
            </div>
        </div>
    );
}