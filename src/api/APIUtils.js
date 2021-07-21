const domainPath = 'http://localhost:3000/';

/////////////////////////////////
////////  API 
////////  avec serveur
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

////////  sans serveur
export async function LoginDev(username,password){
  console.log("API LoginDev var unsername : ",username);
    const t = {"token":"test123"};
    return t;
}