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
    const editCat = (cat) => {
        console.log("Modifications de la catégorie id:"+cat)
        setCatEdit({
            nom:catEdit.nom,
            age1:!catEdit.age1,
            age2:catEdit.age2,
            age3:catEdit.age3,
            age4:catEdit.age4
        });
    }; 
    const editNameCat = (value) => {
        console.log("value du nom :",value);
        setCatEdit({
            nom:value,
            age1:catEdit.age1,
            age2:catEdit.age2,
            age3:catEdit.age3,
            age4:catEdit.age4
        });
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


        <Modal show={ModalDelete} onHide={handleClose}>
            <Modal.Header style={{fontWeight:"bold"}}>Demande de suppression de catégorie</Modal.Header>
            <Modal.Body>Confirmez la suppression de '{catDelete.nom}'</Modal.Body>
            <Modal.Footer>
            <div style={{cursor: "pointer", fontSize:".9em"}} onClick={handleClose}>
                Annuler
            </div>
            <div style={{cursor: "pointer", fontSize:".9em"}} onClick={() => deleteCat(catDelete.id)}>
                Supprimer
            </div>
            </Modal.Footer>
        </Modal>


        <Modal show={ModalEdit} onHide={() => setModalEdit(false)}>
            <Modal.Header style={{fontWeight:"bold"}}>Modification de catégorie</Modal.Header>
            <Modal.Body>
                <input 
                name="Nom"
                type="text" 
                defaultValue={catEdit.nom}
                onChange={(e) => editNameCat(e.target.value)}
                />
                <label>
                    4-10 ans :
                    <input
                        name=""
                        type="checkbox"
                        checked={catEdit.age1}
                        onChange={() => setCatEdit({
                            nom:catEdit.nom,
                            age1:!catEdit.age1,
                            age2:catEdit.age2,
                            age3:catEdit.age3,
                            age4:catEdit.age4
                        })}
                    />
                </label>
                <label>
                    11-15 ans :
                    <input
                        name=""
                        type="checkbox"
                        checked={catEdit.age2}
                        onChange={() => setCatEdit({
                            nom:catEdit.nom,
                            age1:catEdit.age1,
                            age2:!catEdit.age2,
                            age3:catEdit.age3,
                            age4:catEdit.age4
                        })} />
                </label>
                <label>
                    15-25 ans :
                    <input
                        name=""
                        type="checkbox"
                        checked={catEdit.age3}
                        onChange={() => setCatEdit({
                            nom:catEdit.nom,
                            age1:catEdit.age1,
                            age2:catEdit.age2,
                            age3:!catEdit.age3,
                            age4:catEdit.age4
                        })} />
                </label>
                <label>
                    Parents / Aidants :
                    <input
                        name=""
                        type="checkbox"
                        checked={catEdit.age4}
                        onChange={() => setCatEdit({
                            nom:catEdit.nom,
                            age1:catEdit.age1,
                            age2:catEdit.age2,
                            age3:catEdit.age3,
                            age4:!catEdit.age4
                        })} />
                </label>
            </Modal.Body>
            <Modal.Footer>
            <div style={{cursor: "pointer", fontSize:".9em"}} onClick={() => setModalEdit(false)}>
                Annuler
            </div>
            <div style={{cursor: "pointer", fontSize:".9em"}} onClick={validEditCat}>
                Modifier
            </div>
            </Modal.Footer>
        </Modal>
    </>
    )
}

