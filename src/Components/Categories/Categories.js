import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ListeCategories from "./ListeCategories";
import { SaveNewCat } from "../../api/APIUtils";
import {AGE1, AGE2, AGE3, AGE4} from "../../App/constantes";
import "../../Styles/Categorie.css";


export default function Categories() {
    const [cats, setCats] = useState([]);
    const [ModalCreate, setModalCreate] = useState(false);
    const [catCreate, setCatCreate] = useState({nom:"",id:null,ages:[]});
    

    const getCats = ()=>{
        fetch("categories.json") // Fichier statique de prod placé dans public
            .then(function(response){
                return response.json();
            })
            .then(function(listeCat) {
                console.log(listeCat)
                setCats(listeCat);
            });
    };

    useEffect(()=>{
        getCats();
    },[]);


    const newCategorie = (newItem) => {
        let agesNewItemBdd = [];
        if(newItem.age1) agesNewItemBdd.push(AGE1);
        if(newItem.age2) agesNewItemBdd.push(AGE2);
        if(newItem.age3) agesNewItemBdd.push(AGE3);
        if(newItem.age4) agesNewItemBdd.push(AGE4);

        let catBdd = {
            nom:newItem.nom,
            ages:agesNewItemBdd
        };
        
        //Méthode d'envoi (à terminer)
        SaveNewCat(catBdd)
            .then(setModalCreate(false));
        
    };

    return (
        <>
            <div className="containerCustom">
                <div>
                    <button 
                        className="boutonAjout" 
                        onClick = {() => setModalCreate(true)}
                        >+ Ajout d'une nouvelle categorie</button>
                </div>
                <div>
                    <ListeCategories cats={cats}/>
                </div>
            </div>

            <Modal 
            show={ModalCreate} 
            aria-labelledby="ModalCreate"
            onHide={() => setModalCreate(false)}>
                <Modal.Header 
                    id="ModalCreate"
                    style={{fontWeight:"bold"}}>
                    Ajout d'une catégorie</Modal.Header>
                <Modal.Body>
                    <input 
                        name="Nom"
                        type="text" 
                        style={{width:"100%"}}
                        onChange={(e) => setCatCreate({
                            ...catCreate,
                            nom:e.target.value
                        })}
                    />
                    <div>
                        <input
                            name=""
                            type="checkbox"
                            className="checkBoxEditCat"
                            onChange={(e) => setCatCreate({
                                ...catCreate,
                                age1:e.target.value
                            })}
                        />
                        <label>
                            {AGE1} :
                        </label>
                    </div>
                    <div>
                        <input
                            name=""
                            type="checkbox"
                            className="checkBoxEditCat"
                            onChange={(e) => setCatCreate({
                                ...catCreate,
                                age2:e.target.value
                            })} />
                        <label>
                            {AGE2} :
                        </label>
                    </div>
                    <div>
                        <input
                            name=""
                            type="checkbox"
                            className="checkBoxEditCat"
                            onChange={(e) => setCatCreate({
                                ...catCreate,
                                age3:e.target.value
                            })} />
                        <label>
                            {AGE3} :
                        </label>
                    </div>
                    <div>
                        <input
                            name=""
                            type="checkbox"
                            className="checkBoxEditCat"
                            onChange={(e) => setCatCreate({
                                ...catCreate,
                                age4:e.target.value
                            })} />
                        <label style={{width:"150px"}}>
                            {AGE4}
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => setModalCreate(false)}>Annuler</button>
                <button type="button" class="btn btn-primary" onClick={() => newCategorie(catCreate)}>Enregistrer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}