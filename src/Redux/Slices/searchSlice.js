import axios from 'axios'
import { config } from './mainSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const sortRating = (el_1, el_2) => {
	if (el_1.rating.kp >= el_2.rating.kp) return -1
	if (el_1.rating.kp < el_2.rating.kp) return 1
}

export const fetchSearch = createAsyncThunk(
	'data/fetchSearch',
	async params => {
		const { data } = await axios.get(
			`https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=15&query=${params}`,
			config
		)
		return data?.docs?.sort(sortRating).filter(el => el.poster.url).filter(el => el.name)
	}
)

const initialState = {
	data: null,
	status: 'loading',
}

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		clearData(state) {
			state.data = null
			state.status = 'loading'
		},
	},
	extraReducers: {
		[fetchSearch.pending](state) {
			state.data = null
			state.status = 'loading'
		},
		[fetchSearch.fulfilled](state, action) {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchSearch.rejected](state) {
			state.data = []
			state.status = 'error'
		},
	},
})

export const { clearData } = searchSlice.actions
export default searchSlice.reducer
