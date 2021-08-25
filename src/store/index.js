import { configureStore } from '@reduxjs/toolkit';
import ressourcesSlice from "../reducers/ressourcesReducer";
import filterReducer from "../reducers/filterReducer";
import categoriesSlice from '../reducers/categoriesReducer';

export default configureStore({
    reducer: {
      ressources: ressourcesSlice,
      categories : categoriesSlice,
      filter: filterReducer,
    }
  });