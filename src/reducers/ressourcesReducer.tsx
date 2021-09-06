import { createSlice } from '@reduxjs/toolkit';
import { Ressource } from './../model/Ressource';
import { ListeRessourcesServer } from "../api/APIUtils"

let initialState:Ressource[] = [
  {
    id:1,
    nom:"ressource 1",
    categorie:{
      id:1,
      nom:"Tutos bien-être et sport",
      ages:["4-10 ans", "Parents / Aidants"],
      supprimable:false
    },
    video:"video.mpg",
    documents:[
        "charte.pdf"
    ],
    liens:[
        {
            url:"http://www.ressources.com",
            descriptif:"Toutes les ressoures utiles"
        }
    ],
    supprimable:true
},
{
  id:2,
  nom:"ressource 2",
  categorie:{
    id:3,
    nom:"Ateliers cuisine",
    ages:["4-10 ans","11-15 ans"],
    supprimable:true
  },
  video:"ressource1.mp4",
  documents:[],
  liens:[
      {
          url:"http://www.cuisinefacile.com",
          descriptif:"Nos publications"
      }
    ],
    supprimable:true
  },
  {
    id:3,
    nom:"Y a plus qu'à",
    categorie:{
      id:5,
      nom:"Activité musique",
      ages:["4-10 ans","11-15 ans","Parents / Aidants"],
      supprimable:false
    },
    video:"video.mpg",
    documents:[],
    liens:[
      {
          url:"http://www.yaplusqua.com",
          descriptif:"réesau des yaplusqua"
      }
    ],
    supprimable:false
  },
  {
    id:4,
    nom:"Pourquoi pas",
    categorie:{
      id:5,
      nom:"Activité musique",
      ages:["4-10 ans","11-15 ans","Parents / Aidants"],
      supprimable:false
    },
    video:"video.mpg",
    documents:[],
    liens:[
      {
          url:"http://www.pourquoipas.com",
          descriptif:"Tout savoir sur les pourquoipas"
      }
    ],
    supprimable:true
  }
];


export const ressourcesSlice = createSlice({
  name: 'ressources',
  initialState,
  reducers: {
    init(state) {
      const ressourcesApi = fetch("ressources.json")
          .then(response => response.json())
          .then(data => {
            state = data;
          });
    },
    add(state, action) {
      state.push(action.payload);
      console.log("[ressourcesReducer] Add ",action.payload)
    },
    edit(state, action){
      console.log("[ressourcesReducer] edit ",action.payload);
      state.some((res,i) => {
        if(res.id === action.payload.id){
          state.splice(i,1,action.payload);
        }
      }); 
    },
    del(state, action){
      console.log("[ressourcesReducer] del",action.payload);
      state.some((res,i) => {
        if(res.id === action.payload){
          state.splice(i,1);
          return true;
        }
      });
    }
  }
});

export const { init, add, edit, del } = ressourcesSlice.actions;
export default ressourcesSlice.reducer;
export const selectRessources = (state:any) => state.ressources;