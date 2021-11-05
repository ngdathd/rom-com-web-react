import { configureStore } from "@reduxjs/toolkit";
import favoriteTitleReducer from 'slices/title';

const rootReducer = {
	favoriteTitles: favoriteTitleReducer,
}

const store = configureStore({
  reducer: rootReducer,
});

export default store;