import axios from 'axios'
import { config } from './mainSlice'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovie = createAsyncThunk('data/fetchMovie', async movieId => {
	const { data } = await axios.get(
		`https://api.kinopoisk.dev/v1.4/movie/${movieId}`,
		config
	)
	return data
})

const initialState = {
	data: null,
	status: 'loading',
}

const movieSlice = createSlice({
	name: 'film',
	initialState,
	extraReducers: {
		[fetchMovie.pending](state) {
			state.data = null
			state.status = 'loading'
		},
		[fetchMovie.fulfilled](state, action) {
			state.data = action.payload
			state.status = 'loaded'
		},
		[fetchMovie.rejected](state) {
			state.data = []
			state.status = 'error'
		},
	},
})

export default movieSlice.reducer
