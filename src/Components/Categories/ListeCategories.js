import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Collapse } from "react-collapse";
import classNames from "classnames";

export default function ListeCategories(props){
    const [activeIndexCat, setActiveIndexCat] = useState(null);
    const newCategorie = () => {};
    const editStateElement = (id) => {};   
    const deleteCat = (id) => {};
    const editCat = (id) => {};

    return (

            props.cats.map((categorie,indexCat) => (
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
                <div className="col-1 d-flex justify-content-center text-center " onClick={() => editCat(categorie.id)}>
                    <FontAwesomeIcon icon={faPen} />
                </div>
                <div className="col-1 d-flex justify-content-center text-center" onClick={() => deleteCat(categorie.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </div>
            </div>
        ))
    )
}