const domainPath = 'http://localhost:8080/';

/////////////////////////////////
////////  API 
////////  connexion avec serveur
export async function LoginApi(username,password){
    
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
    .then(data => data.json())
}

////////  connexion locale sans serveur
export async function LoginDev(username,password){
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

export async function SaveNewCat(newCat){
    console.log("Enregistrement dans la base du nouvel element 'categorie' ",newCat);
    return true;
}
export async function DeleteCategorie(id){
  console.log("Suppression de la categorie "+id+" de la base");
  return true;
}

/////////////////////////////////////////
////////  categorie
export async function ListeRessourcesServer(){
    
  /*const routeApi = 'ressources';
  const uriApi = domainPath+routeApi;
  fetch(uriApi, {
  headers: {
    'Content-Type': 'application/json'
  }
  })
  .then(data => {
    return data.json()
  });*/

  fetch("ressources.json")
      .then(response => response.json());
}
export async function SaveNewRes(newRes){
  console.log("Enregistrement dans la base du nouvel element 'ressource' ",newRes);
  return true;
}

export async function DeleteRessource(id){
  console.log("Suppression de la ressource "+id+" de la base");
  return true;
}