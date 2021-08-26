class Age{
    public age:string;

    constructor(age:string){
        this.age = age;
    }
}

export class Categorie{
    public id:number ;
    public nom:string;
    public ages:Age[];
    public supprimable:boolean;

    constructor(id:number, nom:string, ages:Age[], supprimable:boolean){
        this.id = id;
        this.nom = nom;
        this.ages = ages;
        this.supprimable = supprimable;
    }
}