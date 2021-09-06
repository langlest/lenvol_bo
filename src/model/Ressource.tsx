import { Categorie } from "./Categorie";

export interface Lien{
    url:string
    descriptif:string
};

export class Ressource {
    public id:number | null;
    public categorie:Categorie;
    public nom:string;
    public video:string;
    public documents:string[];
    public liens:Lien[];
    public supprimable:boolean;

    constructor(id:number | null,categorie:Categorie,nom:string,video:string,documents:string[],liens:Lien[],supprimable:boolean){
        this.id = id;
        this.categorie = categorie;
        this.nom = nom;
        this.documents = documents;
        this.video = video;
        this.liens = liens;
        this.supprimable = supprimable;
    }
} 