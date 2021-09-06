import { createSlice } from '@reduxjs/toolkit';
import { Categorie } from '../model/Categorie';

const initialState : Categorie[] = [
    {
        id:1,
        nom:"Tutos bien-être et sport",
        ages:["4-10 ans", "Parents / Aidants"],
        supprimable:false
    },
    {
        id:2,
        nom:"Activités manuelles et créatives",
        ages:["15-25 ans" , "Parents / Aidants"],
        supprimable:true
    },
    {
        id:3,
        nom:"Ateliers cuisine",
        ages:["4-10 ans" ,"11-15 ans"],
        supprimable:true
    },
    {
        id:4,
        nom:"L’ENVOL en scène",
        ages:["15-25 ans"],
        supprimable:true
    },
    {
        id:5,
        nom:"Activité musique",
        ages:["4-10 ans","11-15 ans", "Parents / Aidants"],
        supprimable:false
    },
    {
        id:6,
        nom:"Activités bande-dessinée",
        ages:["15-25 ans"],
        supprimable:true
    },
    {
        id:7,
        nom:"Contes et histoires",
        ages:["4-10 ans", "11-15 ans" , "Parents / Aidants"],
        supprimable:true
    },
    {
        id:8,
        nom:"Challenges",
        ages:["15-25 ans"],
        supprimable:true
    }
]


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        init(state):void {
            const categorieApi = fetch("ressources.json")
                .then(response => response.json())
                .then(data => {
                  state = data;
                });
          },
          add(state, action):void {
            console.log("[categoriesReducer] add ");
            state.push(action.payload);
          },
          edit(state, action):void{
            console.log("[categoriesReducer] edit");
            state.map((cat:Categorie,i:number) => {
              if(cat.id === action.payload.id){
                state.splice(i,1,action.payload);
                return true;
              }
            });
          },
          del(state, action):void{
            console.log("[categoriesReducer] delete ",action.payload);
            state.map((cat:Categorie,i:number) => {
              if(cat.id === action.payload){
                state.splice(i,1);
              }
            });
          }
    }
})

export const { init, add, edit, del } = categoriesSlice.actions;
export default categoriesSlice.reducer;