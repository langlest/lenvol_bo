import React, { useState } from "react";
import { add }  from "../../reducers/ressourcesReducer";
import "../../reducers/categoriesReducer";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Form} from "react-bootstrap";
import { SaveNewRes } from "../../api/APIUtils";
import { Ressource } from "../../model/Ressource";
import { Categorie } from "../../model/Categorie";
import { TITRE_ADD_RESSOURCE } from "../../App/constantes";

import "../../Styles/Categorie.css";
import "../../Styles/Ressources.css";

export default function RessourceAdd(){
    const dispatch = useDispatch();
    const cats:Categorie[] = useSelector((state:any) => state.categories);
    const ressources:Ressource[] =  useSelector((state:any) => state.ressources);
    let history = useHistory();

    /////////////// Creation ressource
    const categorieModel:Categorie = new Categorie(0,"",[],false);
    const ressourceModel:Ressource = new Ressource(0, categorieModel, "", "", [], [], true);
    
    /// Enregistrement Nouvelle ressource
    const [resCreate, setResCreate] = useState<Ressource>(ressourceModel);
    const [descriptifInput, setDescriptifInput] = useState(false);
    let newLien:string = "";
    // ref de communication entre inputs
    let lienInput:any = React.createRef();
    const resetLienInput = () => {
        lienInput.current.value = "";
    };
    const [messageNom,setMessageNom] = useState("");
    const [messageCat,setMessageCat] = useState("");
    let inputOk = true;
    interface HTMLInputEvent extends Event {
        target: HTMLInputElement & EventTarget;
    }
    const newRessource = () => {
        // Verification des input obligatoires
        resCreate.nom === "" ? setMessageNom("Nom obligatoire.") : setMessageNom("");
        resCreate.categorie.nom === "" ? setMessageCat("Catégorie obligatoire.") : setMessageCat("");
        resCreate.nom === "" || resCreate.categorie.nom === "" ?   inputOk = false : inputOk = inputOk;
            
        // Enregistrement
        if(inputOk){
            // Def d'un id et ajout à l'objet ressourceBdd 
            const ids:(number | null)[] = ressources.map((res) => res.id).sort();
            const idHigh:number | null = ids.length ? ids[ids.length - 1] : 0;
            const newId:number  = Number(idHigh)+1;
            let ressourceBdd = resCreate;
            ressourceBdd.id = newId;
            setResCreate(ressourceModel);   
            //Méthode API d'envoi (à terminer ...)
            SaveNewRes(ressourceBdd)
                .then(() => dispatch(add(ressourceBdd)));
                history.goBack();
        }
    };

    return(
        <div className="containerRessourceEdit">
            <div><h4>{TITRE_ADD_RESSOURCE}</h4>
                <div className="d-flex mb-2">
                <label className="labelFieldModalRes w-25">Catégorie*</label>
                    <select 
                        style={{paddingLeft:"10px",width:"100%"}}
                        className="field_resCreate"
                        onChange={(e) =>  {
                            let newCat:Categorie = resCreate.categorie;
                            newCat.nom = e.target.value;
                            setResCreate({
                                ...resCreate,
                                categorie:newCat});
                        }}>
                        <option value=""></option>
                        {cats.map((categorie,indexCat) =>  
                            <option value={categorie.nom}>{categorie.nom}</option>
                        )}
                    </select>
                </div>
                {messageCat &&
                    <div className="d-flex mb-2">
                        <div className="labelFieldModalRes w-25"></div>
                        <div className="w-25" style={{fontSize:".7em",color:"red"}}>{messageCat}</div>
                    </div>
                }
                <div className="d-flex mb-2">
                    <label className="labelFieldModalRes w-25">Nom* </label>
                    <input 
                        name="nom"
                        type="text" 
                        placeholder="Titre de la ressource"
                        className="field_resCreate"
                        onChange={(e) =>  {
                            setResCreate({
                                ...resCreate,
                                nom:e.target.value});
                        }}>
                    </input>
                </div>
                {messageNom &&
                    <div className="d-flex mb-2">
                        <div className="labelFieldModalRes w-25"></div>
                        <div className="w-25" style={{fontSize:".7em",color:"red"}}>{messageNom}</div>
                    </div>
                }
                {resCreate.video.length === 0 &&
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
                                console.log("url doc video : ",fileName)
                                setResCreate({
                                    ...resCreate,
                                    video:String(fileName)})
                            }
                            }/>
                            
                        </Form.Group>
                </div>
                }
                {resCreate.video.length > 0 &&
                    <Row className="d-flex mb-3">
                        <Col className="w-25" >Vidéo </Col>
                        <Col md={8} xs={8} lg={8}>
                            <span style={{fontSize:".8em", paddingTop:"9px",marginLeft:"30px"}}>{resCreate.video} </span>
                        </Col>
                        <Col className="col-1" style={{marginLeft:"30px",paddingTop:"9px",fontSize:".9em",cursor: "pointer"}}  onClick={()=> {
                            setResCreate({
                                ...resCreate,
                                video:""});
                            }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Col>
                    </Row>
                }
                <div className={resCreate.documents.length ? "d-flex mb-3" : "d-flex "}>
                    <label className="labelFieldModalRes w-25">Documents </label>
                        <Form.Group controlId="formFileSm" className="mb-3 " style={{width:"100%"}}>
                            <Form.Control 
                            type="file"  
                            onChange={(e) => {
                                const ar = resCreate.documents;
                                const newdocLink = e.target.value.split('\\');
                                const docname = newdocLink[newdocLink.length-1];
                                ar.push(docname)
                                setResCreate({
                                ...resCreate,
                                documents:ar});
                                e.target.value = "";}}/>
                        </Form.Group>
                </div>
                {resCreate.documents.length > 0 &&
                    resCreate.documents.map((document,index) => 
                        <Row className="d-flex mb-3">
                            <Col className=""></Col>
                            <Col className="d-flex" md={8} xs={8} lg={8}>
                                <div style={{width:"25px", backgroundColor:"#478"}}></div>
                                <span style={{fontSize:".8em", paddingTop:"3px",marginLeft:"10px"}}>{document} </span>
                            </Col>
                            <Col md={1} xs={1} lg={1} className="" style={{fontSize:".9em",cursor: "pointer"}}  onClick={()=> {
                                const ar = resCreate.documents;
                                ar.splice(index,1);
                                setResCreate({
                                    ...resCreate,
                                    documents:ar});
                                }}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Col>
                        </Row>
                    )
                }
                <div className="d-flex mb-3">
                    <label className="labelFieldModalRes justify-content-start w-25">Liens </label>
                    <input 
                        name="lien"
                        type="text" 
                        ref={lienInput}
                        disabled={descriptifInput}
                        placeholder="Lien url"
                        onChange={(e) => {
                            newLien = String(e.target.value);
                        }}
                        className={descriptifInput ? "field_resCreate " : "field_resCreate2 " }
                    />
                    {!descriptifInput &&
                    <div className="btnTextModalRes" 
                        style={{cursor:"pointer",marginLeft:"6px"}}
                        onClick={() => {
                            const ar:any = resCreate.liens;
                            ar.push({url:newLien})
                            setResCreate({
                                ...resCreate,
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
                            onClick={() => {
                                const ar = resCreate.liens;
                                let lastLink = ar[ar.length-1];
                                lastLink.descriptif = newLien;
                                setResCreate({
                                    ...resCreate,
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
                {resCreate.liens.length > 0 &&
                    resCreate.liens.map((lien,index) => 
                        <Row className="d-flex mb-2">
                            <Col className="w-25"></Col>
                            <Col md={8} xs={8} lg={8}>
                                <a href={lien.url}>{lien.url}</a>  <br />
                                {lien.descriptif &&
                                    <div>{lien.descriptif}</div>
                                }
                                
                            </Col>
                            <Col md={1} xs={1} lg={1} className="" style={{fontSize:".9em",cursor: "pointer",paddingTop:"4px"}}  onClick={()=> {
                                const ar = resCreate.liens;
                                ar.splice(index,1);
                                setResCreate({
                                    ...resCreate,
                                    liens:ar});
                                setDescriptifInput(false);
                                }}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Col>
                        </Row>
                    )
                }
            </div>
            <div className="d-flex w-100 justify-content-end">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {setResCreate(ressourceModel);newLien="";history.goBack();}}>Annuler</button>
                <button type="button" style={{marginLeft:".8rem"}} className="btn btn-primary" onClick={() => newRessource()}>Enregistrer</button>
            </div>
        </div>
    )
}