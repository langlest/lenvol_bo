import {useState} from "react";
import Modal from 'react-bootstrap/Modal';
import { Collapse } from "react-collapse";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {AGE1, AGE2, AGE3, AGE4} from "../../App/constantes";
import { edit, del}  from "../../reducers/categoriesReducer";
import { useDispatch } from 'react-redux';
import { Categorie } from "../../model/Categorie";
import { EditCategorie, DeleteCategorie } from "../../api/APIUtils";

export default function CategorieItem (props:any){
    const dispatch = useDispatch();
    const categorie:Categorie = props.categorie;
    const categories:Categorie[] = props.cats;
    const index = props.index;

    const catVide: Categorie = new Categorie(0,"",[],true);

    const [collapseCat, setCollapseCat] = useState(false);
    
    //////// SUPPRESSION de ressource
    const [catDelete, setCatDelete] = useState<Categorie>(catVide);
    const [ModalDelete, setModalDelete] = useState(false);
    const handleClose = ():void => setModalDelete(false);
    const deleteConfirm = (id:number) => {
        categories.forEach((item:Categorie) =>{
            if(item.id === id){
                setCatDelete(item);
            }
        });
        setModalDelete(true);
    };
    const deleteCat = (id:number) => {       
        /// Suppression en base et Redux
        DeleteCategorie(id)
            .then(() => dispatch(del(id)))
            .then(handleClose);
    };   
    
    ///////// EDITION  de ressource
    let catForm: {
        id?: number,
        nom?: string,
        age1?: boolean,
        age2?: boolean,
        age3?: boolean,
        age4?: boolean,
        supprimable:boolean
    }

    catForm = {
        id : 0,
        nom : "",
        age1 : false,
        age2 : false,
        age3 : false,
        age4 : false,
        supprimable:true
    };
    const [ModalEdit, setModalEdit] = useState(false);
    const [catEdit, setCatEdit] = useState<typeof catForm>(catForm);
    const editDemand = () => {
        let catFormValue:typeof catForm = {
            id:categorie.id,
            nom:categorie.nom,
            age1:categorie.ages.some(a => a === AGE1),
            age2:categorie.ages.some(a => a === AGE2),
            age3:categorie.ages.some(a => a === AGE3),
            age4:categorie.ages.some(a => a === AGE4),
            supprimable:categorie.supprimable
        };
        setCatEdit(catFormValue);
        setModalEdit(true);
    }
    const validEditCat = () => {
        const agesEdited = [];
        if(catEdit!.age1) agesEdited.push(AGE1);
        if(catEdit!.age2) agesEdited.push(AGE2);
        if(catEdit!.age3) agesEdited.push(AGE3);
        if(catEdit!.age4) agesEdited.push(AGE4);
        const categorieEdited = new Categorie(Number(catEdit.id),String(catEdit.nom),agesEdited,catEdit.supprimable)
        /// Mise à jour de la modification en Bdd puis Redux
        EditCategorie(categorieEdited) 
            .then(() => dispatch(edit(categorieEdited)))
            .then(() => setModalEdit(false))
            
        if(ModalEdit)
            setCatEdit(catVide);
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
                                    <li key={indexAge}>{CatAge}</li>
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
                <button type="button" className="btn btn-secondary" data-dismiss="modal"  onClick={handleClose}>Annuler</button>
                <button type="button" className="btn btn-primary" onClick={() => deleteCat(catDelete.id)}>Supprimer</button>
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
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setModalEdit(false)}>Annuler</button>
            <button type="button" className="btn btn-primary" onClick={validEditCat}>Enregistrer</button>
            </Modal.Footer>
        </Modal>
        </>
    )
}