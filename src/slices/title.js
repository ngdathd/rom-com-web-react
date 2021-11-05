import { createSlice } from '@reduxjs/toolkit';

const favoriteTitles = createSlice({
	name: 'favoriteTitles',
	initialState: [],
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