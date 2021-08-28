import { createSlice } from '@reduxjs/toolkit';
import { Ressource } from './../model/Ressource';

// Define a type for the slice state


const initialState : Ressource[] = 
    [
      {
        id:1,
        nom:"ressource 1",
        categorie:"Tutos bien-être et sport",
        video:"video.mpg",
        documents:[
            "charte.pdf"
        ],
        liens:[
            {
                url:"http://www.ressources.com",
                descriptif:"Toutes les ressoures utiles"
            }
        ]
      },
      {
          id:2,
          nom:"ressource 2",
          categorie:"Ateliers cuisine",
          video:"ressource1.mp4",
          documents:[],
          liens:[
              {
                  url:"http://www.cuisinefacile.com",
                  descriptif:"Nos publications"
              }
          ]
      },
      {
          id:3,
          nom:"Y a plus qu'à",
          categorie:"Activité musique",
          video:"video.mpg",
          documents:[],
          liens:[
              {
                  url:"http://www.yaplusqua.com",
                  descriptif:"réesau des yaplusqua"
              }
          ]
      }
    ]
  
  ;

  
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
      },
      edit(state, action){
        console.log("[ressourcesReducer] edit");
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.map((res,i) => {
          console.log("[ressourcesReducer] res.id : "+res.id+" action.payload.id :"+action.payload.id)
          if(res.id === action.payload.id){
            state.splice(i,1,action.payload);
          }
        });
      },
      del(state, action){
        state.map((res,i) => {
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