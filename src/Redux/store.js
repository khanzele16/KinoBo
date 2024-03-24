import mainSlice from './Slices/mainSlice'
import headerSlice from './Slices/headerSlice'
import searchSlice from './Slices/searchSlice'
import cinemaSlice from './Slices/cinemaSlice'
import movieSlice from './Slices/movieSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		header: headerSlice,
		main: mainSlice,
		search: searchSlice,
		cinema: cinemaSlice,
		movie: movieSlice,
	},
})
