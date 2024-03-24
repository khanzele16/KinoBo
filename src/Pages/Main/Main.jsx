import React from 'react'
import './Main.css'
import {
	fetchBestFilms,
	fetchNewFilms,
	fetchSerials,
	fetchSlider,
} from '../../Redux/Slices/mainSlice'
import { useDispatch, useSelector } from 'react-redux'
import Preview from '../../Components/Posts/PreviewPost/Preview'
import ContentLoader from 'react-content-loader'
import { NavLink } from 'react-router-dom'
import SLPost from '../../Components/Posts/SLPost/SLPost'

const loadFilmCard = [...new Array(24)]
const screen = window.screen.availWidth

export default function Main() {
	const screen = window.screen.availWidth
	const dispatch = useDispatch()
	const main = useSelector(state => state.main.main)
	const loading = (
		<ContentLoader
			speed={2}
			width={
				screen <= 450
					? 100
					: screen <= 600
					? 120
					: screen <= 1050
					? 140
					: screen <= 1300
					? 160
					: screen > 1300 && 200
			}
			height={
				screen <= 450
					? 170
					: screen <= 600
					? 190
					: screen <= 1050
					? 220
					: screen <= 1300
					? 260
					: screen > 1300 && 350
			}
			viewBox={`0 0 ${
				screen <= 450
					? 100
					: screen <= 600
					? 120
					: screen <= 1050
					? 140
					: screen <= 1300
					? 160
					: screen > 1300 && 200
			} ${
				screen <= 450
					? 170
					: screen <= 600
					? 190
					: screen <= 1050
					? 220
					: screen <= 1300
					? 260
					: screen > 1300 && 350
			}`}
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
		>
			<rect x='5' y='10' rx='0' ry='0' width={'190'} height='280' />
			<rect x='5' y='295' rx='0' ry='0' width='190' height='12' />
			<rect x='5' y='315' rx='0' ry='0' width='140' height='12' />
		</ContentLoader>
	)
	React.useEffect(() => {
		dispatch(fetchNewFilms())
		dispatch(fetchBestFilms())
		dispatch(fetchSerials())
		dispatch(fetchSlider())
	}, [])

	return (
		<div className='Main'>
			<ul className='Main-slider'>
				{main.sliderData.data.map((el, index) => (
					<li><SLPost {...el} /></li>
				))}
			</ul>
			<div className='Main-new'>
				<div className='Main-new-title'>
					<h2>Новинки</h2>
					<div className='Main-new-title-next'>
						<NavLink to='http://localhost:3000/cinema/films?sort=всё&category=rating&page=1'>
							Открыть полностью
						</NavLink>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
							viewBox='0 0 6.35 6.35'
						>
							<g>
								<path
									d='M2.258 1.315a.265.265 0 0 0-.174.469L3.703 3.17l-1.62 1.386a.265.265 0 1 0 .345.4L4.28 3.373a.265.265 0 0 0 0-.403L2.428 1.382a.265.265 0 0 0-.17-.067z'
									opacity='1'
								></path>
							</g>
						</svg>
					</div>
				</div>
				<ul
					id={
						main.newData.status == 'loaded' &&
						!main.newData.data &&
						'empty-catalog'
					}
					className='Main-new-catalog'
				>
					{main.newData.status == 'loading' &&
						loadFilmCard.map((el, index) => <li key={index}>{loading}</li>)}
					{main.newData.status == 'loaded' &&
						main.newData.data?.map((el, index) => (
							<NavLink to={`/film/${el.id}`} key={index}>
								<li className='film-card'>
									<Preview {...el} />
								</li>
							</NavLink>
						))}
					{main.newData.status == 'loaded' && !main.newData.data && (
						<div className='Main-error-loading'>
							<h3>Ошибка 400</h3>
							<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
						</div>
					)}
					{main.newData.status == 'error' && (
						<div className='Main-error-loading'>
							<h3>Ошибка 400</h3>
							<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
						</div>
					)}
				</ul>
			</div>
			<div className='Main-best'>
				<div className='Main-best-title'>
					<h2>Лучшее</h2>
					<div className='Main-best-title-next'>
						<NavLink to='http://localhost:3000/cinema/films?sort=всё&category=rating&page=1'>
							Открыть полностью
						</NavLink>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
							viewBox='0 0 6.35 6.35'
						>
							<g>
								<path
									d='M2.258 1.315a.265.265 0 0 0-.174.469L3.703 3.17l-1.62 1.386a.265.265 0 1 0 .345.4L4.28 3.373a.265.265 0 0 0 0-.403L2.428 1.382a.265.265 0 0 0-.17-.067z'
									opacity='1'
								></path>
							</g>
						</svg>
					</div>
				</div>
				<ul
					id={
						main.bestData.status == 'loaded' &&
						!main.bestData.data &&
						'empty-catalog'
					}
					className='Main-best-catalog'
				>
					{main.bestData.status == 'loading' &&
						loadFilmCard.map((el, index) => <li key={index}>{loading}</li>)}
					{main.bestData.status == 'loaded' &&
						main.bestData.data?.map((el, index) => (
							<NavLink to={`/film/${el.id}`} key={index}>
								<li className='film-card'>
									<Preview {...el} />
								</li>
							</NavLink>
						))}
					{main.bestData.status == 'loaded' && !main.bestData.data && (
						<div className='Main-error-loading'>
							<h3>Ошибка 400</h3>
							<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
						</div>
					)}
					{main.bestData.status == 'error' && (
						<div className='Main-error-loading'>
							<h3>Ошибка 400</h3>
							<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
						</div>
					)}
				</ul>
			</div>
			<div className='Main-serials'>
				<div className='Main-serials-title'>
					<h2>Сериалы</h2>
					<div className='Main-serials-title-next'>
						<NavLink to=''>Открыть полностью</NavLink>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
							viewBox='0 0 6.35 6.35'
						>
							<g>
								<path
									d='M2.258 1.315a.265.265 0 0 0-.174.469L3.703 3.17l-1.62 1.386a.265.265 0 1 0 .345.4L4.28 3.373a.265.265 0 0 0 0-.403L2.428 1.382a.265.265 0 0 0-.17-.067z'
									opacity='1'
								></path>
							</g>
						</svg>
					</div>
				</div>
				<ul
					id={
						main.serialData.status == 'loaded' &&
						!main.serialData.data &&
						'empty-catalog'
					}
					className='Main-serials-catalog'
				>
					{main.serialData.status == 'loading' &&
						loadFilmCard.map((el, index) => <li key={index}>{loading}</li>)}
					{main.serialData.status == 'loaded' &&
						main.serialData.data?.map((el, index) => (
							<NavLink to={`/serial/${el.id}`} key={index}>
								<li className='film-card'>
									<Preview {...el} />
								</li>
							</NavLink>
						))}
					{main.serialData.status == 'loaded' && !main.serialData.data && (
						<div className='Main-error-loading'>
							<h3>Ошибка 400</h3>
							<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
						</div>
					)}
					{main.serialData.status == 'error' && (
						<div className='Main-error-loading'>
							<h3>Ошибка 400</h3>
							<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
						</div>
					)}
				</ul>
			</div>
		</div>
	)
}
