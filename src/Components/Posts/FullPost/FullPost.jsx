import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie } from '../../../Redux/Slices/movieSlice'
import './FullPost.css'
import { useLocation } from 'react-router-dom'

const aboutCatalog = [
	{ name: 'Год производства', params: 'year', repeat: false },
	{ name: 'Страна', params: 'country', repeat: false },
	{ name: 'Жанры', params: 'genres', repeat: true },
	{ name: 'Слоган', params: 'slogan', repeat: false },
	{ name: 'Жанры', params: 'genres', repeat: true },
]

function FullPost() {
	const movieId = window.location.pathname.split('/')[2]
	const location = useLocation()
	const movie = useSelector(state => state.movie.data)
	const dispatch = useDispatch()
	React.useEffect(() => {
		dispatch(fetchMovie(movieId))
	}, [location.pathname])
	return (
		<div className='FullPost'>
			<div className='FullPost-posters'>
				<img id='poster' src={movie?.poster?.url} />
				<source src={movie?.videos?.trailers[0]} />
			</div>
			<div className='FullPost-content'>
				<div className='FullPost-content-title'>
					<h2>
						{movie?.name} <span id='year'>({movie?.year})</span>
					</h2>
				</div>
				<div className='FullPost-content-another'>
					<p id={movie?.alternativeName ? 'content-another-alternative' : ''}>
						{movie?.alternativeName ? (
							<span id='alternativeName'>{movie?.alternativeName}</span>
						) : (
							''
						)}
						{movie?.ageRating ? (
							<span id='ageRating'>+{movie?.ageRating}</span>
						) : (
							''
						)}
					</p>
				</div>
				<div className='FullPost-content-description'>
					<p>{movie?.description}</p>
				</div>
				<div className='FullPost-content-menu'>
					<button id='willwatched'>
						<img
							src='https://cdn-icons-png.freepik.com/512/6051/6051803.png?ga=GA1.1.284028482.1708527081&'
							alt=''
						/>
						Буду смотреть
					</button>
					<button id='points'>
						<img
							src='https://cdn-icons-png.flaticon.com/512/1828/1828805.png'
							alt=''
						/>
					</button>
				</div>
				<ul className='FullPost-content-about'>
					{aboutCatalog.map((el, index) => (
						<li>
							<span>{el.name}</span>
						</li>
					))}
				</ul>
			</div>
			<div className='FullPost-info'>
				<p
					style={
						movie?.rating?.kp <= 5
							? { color: 'red' }
							: movie?.rating?.kp <= 7
							? { color: '#777' }
							: { color: '#3bb33b' }
					}
					id='rating'
				>
					{movie?.rating?.kp.toString().substring(0, 3)}
				</p>
				<p id='rating-votes'>{movie?.votes?.kp} оценка</p>
				<button id='rating-btn'>Оценить фильм</button>
			</div>
		</div>
	)
}

export default FullPost
