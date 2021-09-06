import { createSlice } from '@reduxjs/toolkit';
import { filtreInterface } from "../model/Filtre";


let initialState : filtreInterface = {mots:"",ages:[],categories:[]};;  
export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    newFilter(state, action){
      state.ages = action.payload.ages;
      state.categories = action.payload.categories;
      state.mots = action.payload.mots;
    }
  }
});
  
export const { newFilter } = filterSlice.actions;
export default filterSlice.reducer;