
export interface FilterState {
  value: Object
};

const INITIAL_STATE : FilterState = {
    searchTerm: '',
    ages:[],
    categories:[]
  };
  
  function filterReducer(state = INITIAL_STATE, action) {
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