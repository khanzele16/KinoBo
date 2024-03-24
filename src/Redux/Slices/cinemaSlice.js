import axios from 'axios'
import { config } from './mainSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const pages = 50

export const fetchFilms = createAsyncThunk(
	'films/fetchFilms',
	async ({ page, category, sort }) => {
		const { data } = await axios.get(
			`https://api.kinopoisk.dev/v1.4/movie?page=${
				page > pages ? 1 : page
			}&limit=72&selectFields=genres&selectFields=id&selectFields=name&selectFields=poster&${
				category == 'rating'
					? 'sortField=rating.kp&sortType=-1'
					: category == '-rating'
					? 'sortField=rating.kp&sortType=1'
					: category == 'date'
					? 'sortField=year&sortType=-1'
					: 'sortField=year&sortType=1'
			}&selectFields=year&selectFields=rating&selectFields=ageRating${
				sort == 'всё'
					? '&genres.name=%21мультфильм&genres.name=%21для взрослых&genres.name=%21документальный&genres.name=%21мюзикл&genres.name=%21реальное ТВ&genres.name=%21музыка&genres.name=%21спорт&genres.name=%21концерт'
					: `&genres.name=${sort}`
			}&rating.kp=3-10&type=movie&notNullFields=name&notNullFields=year&notNullFields=alternativeName&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url&isSeries=false`,
			config
		)
		return data
	}
)

const initialState = {
	films: {
		data: null,
		info: {
			page: 1,
			pages: null,
		},
		status: 'loading',
	},
}

const cinemaSlice = createSlice({
	name: 'cinema',
	initialState,
	reducers: {
		changePage(state, action) {
			state.films.info.page = action.payload
		},
	},
	extraReducers: {
		[fetchFilms.pending](state) {
			state.films.data = null
			state.films.info.pages = null
			state.films.status = 'loading'
		},
		[fetchFilms.fulfilled](state, action) {
			state.films.data = action.payload.docs
			state.films.info.pages = action.payload.pages
			state.films.status = 'loaded'
		},
		[fetchFilms.rejected](state) {
			state.films.data = null
			state.films.info.pages = null
			state.films.status = 'error'
		},
	},
})

export const { changePage, selectFilters } = cinemaSlice.actions
export default cinemaSlice.reducer
