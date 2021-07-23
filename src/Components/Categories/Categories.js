import React, { useState, useEffect } from "react";
import "../../Styles/Categorie.css";
import { listeCategories } from "../../api/APIUtils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Categories() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cats, setCats] = useState([]);

    const getCats = ()=>{
        fetch("categories.json")
            .then(function(response){
                return response.json();
            })
            .then(function(listeCat) {
                setCats(listeCat);
            });
    };

    useEffect(()=>{
        getCats();
    },[]);


    return (
        <div className="containerCustom">
            <div className="row ">
                <div className="col-10 ">
                    <button className="boutonAjout" >+ Ajout d'une nouvelle categorie</button>
                </div>
                <div className="col-1 intituleBtn p-0">
                    <span>Modifier</span>
                </div>
                <div className="col-1 intituleBtn p-0">
                    <span>Supprimer</span>
                </div>
            </div>
            <div>
                <DisplayListCat list={cats}/>
            </div>
        </div>
    );
}

function DisplayListCat (cats) {
    cats.list.map((categorie) => 
        console.log(categorie)
    )
    const elementsVisibleSetting = []; 
    cats.list.map((item) => {
        elementsVisibleSetting.push({id:item.id,state:0});
    });

    const [elementDisplay, setElementDisplay] = useState([elementsVisibleSetting]);

    const ElementStat = (id) => {
        elementsVisibleSetting.map((item) => {
            if(item.id === id){ 
                let status = item.state;
                console.log("elementState id("+id+") item : ",item," result state "+status)
                return status;
            }
        })
    };

    const newCategorie = () => {};
    const editStateElement = (id) => {};   
    const deleteCat = (id) => {};
    const editCat = (id) => {};

    return (
        cats.list.map((categorie) => 
            <div className="row ligneCat">
                <div className="col-10 libelleCat">
                    <div><span>{categorie.nom}</span></div>
                    <div style={{display: "contents"}}>
                        <ul className="ElementsCat">
                        {categorie.ages.map((CatAge)=> 
                            <li key={CatAge.age+categorie.id}>{CatAge.age}</li>
                        )}
                        </ul>
                    </div>
                </div>
                <div className="col-1 d-flex justify-content-center text-center" onClick={() => editCat(categorie.id)}>
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <div className="col-1 d-flex justify-content-center text-center" onClick={() => deleteCat(categorie.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        )
    )
}
const styles = {};