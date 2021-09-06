import React, { useState } from "react";
import { useTable, Column } from 'react-table';
import { LionPlayer } from 'lion-player'; //https://reactjsexample.com/open-source-react-video-player-powered-by-videojs/
import 'lion-player/dist/lion-skin.min.css';
import { Collapse } from "react-collapse";
import { Pagination, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPen, faPlay } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import { DeleteRessource } from "../../api/APIUtils";
import { del } from "../../reducers/ressourcesReducer";
import { useDispatch, useSelector } from 'react-redux';
import { Ressource, Lien } from "../../model/Ressource";
import { Categorie } from "../../model/Categorie";
import "../../Styles/Ressources.css";
import  RessourcesFilter from "./RessourcesFilter"
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

import { useTranslation } from 'react-i18next';




function RessourcesTable() {
    ///// Declarations initiales
    const dispatch = useDispatch();
    const { t } = useTranslation();
    
    const configPagination = Number(process.env.REACT_APP_PAGINATION);
    const configBtnMax = Number(process.env.REACT_APP_BTNS_MAX);
   

    const ressourceModel: Ressource = new Ressource(0, new Categorie(0,"",[],false), "", "", [], [], true);
    let filtre = useSelector((state:any) => state.filter);
    ///////////////////// Chargement redux Ressources (censée provenir de la base)
    const ressources:Ressource[] = useSelector((state: any) => state.ressources);

    ///////////////////// Ressources "filtrées" utilisées dans la table
    const[ressourcesFiltre, setRessourcesFiltre] = useState<Ressource[]>(ressources);
    ///// Filtre des données 
    interface age{age:string, val:any}

    let filtreListeResult:Ressource[] =  ressourcesFiltre;

    if(filtre.mots !== ""){
        const filtreMots:string = filtre.mots
        filtreListeResult = ressources.filter(res => res.nom.includes(filtreMots))
    }
    if(filtre.categories.length){
        const filtreCategorie:Categorie[] = filtre.categories;
        filtreListeResult = filtreListeResult.filter(res => filtreCategorie.find(f=>f.id === res.categorie.id));
    }
    if(filtre.ages.length){
        const filtreAges:string[] = filtre.ages;
        filtreListeResult = filtreListeResult.filter(rf=> filtreAges.find(fa=> rf.categorie.ages.find(rfa => rfa === fa)))
    }
        
    ////////////////////// GESTION DELETE
    const [ModalDelete, setModalDelete] = useState(false);
    const [resDelete, setResDelete] = useState<Ressource>(ressourceModel);
    const handleClose = () => setModalDelete(false);
    const deleteConfirmDemand = (id: number) => {
        let arr = ressources;
        let item:Ressource | undefined= arr.find(r=>r.id === id);
        setResDelete(item ? item : ressourceModel);
        setModalDelete(true);
    };
    const deleteRes = (id: number | null) => {
        /// New liste ressourcesFiltre State
        const listStateMaj:Ressource[]=[];
        ressourcesFiltre.map((res,i) => {
            if(res.id !== id){
                listStateMaj.push(res);
            }     
        });
        setRessourcesFiltre(listStateMaj);

        /// Envoi en base ET MAJ liste ressources Redux ET ressourcesFiltre
        DeleteRessource(Number(id))
            .then(() => { dispatch(del(id)) })
            .then(() => handleClose());
    };

    ////////////////////// PAGINATION
    let items = [];

    //  1  ////// Gestion de la liste des éléments affichés
    const [pageChoisie, setPageChoisie] = useState(1);
    let ressourcesPageChoisie: Ressource[] = [];
    if (filtreListeResult) {
        const firstItem = (pageChoisie - 1) * configPagination;
        const lastItem = firstItem + configPagination;
        const ressourcesState = filtreListeResult;
        ressourcesPageChoisie = ressourcesState.slice(firstItem, lastItem)
    }

    // 2  ////// Gestion des boutons de pagination
    const elementsParPage = configPagination;
    const nbBtnsConf = configBtnMax
    const nbPages: number = Math.ceil(ressourcesFiltre.length / elementsParPage);
    
    if (filtreListeResult && nbPages >= 2) {

        const n_groupeBtn: number = Math.ceil(pageChoisie / nbBtnsConf);
        const indexBoutonPage: number = n_groupeBtn < 2 ? 1 : (n_groupeBtn - 1) * nbBtnsConf + 1;
        const lastBoutonPage: number = (indexBoutonPage + nbBtnsConf) - 1 > nbPages ? nbPages : (indexBoutonPage + nbBtnsConf) - 1;
        
        // 2.1 // Boutons < et <<
        if (pageChoisie >= 2)
            items.push(<Pagination.First onClick={(e) => setPageChoisie(1)} />);
        if (pageChoisie > 1)
            items.push(<Pagination.Prev onClick={(e) => setPageChoisie(pageChoisie - 1)} />);
        // 2.2 // Ellipse
        if (indexBoutonPage > 1)
            items.push(<Pagination.Ellipsis />)

        // 2.3 // Boutons chiffrés
        for (let pageNumber: number = indexBoutonPage; pageNumber <= lastBoutonPage; pageNumber++) {
            items.push(
                <Pagination.Item key={pageNumber} active={pageNumber === pageChoisie} onClick={(e) => setPageChoisie(pageNumber)}>
                    {pageNumber}
                </Pagination.Item>,
            );
        };

        // 2.4 // Ellipse
        if (lastBoutonPage < nbPages)
            items.push(<Pagination.Ellipsis />)
        // 2.5 // Boutons > et >>
        if (pageChoisie < nbPages)
            items.push(<Pagination.Next onClick={(e) => setPageChoisie(pageChoisie + 1)} />);
        if (pageChoisie + configBtnMax <= nbPages)
            items.push(<Pagination.Last onClick={(e) => setPageChoisie(nbPages)} />);
    }

    //////////////// Construction TABLE
    const data: any = React.useMemo(() => ressourcesPageChoisie , [pageChoisie, filtreListeResult]);
    const columns: Array<Column<Ressource>> = React.useMemo(
        () => [
            {
                Header: 'Nom Ressource',
                accessor: 'nom', // accessor is the "key" in the data
                Cell: (props) => {
                    const [activeIndexRes, setActiveIndexRes] = useState<number | null>();
                    const ressource: Ressource = props.row.original;
                    const index = ressource.id

                    ////////// Gestion video
                    const [modalVideo, setModalVideo] = useState(false);
                    const handleVideoClose = () => setModalVideo(false);
                    const handleVideoOpen = (video: string) => {
                        setModalVideo(true);
                        src_video[0].src = video;
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
                        <div className="ligneRes" >
                            <div className="libelleRes">
                                <div onClick={() => {
                                    setActiveIndexRes(index === activeIndexRes ? null : index)
                                }}
                                    style={{ cursor: "pointer" }}>{ressource.nom}
                                </div>
                                <Collapse isOpened={activeIndexRes === index}>
                                    <div >
                                        <ul className="ElementsRes">
                                            <li className="d-flex">
                                                <div className="widthProp">Categorie</div>
                                                <div>: {ressource.categorie.nom}</div>
                                            </li>
                                            <>{ressource.video &&

                                                <li className="d-flex">
                                                    <div className="widthProp">Vidéo</div>
                                                    <div>: {ressource.video}</div>
                                                    <div><FontAwesomeIcon style={{ marginLeft: "30px", marginTop: "3px", cursor: "pointer" }} icon={faPlay} onClick={() => handleVideoOpen(ressource.video)} /></div>
                                                </li>}</>
                                            <>{ressource.documents &&
                                                ressource.documents.map((doc: string, i: number) => {
                                                    return (
                                                        <li className="d-flex">
                                                            <div className="widthProp">Document {i + 1}</div>
                                                            <div>: <a href={doc} target="_blank" >{doc}</a></div>
                                                        </li>
                                                    )
                                                })}
                                            </>
                                            <>{ressource.liens &&
                                                ressource.liens.map((lien: Lien, j: number) => {
                                                    return (
                                                        <li className="d-flex">
                                                            <div className="widthProp">Lien {j + 1}</div>
                                                            <div>: <a href={lien.url} target="_blank">{lien.url}</a><br /> ({lien.descriptif})</div>
                                                        </li>)
                                                })}
                                            </>
                                        </ul>
                                    </div>
                                </Collapse>
                            </div>
                            <Modal
                                show={modalVideo}
                                onHide={handleVideoClose}
                                size="lg">
                                <Modal.Header ></Modal.Header>
                                <Modal.Body><LionPlayer sources={src_video} /></Modal.Body>
                            </Modal>
                        </div>

                    );
                }
            },
            {
                Header: 'Boutons de gestion',
                accessor: 'supprimable',
                Cell: (props) => {
                    const ressRow: Ressource = props.row.original;

                    const supprStatus = props.value
                    return (
                        <div>
                            <div style={{ width: "10%", right: "10px" }} className="d-flex">
                                <Nav.Link style={{ cursor: "pointer", margin: "0px", padding: "0px", color: "#212529", paddingRight: "20px" }}
                                    as={Link}
                                    to={"/Ressource/Edit/" + ressRow.id}
                                >
                                    <FontAwesomeIcon icon={faPen} />
                                </Nav.Link>
                                {supprStatus &&
                                    <span style={{ cursor: "pointer", paddingRight: "20px" }} onClick={() => deleteConfirmDemand(Number(ressRow.id))}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </span>
                                }
                            </div>
                        </div>
                    );
                },
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data },)

    return (
        <div>
            <table {...getTableProps()} style={{ border: 'solid 0px blue', width: "100%" }}>
                <thead>    
            <tr >
                <td colSpan={2} >
                <RessourcesFilter ressources={ressources}/>
                </td>
            </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                width: "85%",
                                                paddingLeft: '12px',
                                                border: 'solid 0px gray'
                                            }}
                                            className="libelleRes"
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{ margin: "20px" }}>
                <Pagination>{items}</Pagination>
            </div>
            <div>
                <Modal
                    show={ModalDelete}
                    onHide={handleClose}
                    size="sm">
                    <Modal.Header style={{ fontWeight: "bold" }}>Suppression de ressource</Modal.Header>
                    <Modal.Body>Supprimer : '{resDelete.nom}' ?</Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={() => deleteRes(resDelete.id)}>Supprimer</button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}

export default RessourcesTable