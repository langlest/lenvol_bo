class lien{
    public url:string = "";
    public descriptif:string = "";
};

export class Ressource {
    public id:number | null;
    public categorie:string;
    public nom:string;
    public video:string;
    public documents:string[];
    public liens:lien[];

    constructor(id:number | null,categorie:string,nom:string,video:string,documents:string[],liens:lien[]){
        this.id = id;
        this.categorie = categorie;
        this.nom = nom;
        this.documents = documents;
        this.video = video;
        this.liens = liens;
    }
} 