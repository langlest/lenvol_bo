import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { newFilter } from "../../reducers/filterReducer";
import { Categorie } from "../../model/Categorie";
import { DropdownButton} from "react-bootstrap";
import { AGES } from "../../App/constantes";
import { filtreInterface } from "../../model/Filtre"



export default function RessourcesFilter(props:any){
    const dispatch = useDispatch();
    //////// Chargement données redux
    let cats:Categorie[] = useSelector((state:any) => state.categories);
    
    //filtredRessources(props.ressources)
    //////// Filtre d'affichage des ressources 
    
    const filtreModel:filtreInterface = {mots:"",ages:[],categories:[]};
    const [filtreRessources, setFiltreRessources] = useState<filtreInterface>(filtreModel);
    
    let filtre: filtreInterface  = filtreRessources;
    
    /// Filtre global
    const filtreGlobal = () => {
        dispatch(newFilter(filtreRessources))
    }

    /// Filtre Age
    const ChangeAgeFilter = (age: string, value: boolean) => {
        let newFiltreAge:string[] = [];
        AGES.map((a,i) => { 
            if(!filtre.ages.find(af=>af === age) && a === age)
                newFiltreAge.push(age)
            if(filtre.ages.find(af=>af === a) && a !== age)
                newFiltreAge.push(a)
        }) 
        
        filtre.ages = newFiltreAge;
        setFiltreRessources(filtre);
        filtreGlobal();
    };

    /// Filtre Catégorie
    const ChangeCatFilter = (id: number) => {
        const catFiltre:any = cats.find(c=>c.id === id);
        const filtreCategorie:Categorie[] = filtre.categories;
        let newFiltreCat:Categorie[]= [];
        filtreCategorie.map(f=>newFiltreCat.push(f));

        // Si non existant -> suppression sinon -> ajout
        const idExist:number = filtreCategorie.findIndex((idSelected) => idSelected.id === id);
        if(idExist !== -1){
            newFiltreCat.splice(idExist, 1)
        }else{
            newFiltreCat.push(catFiltre)
        }
        filtre.categories = newFiltreCat;
        setFiltreRessources(filtre);
        filtreGlobal();
    }

    /// Filtre Mot
    const FiltreMot = (mots: string) => {
        filtre.mots = mots;
        setFiltreRessources(filtre);
        filtreGlobal()
    }


    return (
        <div style={{margin:"20px 0 20px 0"}}>
            <div className="filtres d-flex">
                <DropdownButton
                    title="Filtre Age"
                    variant="btn_age">
                    {AGES.map((age, index) => {
                        return (
                            <>
                                <input
                                    key={index}
                                    name="age"
                                    type="checkbox"
                                    className="checkAge"
                                    onChange={((e:any) => {
                                        ChangeAgeFilter(age, e.target.checked)
                                    })}
                                />
                                <label>{age}</label><br />
                            </>
                        )
                    })}
                </DropdownButton>
                <DropdownButton
                    title="Filtre Catégorie"
                    variant="btn_age">
                    {cats.map((categorie, index) => (
                        <div className="widthAuto">
                            <input
                                key={index}
                                name={String(categorie.id)}
                                type="checkbox"
                                className="checkAge"
                                onChange={((e) => {
                                    ChangeCatFilter(categorie.id)
                                })}
                            />
                            <label>{categorie.nom}</label><br />
                        </div>
                    ))}
                </DropdownButton>
                <input
                    name=""
                    type="text"
                    style={{width:"40%",marginLeft:"20px"}}
                    className="inputRecherche"
                    placeholder="Filtre Nom"
                    onChange={(e) => FiltreMot(e.target.value)}
                />
                
            </div>
        </div>
    )
}