import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { init, add, edit, del}  from "../../reducers/ressourcesReducer";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import {Row, Col, DropdownButton, Form} from "react-bootstrap";
import { SaveNewRes } from "../../api/APIUtils";
import {AGES} from "../../App/constantes";
import ListeRessources from "./ListeRessources";
import "../../Styles/Categorie.css";
import "../../Styles/Ressources.css";





export default function Ressources(){
    const dispatch = useDispatch();
    
    ///////// Charges et gestion modifs component child des ressources
    let ressources = useSelector(state => state.ressources);
    
    // Ajout etat 'show' (état collapse éléments)
    let  initCollapse = [];
    for(let i=0;i<=ressources.length-1;i++){
        initCollapse.push(false);
    };

    let ressourcesCollapse = useDispatch(init(initCollapse));

    //////////////////////////////////////////
    //////// Modal popup creation ressource
    const ressourceModel = {
        id:null,
        nom:"",
        categorie:"",
        video:"",
        documents:[],
        liens:[]
    }
    const [ModalCreate, setModalCreate] = useState(false);
    const [resCreate, setResCreate] = useState(ressourceModel);
    const [descriptifInput, setDescriptifInput] = useState(false);
    let newLien = null;
    let lienInput = React.createRef();
    const resetLienInput = () => {
        lienInput.current.value = "";
    };

    /// Enregistrement Nouvelle ressource
    const [messageNom,setMessageNom] = useState("");
    const [messageCat,setMessageCat] = useState("");
    let inputOk = true;
    const newRessource = () => {
        // Verification des input obligatoires
        resCreate.nom === "" ? setMessageNom("Nom obligatoire.") : setMessageNom("");
        resCreate.categorie === "" ? setMessageCat("Catégorie obligatoire.") : setMessageCat("");
        resCreate.nom === "" || resCreate.categorie === "" ?   inputOk = false : inputOk = inputOk;
            
        // Enregistrement
        if(inputOk){
            const ids = ressources.map((res) => res.id).sort();
            const newId = ids.[ids.length - 1]+1;
            let ressourceBdd = resCreate;
            ressourceBdd.id = newId;
            setResCreate(ressourceModel);   
            
            //Méthode API d'envoi (à terminer)
            SaveNewRes(ressourceBdd)
                .then(setModalCreate(false));
            dispatch(add(ressourceBdd));
        }
            
    };

    //////// Filtre d'affichage des ressources 
    const [filtreRessources, setFiltreRessources] = useState({
        ages:[false,false,false,false],
        categorie:"",
        mots:""
    });
    let filtre = filtreRessources;

    /// Filtre Age
    const ChangeAgeFilter = (index,value) => {
        filtre.ages.splice(index,1,value);
        setFiltreRessources(filtre);
    };

    /// Filtre Catégorie
    const ChangeCatFilter = (index,value) => {
        filtre.categorie.splice(index,1,value);
        setFiltreRessources(filtre);
    }
    
    /// Filtre Mot
    const FiltreMot = (mots) => {
        filtre.mots = mots;
        //setFiltreRessources(filtre);
        console.log(filtreRessources);
    }

    //////// Chargement des catégories (filtre)
    const [cats, setCats] = useState([]);

    useEffect(() => {
        fetch("categories.json") // Fichier statique de prod placé dans public
            .then(resp => resp.json())
            .then(data => setCats(data));
    }, []);

    return(
        <>
        {/*Section filtre*/}
        <div className="containerRessources">
            <div>
                <div>
                    <input
                        name=""
                        type="text"
                        className="inputRecherche"
                        placeholder="Recherche dans le nom"
                        onChange={(e) => FiltreMot(e.target.value)}
                    />
                    <FontAwesomeIcon 
                        className="iconRecherche" 
                        icon={faSearch} 
                        />
                </div>
                <div className="filtres d-flex">
                    <DropdownButton 
                        title="Categorie Age"
                        variant="btn_age">
                        {AGES.map((age, index) => {
                            return(
                            <>
                            <input
                                name="age"
                                type="checkbox"
                                className="checkAge"
                                onChange={((e) => {
                                    ChangeAgeFilter(index,e.target.checked)
                                })}
                            />
                            <label>{age}</label><br />
                            </>
                            )
                        })}
                    </DropdownButton>
                    <DropdownButton 
                        title="Categorie Nom"
                        variant="btn_age">
                        {cats.map((categorie,index) => (
                            <div className="widthAuto">
                                <input as="checkbox"
                                    name={categorie.id}
                                    type="checkbox"
                                    className="checkAge"
                                    onChange={((e) => {
                                    ChangeCatFilter(index,e.target.checked)
                                })}
                                />
                                <label>{categorie.nom}</label><br />
                            </div>
                        ))}
                    </DropdownButton>
                </div>
            </div>
        </div>
        <div>
            <hr style={{margin:"0"}}/>
        </div>
        {/* Section liste ressources*/}
        <div className="containerRessources">
            <div>
                <button 
                    className="boutonAjoutR" 
                    onClick = {() => setModalCreate(true)}
                    >+ Ajout d'une nouvelle ressource</button>
            </div>
            <div>
                    <ListeRessources filtre={filtreRessources} ressources={ressources} categories={cats} />
            </div>
        </div>

        {/* Popup de creation de nouvelle ressource */}
        <Modal 
            show={ModalCreate} 
            aria-labelledby="ModalCreate"
            onHide={() => setModalCreate(false)}>
            <Modal.Header 
                id="ModalCreate"
                style={{fontWeight:"bold"}}>
                Ajout d'une nouvelle ressource</Modal.Header>
            <Modal.Body>
                <div className="d-flex mb-2">
                <label className="labelFieldModalRes" style={{paddingRight:"15px"}}>Catégorie*</label>
                    <select 
                        style={{paddingLeft:"10px",width:"100%"}}
                        className="field_resCreate"
                        onChange={(e) =>  {
                            setResCreate({
                                ...resCreate,
                                categorie:e.target.value});
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
                <div className="d-flex">
                    <label className="labelFieldModalRes w-25">Vidéo </label>
                        <Form.Group 
                            controlId="formFileSm" 
                            className="mb-3" 
                            name="input-file"
                            label='File'
                            style={{width:"100%"}}>
                        <Form.Control 
                            type="file" 
                            onChange={(e) => {
                                console.log("url doc video : ",e.target.files[0])
                                setResCreate({
                                    ...resCreate,
                                    video:e.target.files[0]})
                            }
                            }/>
                            
                        </Form.Group>
                </div>
                <div className="d-flex">
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
                                e.target.value = null;}}/>
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
                    <label className="labelFieldModalRes justify-content-start"
                    style={{width:"91px"}}>Liens </label>
                    <input 
                        name="lien"
                        type="text" 
                        ref={lienInput}
                        disabled={descriptifInput ? "disabled" : ""}
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
                            const ar = resCreate.liens;
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
                                newLien = null;
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
            </Modal.Body>
            <Modal.Footer>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {setModalCreate(false); setResCreate(ressourceModel);newLien=null}}>Annuler</button>
            <button type="button" className="btn btn-primary" onClick={() => newRessource()}>Enregistrer</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

const styles = {};

styles.content = {
    
}