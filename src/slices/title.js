import { createSlice } from '@reduxjs/toolkit';

const locallFavoriteTitles = localStorage.getItem('favoriteTitles');


const favoriteTitles = createSlice({
	name: 'favoriteTitles',
	initialState: locallFavoriteTitles ? locallFavoriteTitles.split(";") : [],
	reducers: {
		toggleFavoriteTitle: (state, action) => {
			if (state.includes(action.payload))
				return state.filter(id => id !== action.payload);
			else state.push(action.payload);
		}
	}
});

const { reducer, actions } = favoriteTitles;
export const { toggleFavoriteTitle } = actions;
export default reducer;