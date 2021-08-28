export class Lien{
    public url:string = "";
    public descriptif:string = "";

    constructor(url:string,descriptif:string){
        this.url=url;
        this.descriptif=descriptif;
    }
};

export class Ressource {
    public id:number | null;
    public categorie:string;
    public nom:string;
    public video:string;
    public documents:string[];
    public liens:Lien[];

    constructor(id:number | null,categorie:string,nom:string,video:string,documents:string[],liens:Lien[]){
        this.id = id;
        this.categorie = categorie;
        this.nom = nom;
        this.documents = documents;
        this.video = video;
        this.liens = liens;
    }
} 