import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from "react-collapse";
import classNames from "classnames";

export default function ListeCategories(props){
    const [activeIndexCat, setActiveIndexCat] = useState(null);
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [catDelete, setCatDelete] = useState(false);
    const [catIdDelete, setCatIdDelete] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const editStateElement = (id) => {};   
    const deleteConfirm = (id) => {
        props.cats.map((item) => {
            if(item.id === id){
                setCatDelete(item.nom);
                setCatIdDelete(item.id);
            }
        }
        )
        setShowModal(true);
    };
    const deleteCat = (id) => {
        console.log("Suppression confirmée de la catégorie id:"+id)
        handleClose()};   
    const editCat = (id) => {};

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
                <div style={{cursor: "pointer"}} className="col-1 d-flex justify-content-center text-center" onClick={() => editCat(categorie.id)}>
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <div style={{cursor: "pointer"}} className="col-1 d-flex justify-content-center text-center cursor-pointer" onClick={() => deleteConfirm(categorie.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        ))
        }
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header style={{fontWeight:"bold"}}>Demande de suppression de catégorie</Modal.Header>
            <Modal.Body>Confirmez la suppression de '{catDelete}'</Modal.Body>
            <Modal.Footer>
            <div style={{cursor: "pointer", fontSize:".9em"}} onClick={handleClose}>
                Annuler
            </div>
            <div style={{cursor: "pointer", fontSize:".9em"}} onClick={() => deleteCat(catIdDelete)}>
                Supprimer
            </div>
            </Modal.Footer>
        </Modal>
        </>
    )
}

