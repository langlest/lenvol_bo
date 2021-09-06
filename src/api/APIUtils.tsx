import {Ressource} from '../model/Ressource';
import {Categorie} from '../model/Categorie';
const domainPath = 'http://localhost:8080/';
const localPath = 'http://localhost:3000/';
const localFolder = "C:/Users/frederic.langlest/source/repos/CoeurUmanis/Lenvol/lenvol_bo/public/";

/////////////////////////////////
////////  API 
////////  connexion avec serveur
export async function LoginApi(username:string,password:string){
    
    const routeApi = 'login';
    const uriApi = domainPath+routeApi;
    fetch(uriApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username,
        password
      })
  })
    .then(data => data.json());
}

////////  connexion locale sans serveur
export async function LoginDev(username:string,password:string){
  console.log("API LoginDev var unsername : ",username);
    const t = {"token":"test123"};
    return t;
}

/////////////////////////////////////////
////////  categorie
export async function ListeCategoriesServer(){
    
  /*const routeApi = 'categories';
  const uriApi = domainPath+routeApi;
  
  fetch(uriApi, {
  headers: {
    'Content-Type': 'application/json'
  }
  })
  .then(data => {
    return data.json()
  });*/

  fetch("categories.json")
      .then(function(response){
        return response.json();
      });
}
export async function SaveNewCat(newCat:Categorie){
    console.log("Enregistrement dans la base du nouvel element 'categorie' ",newCat);
    return true;
}
export async function DeleteCategorie(id:number){
  console.log("Suppression de la categorie "+id+" de la base");
  return true;
}
export async function EditCategorie(item: Categorie) {
  console.log("Mise à jour de la categorie "+item.id+" en base");
  return true;
}
/////////////////////////////////////////
////////  Ressources
export async function ListeRessourcesServer(){
    
  const routeApi = 'ressources.json';
  const uriApi = domainPath+routeApi;
  fetch(uriApi, {
  headers: {
    'Content-Type': 'application/json'
  }
  })
  .then(response => {console.log("[ListeRessourcesServer] response : ",response)
    return response})
  .then(data => {
    return data.json()
  });
}
export async function SaveNewRes(newRes:Ressource){
  console.log("[SaveNewRes]",newRes);
  const formData = new FormData();

    /* if(newRes.video.length > 0)
		  formData.append('File', newRes.video.File.name);
    
    if(newRes.documents.length > 0){
      newRes.documents.forEach((document) => formData.append('File', document));
    }

    // Upload 
    if
		await fetch(
			{
				method: 'POST',
        headers :{
          'Accept': 'application.json',
          'Content-Type': 'multipart/form-data'
        },
				body: formData,
			}
		)
			.then((response) => {
        if(response.ok){ 
            return true;
        } else {
          console.log('[API] erreur réponse du réseau');
          return false;
        }}
      )
			.catch((error) => {
				console.error('Error:', error);
			}); */
      return true;
}
export async function DeleteRessource(id:number){
  console.log("Suppression de la ressource "+id+" de la base");
  return true;
}
export async function EditRessource(res:Ressource){
  console.log("Edition de la ressource "+res.id+" de la base");
  return true;
}