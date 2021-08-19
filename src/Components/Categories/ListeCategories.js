import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {AGE1, AGE2, AGE3, AGE4} from "../../App/constantes";
import { DeleteCategorie, ListeCategoriesServer } from "../../api/APIUtils";
import { Collapse } from "react-collapse";


export default function ListeCategories(props){
    const [activeIndexCat, setActiveIndexCat] = useState(null);
    const [catDelete, setCatDelete] = useState({nom:"",id:null});
    const [ModalEdit, setModalEdit] = useState(false);
    const [ModalDelete, setModalDelete] = useState(false);
    const [catEdit, setCatEdit] = useState({nom:"",id:null,ages:[]});

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
        console.log("Suppression confirmée de la catégorie id:"+id);
        /// suppression de la liste
        props.cats.forEach((item,i) =>{
            if(item.id === id){
                props.cats.splice(i,1)
                setCatDelete(item);
            }
        });
        /// Suppression en base
        DeleteCategorie(id);
        handleClose();
    };   
    const editCatDemand = (id) => {
        props.cats.forEach((item) => {
            if(item.id === id){
                console.log(item.ages);
                let catForm = {
                    nom:item.nom,
                    age1:item.ages.some(a => a.age === AGE1),
                    age2:item.ages.some(a => a.age === AGE2),
                    age3:item.ages.some(a => a.age === AGE3),
                    age4:item.ages.some(a => a.age === AGE4),
                };
                setCatEdit(catForm);
            }
        });
        setModalEdit(true);
    };

    const validEditCat = () => {
        console.log("Enregistrement des modifications de la catégorie :",catEdit);
        setModalEdit(false);
    };  
    
    
    
    return (
    <>
        {props.cats.map((categorie,indexCat) => (
            <div id={indexCat} className="row ligneCat">
                <div className="col-10 libelleCat">
                    <div onClick={event => setActiveIndexCat(
                            activeIndexCat === indexCat ? null : indexCat
                        )}><span>{categorie.nom}</span>
                    </div>
                    <Collapse isOpened={activeIndexCat === indexCat}>
                        <div className={{ show: activeIndexCat === indexCat, hide: activeIndexCat !== indexCat }}>
                            <ul className="ElementsCat">
                                    {categorie.ages.map((CatAge,indexAge)=> 
                                        <li key={indexAge}>{CatAge.age}</li>
                                    )}
                                </ul>
                            
                        </div>
                    </Collapse>
                </div>
                <div className="col-2 d-flex  text-center">
                    <div style={{cursor: "pointer", paddingRight:"20px"}}  onClick={() => editCatDemand(categorie.id)}>
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    { categorie.supprimable &&
                    <div style={{cursor: "pointer"}}  onClick={() => deleteConfirm(categorie.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                    }   
                </div>
            </div>
        ))
        }


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
                defaultValue={catEdit.nom}
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
                        checked={catEdit.age3}
                        onChange={() => setCatEdit({
                            ...catEdit,
                            age3:!catEdit.age3
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
                        checked={catEdit.age4}
                        onChange={() => setCatEdit({
                            ...catEdit,
                            age4:!catEdit.age4
                        })} />
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

