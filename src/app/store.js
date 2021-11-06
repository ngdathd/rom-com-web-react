import { configureStore } from "@reduxjs/toolkit";
import favoriteTitleReducer from 'slices/title';

const rootReducer = {
	favoriteTitles: favoriteTitleReducer,
}


const localStorageMiddleware = ({ getState }) => { // <--- FOCUS HERE
	return (next) => (action) => {
		const result = next(action);
		if (action.type?.startsWith('favoriteTitles/')) {
			localStorage.setItem('favoriteTitles', 
				getState().favoriteTitles.join(";"));
		}
		return result;
	};
};

const store = configureStore({
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(localStorageMiddleware),
	reducer: rootReducer,
});

export default store;