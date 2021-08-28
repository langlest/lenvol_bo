import React, {useState} from "react";
import { LionPlayer } from 'lion-player'; //https://reactjsexample.com/open-source-react-video-player-powered-by-videojs/
import 'lion-player/dist/lion-skin.min.css';
import { Collapse } from "react-collapse";
import Modal from 'react-bootstrap/Modal';
import {Row, Col, Form, Pagination} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import { DeleteRessource, EditRessource } from "../../api/APIUtils";
import { Ressource, Lien } from "../../model/Ressource";
import { Categorie } from "../../model/Categorie";
import { edit, del }  from "../../reducers/ressourcesReducer";
import { useDispatch } from 'react-redux';

export default function RessourceItem(props:any){
    const ressources = props.ressources;
    const ressource = props.ressource;
    const index = props.index;
    const dispatch = useDispatch();
    const [activeIndexRes, setActiveIndexRes] = useState(null);
    const ressourceModel:Ressource = new Ressource(0,"","","",[],[]);

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

        <Modal 
            show={ModalEdit} 
            aria-labelledby="ModalEdit"
            onHide={() => setModalEdit(false)}>
            <Modal.Header 
                id="ModalEdit"
                style={{fontWeight:"bold"}}>
                Modification de catégorie
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex mb-2">
                    <label className="labelFieldModalRes" style={{paddingRight:"20px"}}>Catégorie</label>
                    <select 
                        style={{paddingLeft:"10px",width:"100%"}}
                        className="field_resCreate"
                        onChange={(e) =>  {
                            setResEdit({
                                ...resEdit,
                                categorie:e.target.value});
                        }}>
                        <option value=""></option>
                        {props.categories.map((categorie:Categorie,indexCat:number) => {
                            return(
                            <option 
                                value={categorie.nom}
                                selected={categorie.nom === resEdit.categorie}
                                >{categorie.nom}
                            </option>
                            )}
                        )}
                    </select>
                </div>
                <div className="d-flex mb-2">
                    <label className="labelFieldModalRes w-25">Nom </label>
                    <input 
                        name="nom"
                        type="text" 
                        placeholder="Titre de la ressource"
                        className="field_resCreate"
                        defaultValue={resEdit.nom}
                        onChange={(e) => setResEdit({
                            ...resEdit,
                            nom:e.target.value
                        })}
                    />
                </div>
                {resEdit.video.length === 0 &&
                    <div className="d-flex">
                        <label className="labelFieldModalRes w-25">Vidéo </label>
                            <Form.Group 
                                controlId="formFileSm" 
                                className="mb-3" 
                                style={{width:"100%"}}>
                            <Form.Control 
                                type="file" 
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                    const fileName = e.target.files?.length ? e.target.files[0].name : "";
                                    setResEdit({
                                        ...resEdit,
                                        video:fileName})
                                    }
                                }/>
                                
                            </Form.Group>
                    </div>
                }
                {resEdit.video.length > 0 &&
                    <Row className="d-flex mb-3">
                        <Col className="labelFieldModalRes col-2" >Vidéo </Col>
                        <Col className="d-flex col-8" >
                            <span style={{fontSize:".8em", paddingTop:"9px",marginLeft:"30px"}}>{resEdit.video} </span>
                        </Col>
                        <Col className="col-1" style={{marginLeft:"30px",paddingTop:"9px",fontSize:".9em",cursor: "pointer"}}  onClick={()=> {
                            setResEdit({
                                ...resEdit,
                                video:""});
                            }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Col>
                    </Row>
                }
                <div className="d-flex">
                    <label className="labelFieldModalRes w-25">Documents </label>
                        <Form.Group controlId="formFileSm" className="mb-3 " style={{width:"100%"}}>
                            <Form.Control 
                            type="file"  
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                let ar:string[] = resEdit.documents;
                                const newdocLink = e.target.value.split('\\');
                                const docname = newdocLink[newdocLink.length-1];
                                ar.push(docname)
                                setResEdit({
                                    ...resEdit,
                                    documents:ar});
                                e.target.value = "";}}/>
                        </Form.Group>
                </div>
                {resEdit.documents.length > 0 &&
                    resEdit.documents.map((document,index) => 
                        <Row className="d-flex mb-3">
                            <Col className=""></Col>
                            <Col className="d-flex" md={8} xs={8} lg={8}>
                                <div style={{width:"25px", backgroundColor:"#478"}}></div>
                                <span style={{fontSize:".8em", paddingTop:"3px",marginLeft:"10px"}}>{document} </span>
                            </Col>
                            <Col md={1} xs={1} lg={1} className="" style={{fontSize:".9em",cursor: "pointer"}}  onClick={()=> {
                                const ar = resEdit.documents;
                                ar.splice(index,1);
                                setResEdit({
                                    ...resEdit,
                                    documents:ar});
                                }}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Col>
                        </Row>
                    )
                }
                <div className="d-flex mb-3">
                    <label className="labelFieldModalRes justify-content-start"
                    style={{width:"91px"}}>Liens </label>
                    <input 
                        name="lien"
                        type="text" 
                        ref={lienInput}
                        disabled={descriptifInput}
                        placeholder="Lien url"
                        onChange={(e) => {
                            newLien = e.target.value;
                        }}
                        className="field_resCreate "
                        style={{width:"305px"}}
                    />
                    {!descriptifInput &&
                    <div className="btnTextModalRes" 
                        style={{cursor:"pointer",marginLeft:"6px"}}
                        onClick={() => {
                            const ar = resEdit.liens;
                            ar.push({url:newLien,descriptif:""})
                            setResEdit({
                                ...resEdit,
                                liens:ar
                            });
                            setDescriptifInput(true)
                        }}
                        >Ajouter
                    </div>
                    }
                </div>
                {descriptifInput &&
                    <div className="d-flex mb-2">
                        <label className="labelFieldModalRes w-25 justify-content-start">Descriptif </label>
                        <input 
                            name="descriptif"
                            type="text" 
                            placeholder="Descriptif du lien url"
                            className="field_resCreate"
                            style={{width:"380px"}}
                            onChange={(e) => {
                                newLien = e.target.value
                            }}
                        />
                        <div className="btnTextModalRes" 
                            style={{cursor:"pointer",marginLeft:"6px"}}
                            onClick={(e) => {
                                const ar = resEdit.liens;
                                let lastLink = ar[ar.length-1];
                                lastLink.descriptif = newLien;
                                setResEdit({
                                    ...resEdit,
                                    liens:ar
                                });
                                newLien = "";
                                setDescriptifInput(false);
                                resetLienInput();
                            }}
                            >Ajouter
                        </div>
                    </div>
                }
                {resEdit.liens.length > 0 &&
                    resEdit.liens.map((lien,index) => 
                        <Row className="d-flex mb-2">
                            <Col className="w-25"></Col>
                            <Col md={8} xs={8} lg={8}>
                                <a href={lien.url}>{lien.url}</a>  <br />
                                {lien.descriptif &&
                                    <div>{lien.descriptif}</div>
                                }
                                
                            </Col>
                            <Col md={1} xs={1} lg={1} className="" style={{fontSize:".9em",cursor: "pointer",paddingTop:"4px"}}  onClick={()=> {
                                const ar = resEdit.liens;
                                ar.splice(index,1);
                                setResEdit({
                                    ...resEdit,
                                    liens:ar});
                                setDescriptifInput(false);
                                }}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Col>
                        </Row>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalEdit(false); newLien=""}}>Annuler</button>
                <button type="button" className="btn btn-primary" onClick={validEditRes}>Enregistrer</button>
            </Modal.Footer>
        </Modal>
    </>
    )
}