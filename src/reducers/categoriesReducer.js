import { createSlice } from '@reduxjs/toolkit';


const initialState : Array = [
    {
        "id":"1",
        "nom":"Tutos bien-être et sport",
        "ages":[
            {
                "age":"4-10 ans"
            },
            {
                "age":"Parents / Aidants"
            }
        ],
        "supprimable":false
    },
    {
        "id":"2",
        "nom":"Activités manuelles et créatives",
        "ages":[
            {
                "age":"15-25 ans"
            },
            {
                "age":"Parents / Aidants"
            }
        ],
        "supprimable":true
    },
    {
        "id":"3",
        "nom":"Ateliers cuisine",
        "ages":[
            {
                "age":"4-10 ans"
            },
            {
                "age":"11-15 ans"
            }
        ],
        "supprimable":true
    },
    {
        "id":"4",
        "nom":"L’ENVOL en scène",
        "ages":[
            {
                "age":"15-25 ans"
            }
        ],
        "supprimable":true
    },
    {
        "id":"5",
        "nom":"Activité musique",
        "ages":[
            {
                "age":"4-10 ans"
            },
            {
                "age":"11-15 ans"
            },
            {
                "age":"Parents / Aidants"
            }
        ],
        "supprimable":false
    },
    {
        "id":"6",
        "nom":"Activités bande-dessinée",
        "ages":[
            {
                "age":"15-25 ans"
            }
        ],
        "supprimable":true
    },
    {
        "id":"7",
        "nom":"Contes et histoires",
        "ages":[
            {
                "age":"4-10 ans"
            },
            {
                "age":"11-15 ans"
            },
            {
                "age":"Parents / Aidants"
            }
        ],
        "supprimable":true
    },
    {
        "id":"8",
        "nom":"Challenges",
        "ages":[
            {
                "age":"15-25 ans"
            }
        ],
        "supprimable":true
    }
]


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        init(state) {
            const categorieApi = fetch("ressources.json")
                .then(response => response.json())
                .then(data => {
                  state.value = categorieApi;
                });
          },
          add(state, action) {
            console.log("[categoriesReducer] add ");
            state.push(action.payload);
          },
          edit(state, action){
            console.log("[categoriesReducer] edit");
            state.map((cat,i) => {
              if(cat.id === action.payload.id){
                state.splice(i,1,action.payload);
                return true;
              }
            });
          },
          del(state, action){
            console.log("[categoriesReducer] delete ",action.payload);
            state.map((cat,i) => {
              if(cat.id === action.payload){
                state.splice(i,1);
                return true;
              }
            });
          }
    }
})

export const { init, add, edit, del } = categoriesSlice.actions;
export default categoriesSlice.reducer;