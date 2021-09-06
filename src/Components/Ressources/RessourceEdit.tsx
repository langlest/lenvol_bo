import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { Col, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { EditRessource } from "../../api/APIUtils";
import { edit }  from "../../reducers/ressourcesReducer";
import { newFilter } from "../../reducers/filterReducer";
import { useDispatch, useSelector } from 'react-redux';
import { Ressource, Lien } from "../../model/Ressource";
import { Categorie } from "../../model/Categorie";
import "../../Styles/Ressources.css";
import { useParams } from "react-router-dom";
import { TITRE_EDIT_RESSOURCE } from "../../App/constantes";

export default function RessourceEdit(){
    const dispatch = useDispatch();
    const categories:Categorie[] = useSelector((state:any) => state.categories);
    const ressources:Ressource[] =  useSelector((state:any) => state.ressources);
   
    const ressourceModel:Ressource = new Ressource(0, new Categorie(0,"",[],false), "", "", [], [], true);
    const paramPath:{id:string} = useParams();
    const paramPathId = paramPath.id;
    
    let history = useHistory();

    //////////////// EDIT
    const ressourceEdit:any = ressources.find(ressource => String(ressource.id) === paramPathId)

    const [resEdit, setResEdit] = useState<Ressource>(ressourceEdit);
    const [descriptifInput, setDescriptifInput] = useState(false);
    // ref de communication avec input Lien
    let lienInput:any = React.createRef();
    const resetLienInput = () => {
        lienInput.current.value = "";
    };
    let newLien:string = "";

    const validEditRes = () => {
        // Envoi en base ET modif de la liste Redux
        EditRessource(resEdit)
            .then(() => dispatch(edit(resEdit)))

        newLien="";
        setResEdit(ressourceModel)
        history.goBack();
    };  

    return (
        <div className="containerRessourceEdit">
            <div><h4>{TITRE_EDIT_RESSOURCE}</h4>
                <div className="d-flex mb-2">
                    <label className="labelFieldModalRes w-25" >Catégorie</label>
                    <select 
                        style={{paddingLeft:"10px",width:"100%"}}
                        className="field_resCreate"
                        onChange={(e) =>  {
                            const valueId = Number(e.target.value);
                            const catSelect:any = categories.find(c=>c.id === valueId)
                            setResEdit({
                                ...resEdit,
                                categorie:catSelect});
                        }} >
                        <option value=""></option>
                        {categories.map((categorie:Categorie) => {
                            return(
                            <option 
                                value={categorie.id}
                                selected={categorie.id === resEdit.categorie.id}
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
                        <Col className="w-25">Vidéo </Col>
                        <Col md={8} xs={8} lg={8}>
                            <span style={{fontSize:".8em", paddingTop:"9px",marginLeft:"30px"}}>{resEdit.video} </span>
                        </Col>
                        <Col className="col-1" style={{marginLeft:"30px",paddingTop:"3px",fontSize:".9em",cursor: "pointer"}}  onClick={()=> {
                            setResEdit({
                                ...resEdit,
                                video:""});
                            }}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Col>
                    </Row>
                }
                <div className={"d-flex " }>
                    <label className="labelFieldModalRes w-25">Documents </label>
                        <Form.Group controlId="formFileSm" className="mb-3 " style={{width:"100%"}}>
                            <Form.Control 
                            type="file"  
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                                let ar:string[] = resEdit.documents;
                                const newdocLink = e.target.value.split('\\');
                                const docname:string = newdocLink[newdocLink.length-1];
                                ar = Object.assign([], ar); // permet d'étendre l'objet ar
                                ar.push(docname)
                                setResEdit({
                                    ...resEdit,
                                    documents:ar});
                                e.target.value = "";}}/>
                        </Form.Group>
                </div>
                {resEdit.documents.length > 0 &&
                    resEdit.documents.map((document:string,index:number) => 
                        <Row className="d-flex mb-3">
                            <Col className="w-25"></Col>
                            <Col className="d-flex" md={8} xs={8} lg={8}>
                                <div style={{width:"25px", backgroundColor:"#478"}}></div>
                                <span style={{fontSize:".8em", paddingTop:"3px",marginLeft:"10px"}}>{document} </span>
                            </Col>
                            <Col md={1} xs={1} lg={1} style={{fontSize:".9em",cursor: "pointer"}}  onClick={()=> {
                                let ar = resEdit.documents;
                                ar = Object.assign([], ar); // permet d'étendre l'objet ar
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
                    <label className="labelFieldModalRes w-25 justify-content-start">Liens </label>
                    <input 
                        name="lien"
                        type="text" 
                        ref={lienInput}
                        disabled={descriptifInput}
                        placeholder="Lien url"
                        onChange={(e) => {
                            newLien = e.target.value;
                        }}
                        className={descriptifInput ? "field_resCreate " : "field_resCreate2 " }
                    />
                    {!descriptifInput &&
                    <div className="btnTextModalRes" 
                        style={{cursor:"pointer",marginLeft:"6px"}}
                        onClick={() => {
                            let ar = resEdit.liens;
                            ar = Object.assign([], ar); // permet d'étendre l'objet ar
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
                            className="field_resCreate2"
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
                    resEdit.liens.map((lien:Lien,index:number) => 
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
            </div>
            <div className="d-flex w-100 justify-content-end"> 
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => {newLien=""; history.goBack();}}>Annuler</button>
                <button type="button" style={{marginLeft:".8rem"}} className="btn btn-primary" onClick={validEditRes}>Enregistrer</button>
            </div>
        </div>
    )
}