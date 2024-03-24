import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovie } from '../../../Redux/Slices/movieSlice'
import './FullPost.css'

function FullPost() {
	const [movieId, setMovieId] = React.useState(
		window.location.pathname.split('/')[2]
	)
	const movie = useSelector(state => state.movie.data)
	const dispatch = useDispatch()
	React.useEffect(() => {
		dispatch(fetchMovie(movieId))
		console.log('запрос')
	}, [movieId])
	return (
		<div className='FullPost'>
			<div className='FullPost-posters'>
				<img id='poster' src={movie?.poster?.url} />
				<div className='FullPost-posters-catalog'></div>
			</div>
			<div className='FullPost-content'>
				<div className='FullPost-content-title'>
					<h2>
						{movie?.name} <span id='year'>({movie?.year})</span>
					</h2>
				</div>
				<div className='FullPost-content-another'>
					<p>
						<span id='alternativeName'>{movie?.alternativeName}</span>
						<span id='ageRating'>+{movie?.ageRating}</span>
					</p>
				</div>
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
			</div>
		</div>
	)
}

export default FullPost
