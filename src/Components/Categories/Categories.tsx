import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import CategorieItem from "./CategorieItem";
import { SaveNewCat } from "../../api/APIUtils";
import {AGE1, AGE2, AGE3, AGE4} from "../../App/constantes";
import { add }  from "../../reducers/categoriesReducer";
import { useSelector, useDispatch } from 'react-redux';

import "../../Styles/Categorie.css";
import { Categorie } from "../../model/Categorie";


export default function Categories() {
    const dispatch = useDispatch();
    const modelCat:Categorie = new Categorie(0,"",[],true);
    const [ModalCreate, setModalCreate] = useState(false);
    let catCreateModel : {
        id: number,
        nom: string,
        age1: boolean,
        age2: boolean,
        age3: boolean,
        age4: boolean
    }
    catCreateModel = {
        id : 0,
        nom : "",
        age1 : false,
        age2 : false,
        age3 : false,
        age4 : false
    };
    const [catCreate, setCatCreate] = useState<typeof catCreateModel>(catCreateModel);
    
    // Chargement des catégories
    let cats:Categorie[] = useSelector((state:any) => state.categories);

    /////// NEw categorie
    let ageModel : {age:string};
    const newCategorie = () => {
        let agesNewItemBdd:typeof ageModel[]= [];
        if(catCreate.age1) agesNewItemBdd.push({age:AGE1});
        if(catCreate.age2) agesNewItemBdd.push({age:AGE2});
        if(catCreate.age3) agesNewItemBdd.push({age:AGE3});
        if(catCreate.age4) agesNewItemBdd.push({age:AGE4});

        //// New unused Id
        const idsSort = cats.map((cat) => cat.id).sort();
        const highId:number = Number(idsSort[idsSort.length - 1]);
        const newId:number = highId + 1;

        /// new cat au format bdd
        let catBdd:Categorie = new Categorie(newId, catCreate.nom, agesNewItemBdd, true);
        
        //Méthode d'envoi bdd et maj redux
        SaveNewCat(catBdd)
            .then(() => dispatch(add(catBdd)))
            .then(() => setModalCreate(false))
        
        if(ModalCreate) setCatCreate(catCreateModel);
        
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
                                age1:Boolean(e.target.value)
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
                                age2:Boolean(e.target.value)
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
                                age3:Boolean(e.target.value)
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
                                age4:Boolean(e.target.value)
                            })} />
                        <label style={{width:"150px"}}>
                            {AGE4}
                        </label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalCreate(false)}>Annuler</button>
                <button type="button" className="btn btn-primary" onClick={() => newCategorie()}>Enregistrer</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}