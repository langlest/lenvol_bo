import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { Collapse } from "react-collapse";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {AGE1, AGE2, AGE3, AGE4} from "../../App/constantes";
import { edit, del}  from "../../reducers/categoriesReducer";
import { useSelector, useDispatch } from 'react-redux';
import { EditCategorie, DeleteCategorie } from "../../api/APIUtils";

export default function CategorieItem (props){
    const dispatch = useDispatch();
    const categorie = props.categorie;
    const categories = props.cats;
    const index = props.index;

    const modelCat = {nom:"",id:null,ages:[]}

    const [collapseCat, setCollapseCat] = useState(false);
    const [catDelete, setCatDelete] = useState({nom:"",id:null});
    const [ModalEdit, setModalEdit] = useState(false);
    const [ModalDelete, setModalDelete] = useState(false);
    const [catEdit, setCatEdit] = useState(modelCat);

    const handleClose = () => setModalDelete(false);

    const deleteConfirm = (id) => {
        props.cats.forEach(item =>{
            if(item.id === id){
                setCatDelete(item);
            }
        });
        setModalDelete(true);
    };
    const deleteCat = (id) => {       
        /// Suppression en base et Redux
        DeleteCategorie(id)
            .then(dispatch(del(id)))
            .then(handleClose());
    };   
    
    const editDemand = () => {
        let catForm = {
            id:categorie.id,
            nom:categorie.nom,
            age1:categorie.ages.some(a => a.age === AGE1),
            age2:categorie.ages.some(a => a.age === AGE2),
            age3:categorie.ages.some(a => a.age === AGE3),
            age4:categorie.ages.some(a => a.age === AGE4),
        };
        setCatEdit(catForm);
        setModalEdit(true);
    }
    const validEditCat = () => {
        const agesEdited = [];
        if(catEdit.age1) agesEdited.push({age:AGE1});
        if(catEdit.age2) agesEdited.push({age:AGE2});
        if(catEdit.age3) agesEdited.push({age:AGE3});
        if(catEdit.age4) agesEdited.push({age:AGE4});
        const categorieEdited = {
            id:catEdit.id,
            nom:catEdit.nom,
            ages:agesEdited
        }
        /// Mise à jour de la modification en Bdd puis Redux
        EditCategorie(categorieEdited)
            .then(dispatch(edit(categorieEdited)))
            .then(setModalEdit(false))
            
        if(ModalEdit)
            setCatEdit(modelCat);
    };  

    return (
        <>
        <div className="row ligneCat">
            <div className="col-10 libelleCat">
                <div onClick={event => {
                    setCollapseCat(!collapseCat);
                    }}><span>{categorie.nom}</span>
                </div>
                <Collapse isOpened={collapseCat}>
                    <div >
                        <ul className="ElementsCat">
                                {categorie.ages.map((CatAge,indexAge)=> 
                                    <li key={indexAge}>{CatAge.age}</li>
                                )}
                            </ul>
                        
                    </div>
                </Collapse>
            </div>
            <div className="col-2 d-flex  text-center">
                <div style={{cursor: "pointer", paddingRight:"20px"}}  onClick={() => editDemand()}>
                    <FontAwesomeIcon icon={faPen} />
                </div>
                { categorie.supprimable &&
                <div style={{cursor: "pointer"}}  onClick={() => deleteConfirm(categorie.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
                }   
            </div>
        </div>
        
        


        <Modal 
            show={ModalDelete} 
            onHide={handleClose} 
            {...props}
            size="sm">
            <Modal.Header style={{fontWeight:"bold"}}>Suppression de catégorie</Modal.Header>
            <Modal.Body>Supprimer : '{catDelete.nom}' ?</Modal.Body>
            <Modal.Footer>
                <button type="button" class="btn btn-secondary" data-dismiss="modal"  onClick={handleClose}>Annuler</button>
                <button type="button" class="btn btn-primary" onClick={() => deleteCat(catDelete.id)}>Supprimer</button>
            </Modal.Footer>
        </Modal>


        <Modal 
            show={ModalEdit} 
            aria-labelledby="ModalEdit"
            onHide={() => setModalEdit(false)}>
            <Modal.Header 
                id="ModalEdit"
                style={{fontWeight:"bold"}}>
                Modification de catégorie</Modal.Header>
            <Modal.Body>
                <input 
                name="Nom"
                type="text" 
                style={{width:"100%"}}
                defaultValue={categorie.nom}
                onChange={(e) => setCatEdit({
                    ...catEdit,
                    nom:e.target.value
                })}
                />
                <div>
                    <input
                        name=""
                        type="checkbox"
                        className="checkBoxEditCat"
                        checked={catEdit.age1}
                        onChange={() => setCatEdit({
                            ...catEdit,
                            age1:!catEdit.age1
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
                        checked={catEdit.age2}
                        onChange={() => setCatEdit({
                            ...catEdit,
                            age2:!catEdit.age2
                        })}/>
                    <label>
                        {AGE2} :
                    </label>
                </div>
                <div>
                    <input
                        name=""
                        type="checkbox"
                        className="checkBoxEditCat"
                        checked={catEdit.age3}
                        onChange={() => setCatEdit({
                            ...catEdit,
                            age3:!catEdit.age3
                        })}/>
                    <label>
                        {AGE3} :
                    </label>
                </div>
                <div>
                    <input
                        name=""
                        type="checkbox"
                        className="checkBoxEditCat"
                        checked={catEdit.age4}
                        onChange={() => setCatEdit({
                            ...catEdit,
                            age4:!catEdit.age4
                        })}/>
                    <label style={{width:"150px"}}>
                        {AGE4}
                    </label>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={() => setModalEdit(false)}>Annuler</button>
            <button type="button" class="btn btn-primary" onClick={validEditCat}>Enregistrer</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}