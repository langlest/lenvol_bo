import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import CategorieItem from "./CategorieItem";
import { SaveNewCat } from "../../api/APIUtils";
import {AGE1, AGE2, AGE3, AGE4} from "../../App/constantes";
import { add }  from "../../reducers/categoriesReducer";
import { useSelector, useDispatch } from 'react-redux';
import { DeleteCategorie } from "../../api/APIUtils";
import "../../Styles/Categorie.css";


export default function Categories() {
    const dispatch = useDispatch();
    const modelCat = {nom:"",id:null,ages:[]};
    const [ModalCreate, setModalCreate] = useState(false);
    const [catCreate, setCatCreate] = useState(modelCat);
    
    // Chargement des catégories
    let cats = useSelector(state => state.categories);

    /////// NEw categorie

    const newCategorie = () => {
        let agesNewItemBdd = [];
        if(catCreate.age1) agesNewItemBdd.push({age:AGE1});
        if(catCreate.age2) agesNewItemBdd.push({age:AGE2});
        if(catCreate.age3) agesNewItemBdd.push({age:AGE3});
        if(catCreate.age4) agesNewItemBdd.push({age:AGE4});

        //// New unused Id
        const idsSort = cats.map((cat) => cat.id).sort();
        const highId:Number = Number(idsSort[idsSort.length - 1]);
        const newId:Number = highId + 1;

        /// new cat au format bdd
        let catBdd = {
            id:newId,
            nom:catCreate.nom,
            ages:agesNewItemBdd,
            supprimable:true
        };
        
        //Méthode d'envoi bdd et maj redux
        SaveNewCat(catBdd)
            .then(dispatch(add(catBdd)))
            .then(setModalCreate(false))
        
        if(ModalCreate) setCatCreate(modelCat);
        
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
                    {cats.map((cat,index) => (
                        <CategorieItem cats={cats} categorie={cat} index={index}/>
                    ))}
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
                <button type="button" class="btn btn-primary" onClick={() => newCategorie()}>Enregistrer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}