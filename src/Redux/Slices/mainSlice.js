import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const config = {
	headers: {
		'X-API-KEY': 'AFD6JZ0-9J6MPZF-J69DAAS-WJ9VPMC',
		'Access-Control-Allow-Origin': '*',
	},
}

export const fetchSlider = createAsyncThunk('post/fetchSlider', async () => {
	try {
		const { data } = await axios.get(
			'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=3&selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=shortDescription&selectFields=year&selectFields=rating&selectFields=ageRating&selectFields=genres&selectFields=poster&selectFields=backdrop&selectFields=logo&notNullFields=id&notNullFields=name&notNullFields=enName&notNullFields=alternativeName&notNullFields=shortDescription&notNullFields=year&notNullFields=rating.kp&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url&notNullFields=backdrop.url&notNullFields=logo.url&lists=top250',
			config
		)
		return data?.docs
	} catch (err) {
		console.log(err)
	}
})

export const fetchNewFilms = createAsyncThunk(
	'post/fetchNewFilms',
	async () => {
		try {
			const { data } = await axios.get(
				'https://api.kinopoisk.dev/v1.4/movie?page=1&selectFields=id&limit=24&selectFields=name&selectFields=year&notNullFields=name&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=ageRating&rating.kp=1-10&type=movie&notNullFields=name&notNullFields=year&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url&year=2023-2024&isSeries=false',
				config
			)
			return data?.docs
		} catch (err) {
			console.log(err)
		}
	}
)

export const fetchBestFilms = createAsyncThunk(
	'post/fetchBestFilms',
	async () => {
		try {
			const { data } = await axios.get(
				'https://api.kinopoisk.dev/v1.4/movie?page=1&selectFields=id&limit=24&selectFields=name&selectFields=year&notNullFields=name&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=ageRating&rating.kp=7-10&type=movie&notNullFields=name&notNullFields=year&notNullFields=ageRating&notNullFields=genres.name&notNullFields=poster.url&isSeries=false',
				config
			)
			return data?.docs
		} catch (err) {
			console.log(err)
		}
	}
)

export const fetchSerials = createAsyncThunk('post/fetchSerials', async () => {
	try {
		const { data } = await axios.get(
			'https://api.kinopoisk.dev/v1.4/movie?page=1&selectFields=id&limit=24&selectFields=name&selectFields=year&notNullFields=name&selectFields=rating&selectFields=genres&selectFields=poster&selectFields=seasonsInfo&isSeries=true',
			config
		)
		return data?.docs
	} catch (err) {
		console.log(err)
	}
})

const initialState = {
	main: {
		sliderData: {
			data: [],
			status: 'loading',
		},
		newData: {
			data: [],
			status: 'loading',
		},
		bestData: {
			data: [],
			status: 'loading',
		},
		serialData: {
			data: [],
			status: 'loading',
		},
	},
}

const mainSlice = createSlice({
	name: 'main',
	initialState,
	extraReducers: {
		[fetchSlider.pending](state) {
			state.main.sliderData.data = []
			state.main.sliderData.status = 'loading'
		},
		[fetchSlider.fulfilled](state, action) {
			state.main.sliderData.data = action?.payload
			state.main.sliderData.status = 'loaded'
		},
		[fetchSlider.rejected](state) {
			state.main.sliderData.data = []
			state.main.sliderData.status = 'error'
		},
		[fetchNewFilms.pending](state) {
			state.main.newData.data = []
			state.main.newData.status = 'loading'
		},
		[fetchNewFilms.fulfilled](state, action) {
			state.main.newData.data = action?.payload
			state.main.newData.status = 'loaded'
		},
		[fetchNewFilms.rejected](state) {
			state.main.newData.data = []
			state.main.newData.status = 'error'
		},
		[fetchBestFilms.pending](state) {
			state.main.bestData.data = []
			state.main.bestData.status = 'loading'
		},
		[fetchBestFilms.fulfilled](state, action) {
			state.main.bestData.data = action?.payload
			state.main.bestData.status = 'loaded'
		},
		[fetchBestFilms.rejected](state) {
			state.main.bestData.data = []
			state.main.bestData.status = 'error'
		},
		[fetchSerials.pending](state) {
			state.main.serialData.data = []
			state.main.serialData.status = 'loading'
		},
		[fetchSerials.fulfilled](state, action) {
			state.main.serialData.data = action?.payload
			state.main.serialData.status = 'loaded'
		},
		[fetchSerials.rejected](state) {
			state.main.serialData.data = []
			state.main.serialData.status = 'error'
		},
	},
})

export default mainSlice.reducer
