import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import ListeCategories from "./ListeCategories";
import { SaveNewCat } from "../../api/APIUtils";
import "../../Styles/Categorie.css";


export default function Categories() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cats, setCats] = useState([]);
    const [ModalCreate, setModalCreate] = useState(false);
    const [catCreate, setCatCreate] = useState({nom:"",id:null,ages:[]});
    

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


    const newCategorie = (newItem) => {
        let agesNewItemBdd = [];
        if(newItem.age1) agesNewItemBdd.push("4-10 ans");
        if(newItem.age2) agesNewItemBdd.push("11-15 ans");
        if(newItem.age3) agesNewItemBdd.push("15-25 ans");
        if(newItem.age4) agesNewItemBdd.push("Parents / Aidants");
        console.log(agesNewItemBdd)
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
                <div className="row ">
                    <div className="col-10 ">
                        <button 
                            className="boutonAjout" 
                            onClick = {() => setModalCreate(true)}
                            >+ Ajout d'une nouvelle categorie</button>
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
                            4-10 ans :
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
                            11-15 ans :
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
                            15-25 ans :
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
                        Parents / Aidants
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