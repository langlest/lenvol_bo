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
export async function listeCategories(){
    
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
      })
      .then(function(listeCat) {
        console.log("API Cat",listeCat);
        return listeCat;
      });
}

export async function SaveNewCat(newCat){
    console.log("Enregistrement dans la base du nouvel element ",newCat);
    return true;
}