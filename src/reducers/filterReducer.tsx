
import { Age } from "../model/Categorie";

export interface FilterState {
  searchTerm:string,
  ages:Age[],
  categories:string[]
};

const INITIAL_STATE : FilterState = {
    searchTerm: '',
    ages:[],
    categories:[]
  };
  
  function filterReducer(state = INITIAL_STATE, action:any) {
    switch (action.type) {
      case 'FILTER_SET':
        return { ...state, 
            searchTerm: action.searchTerm,
            ages: action.ages,
            categories: action.categories
         };
      default: return state;
    }
  }
  
  export default filterReducer;