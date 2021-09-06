import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import { LionPlayer } from 'lion-player'; //https://reactjsexample.com/open-source-react-video-player-powered-by-videojs/
import 'lion-player/dist/lion-skin.min.css';
import { Collapse } from "react-collapse";
import Modal from 'react-bootstrap/Modal';
import { Row, Col, Form } from "react-bootstrap";
import { DeleteRessource, EditRessource } from "../../api/APIUtils";
import { edit, del }  from "../../reducers/ressourcesReducer";
import { useDispatch } from 'react-redux';
import { Ressource, Lien } from "../../model/Ressource";
import { Categorie } from "../../model/Categorie";

export default function RessourceItem(props:any){
    const ressources = props.ressources;
    const ressource = props.ressource;
    const index = props.index;
    const dispatch = useDispatch();
    const [activeIndexRes, setActiveIndexRes] = useState(null);
    const ressourceModel:Ressource = new Ressource(0, new Categorie(0,"",[],false), "", "", [], [], true);

    /////////// DELETE
    const [ModalDelete, setModalDelete] = useState(false);
    const [resDelete, setResDelete] = useState<Ressource>(ressourceModel);
    const handleClose = () => setModalDelete(false);
    const deleteConfirm = (id:number) => {
        ressources.forEach((item:Ressource) =>{
            if(item.id === id){
                setResDelete(item);
            }
        });
        setModalDelete(true);
    };
    const deleteRes = (id:number | null) => {
        console.log("Suppression confirmée de la catégorie id:"+id);
        /// Envoi en base ET suppression de la liste Redux
        DeleteRessource(Number(id))
            .then(() => dispatch(del(id)));
        
        handleClose();
    };
    
    ////////////// EDIT
    const [resEdit, setResEdit] = useState<Ressource>(ressourceModel);
    const [ModalEdit, setModalEdit] = useState(false);
    const [descriptifInput, setDescriptifInput] = useState(false);
    // ref de communication entre inputs
    let lienInput:any = React.createRef();
    const resetLienInput = () => {
        lienInput.current.value = "";
    };
    let newLien:string = "";

    const editResDemand = (id:number) => {
        ressources.forEach((item:Ressource) => {
            if(item.id === id){
                let resForm:any = {
                    id:item.id,
                    nom:item.nom,
                    categorie:item.categorie,
                    video:item.video,
                    documents:item.documents,
                    liens:item.liens
                };
                setResEdit(resForm);
            }
        });
        setModalEdit(true);
    };
    const validEditRes = () => {
        // Envoi en base ET modeif de la liste Redux
        EditRessource(resEdit)
            .then(() => dispatch(edit(resEdit)));
        
        newLien="";
        setModalEdit(false);
    };  

    
    ////////// Gestion video
    const [modalVideo, setModalVideo] = useState(false);
    const handleVideoClose = () => setModalVideo(false);
    const handleVideoOpen = (video:string) => {
        setModalVideo(true);
        src_video[0].src = video;
        console.log(src_video);
    };
    let src_video = [
        {
            src: '',
            type: ''
        },
        {
            src: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/m3u8s/105560.m3u8',
            type: ''
        }
      ];

    return (
        <>
        <div className="row ligneRes" >
            <div className="col-10 libelleRes">
                <div onClick={event => {
                    setActiveIndexRes(index === activeIndexRes ? null : index)
                    }}
                    style={{cursor:"pointer"}}>{ressource.nom}
                </div>
                <Collapse isOpened={activeIndexRes === index}>
                <div >
                    <ul className="ElementsRes">
                        <li className="d-flex">
                            <div className="widthProp">Categorie</div>
                            <div>: {ressource.categorie}</div>
                        </li>
                        <>{ressource.video && 
                        
                        <li className="d-flex">
                            <div className="widthProp">Vidéo</div>
                            <div>: {ressource.video}</div>
                            <div><FontAwesomeIcon style={{marginLeft:"30px",marginTop:"3px",cursor:"pointer"}} icon={faPlay} onClick={() => handleVideoOpen(ressource.video)}/></div>
                        </li>}</>
                        <>{ressource.documents && 
                            ressource.documents.map((doc:string,i:number)=>{
                            return(
                            <li className="d-flex">
                                <div className="widthProp">Document {i+1}</div>
                                <div>: <a href={doc} target="_blank" >{doc}</a></div>
                            </li>
                            )
                        })}
                        </>
                            <>{ressource.liens && 
                                ressource.liens.map((lien:Lien,j:number) => {
                                return(
                                <li className="d-flex">
                                    <div className="widthProp">Lien {j+1}</div>
                                    <div>: <a href={lien.url} target="_blank">{lien.url}</a><br /> ({lien.descriptif})</div>
                                </li>)
                            })}
                            </>
                    </ul>
                </div>
            </Collapse>
            </div>
            <div className="col-2 d-flex text-center">
                <div style={{cursor: "pointer", paddingRight:"20px"}}  onClick={() => editResDemand(ressource.id)}>
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <div style={{cursor: "pointer"}}  onClick={() => deleteConfirm(ressource.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        </div>

        <Modal 
            show={modalVideo} 
            onHide={handleVideoClose} 
            size="lg">
            <Modal.Header ></Modal.Header>
            <Modal.Body><LionPlayer sources={src_video} /></Modal.Body>
        </Modal>

        <Modal 
            show={ModalDelete} 
            onHide={handleClose} 
            {...props}
            size="sm">
            <Modal.Header style={{fontWeight:"bold"}}>Suppression de catégorie</Modal.Header>
            <Modal.Body>Supprimer : '{resDelete.nom}' ?</Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={handleClose}>Annuler</button>
                <button type="button" className="btn btn-primary" onClick={() => deleteRes(resDelete.id)}>Supprimer</button>
            </Modal.Footer>
        </Modal>
    </>
    )
}