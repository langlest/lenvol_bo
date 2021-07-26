import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from "react-collapse";
import classNames from "classnames";


export default function ListeCategories(props){
    const [activeIndexCat, setActiveIndexCat] = useState(null);
    const [show, setShow] = useState(false);
    const [ModalDelete, setModalDelete] = useState(false);
    const [catDelete, setCatDelete] = useState({nom:"",id:null});
    const [ModalEdit, setModalEdit] = useState(false);
    const [catEdit, setCatEdit] = useState({nom:"",id:null,ages:[]});

    const handleClose = () => setModalDelete(false);
    const handleShow = () => setModalDelete(true);

    const editStateElement = (id) => {};   
    const deleteConfirm = (id) => {
        props.cats.map((item) => {
            if(item.id === id){
                setCatDelete(item);
            }
        });
        setModalDelete(true);
    };
    const deleteCat = (id) => {
        console.log("Suppression confirmée de la catégorie id:"+id)
        handleClose();
    };   
    const editCatDemand = (id) => {
        props.cats.map((item) => {
            if(item.id === id){
                console.log(item.ages);
                let catForm = {
                    nom:item.nom,
                    age1:item.ages.some(a => a.age === "4-10 ans"),
                    age2:item.ages.some(a => a.age === "11-15 ans"),
                    age3:item.ages.some(a => a.age === "15-25 ans"),
                    age4:item.ages.some(a => a.age === "Parents / Aidants"),
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
            <div className="row ligneCat">
                <div className="col-10 libelleCat">
                    <div onClick={event => setActiveIndexCat(
                            activeIndexCat === indexCat ? null : indexCat
                        )}><span>{categorie.nom}</span>
                    </div>
                    <Collapse isOpened={activeIndexCat === indexCat}>
                        <div className={{ show: activeIndexCat === indexCat, hide: activeIndexCat !== indexCat }}>
                            <a><ul className="ElementsCat">
                                    {categorie.ages.map((CatAge,indexAge)=> 
                                        <li key={indexAge}>{CatAge.age}</li>
                                    )}
                                </ul>
                            </a>
                        </div>
                    </Collapse>
                </div>
                <div style={{cursor: "pointer"}} className="col-1 d-flex justify-content-center text-center" onClick={() => editCatDemand(categorie.id)}>
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <div style={{cursor: "pointer"}} className="col-1 d-flex justify-content-center text-center cursor-pointer" onClick={() => deleteConfirm(categorie.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
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
                        4-10 ans :
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
                        11-15 ans :
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
                        15-25 ans :
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
                    Parents / Aidants
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

