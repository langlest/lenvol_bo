
export class Categorie{
    public id:number;
    public nom:string;
    public ages:string[];
    public supprimable:boolean;

    constructor(id:number, nom:string, ages:string[], supprimable:boolean){
        this.id = id;
        this.nom = nom;
        this.ages = ages;
        this.supprimable = supprimable;
    }
}