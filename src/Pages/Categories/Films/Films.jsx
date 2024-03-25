import React from 'react'
import './Films.css'
import { useDispatch, useSelector } from 'react-redux'
import Preview from '../../../Components/Posts/PreviewPost/Preview'
import ContentLoader from 'react-content-loader'
import { changePage, fetchFilms } from '../../../Redux/Slices/cinemaSlice'
import Pagination from '../../../Components/Pagination/Pagination'
import qs from 'qs'
import { NavLink, useNavigate } from 'react-router-dom'

const loadFilmCard = [...new Array(24)]
const sortFilm = [
	'всё',
	'комедия',
	'триллер',
	'фантастика',
	'фэнтези',
	'военный',
	'ужасы',
	'боевик',
	'драма',
	'криминал',
	'биография',
	'детектив',
	'история',
	'семейный',
	'мелодрама',
]
const categoryFilm = [
	{ name: 'По рейтингу (по убыванию)', property: 'rating' },
	{ name: 'По рейтингу (по возрастанию)', property: '-rating' },
	{ name: 'По дате выхода (по убыванию)', property: 'date' },
	{ name: 'По дате выхода (по возрастанию)', property: '-date' },
]
const screen = window.screen.availWidth

function Films() {
	const navigate = useNavigate()
	const [sortContext, setSortContext] = React.useState('всё')
	const [categoryContext, setCategoryContext] = React.useState('rating')
	const currentPage = useSelector(state => state.cinema.films.info.page)
	const dispatch = useDispatch()
	const isMounted = React.useRef(false)
	const isSearch = React.useRef(false)
	const films = useSelector(state => state.cinema.films)
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
			<rect
				x='5'
				y='10'
				rx='0'
				ry='0'
				width={`${
					screen <= 450
						? 90
						: screen <= 600
						? 110
						: screen <= 1050
						? 130
						: screen <= 1300
						? 150
						: screen > 1300 && 190
				}`}
				height={`${
					screen <= 450
						? 130
						: screen <= 600
						? 150
						: screen <= 1050
						? 180
						: screen <= 1300
						? 220
						: screen > 1300 && 275
				}`}
			/>
			<rect
				x='5'
				y={`${
					screen <= 450
						? 144
						: screen <= 600
						? 164
						: screen <= 1050
						? 194
						: screen <= 1300
						? 234
						: screen > 1300 && 294
				}`}
				rx='0'
				ry='0'
				width={`${
					screen <= 450
						? 90
						: screen <= 600
						? 110
						: screen <= 1050
						? 130
						: screen <= 1300
						? 150
						: screen > 1300 && 190
				}`}
				height={`${
					screen <= 450
						? 8
						: screen <= 600
						? 8
						: screen <= 1050
						? 10
						: screen <= 1300
						? 12
						: screen > 1300 && 12
				}`}
			/>
			<rect
				x='5'
				y={`${
					screen <= 450
						? 156
						: screen <= 600
						? 176
						: screen <= 1050
						? 209
						: screen <= 1300
						? 251
						: screen > 1300 && 316
				}`}
				rx='0'
				ry='0'
				width={`${
					screen <= 450
						? 50
						: screen <= 600
						? 70
						: screen <= 1050
						? 90
						: screen <= 1300
						? 110
						: screen > 1300 && 140
				}`}
				height={`${
					screen <= 450
						? 8
						: screen <= 600
						? 8
						: screen <= 1050
						? 10
						: screen <= 1300
						? 12
						: screen > 1300 && 12
				}`}
			/>
		</ContentLoader>
	)
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1))
			dispatch(
				fetchFilms({
					sort: params.sort ? params.sort : 'всё',
					category: params.category ? params.category : 'rating',
					page: params.page ? params.page : 1,
				})
			)
			setSortContext(params.sort)
			setCategoryContext(params.category)
			dispatch(changePage(params.page))
		} else {
			dispatch(
				fetchFilms({
					sort: 'всё',
					category: 'rating',
					page: 1,
				})
			)
			setSortContext('всё')
			setCategoryContext('rating')
			dispatch(changePage(1))
		}
	}, [])
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sort: sortContext,
				category: categoryContext,
				page: currentPage,
			})
			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [sortContext, categoryContext, currentPage])
	React.useEffect(() => {
		if (isSearch.current) {
			window.scrollTo(0, 0)
			dispatch(
				fetchFilms({
					sort: sortContext ? sortContext : 'всё',
					category: categoryContext ? categoryContext : 'rating',
					page: currentPage ? currentPage : 1,
				})
			)
		}
		isSearch.current = true
	}, [sortContext, categoryContext, currentPage])

	return (
		<div className='Films'>
			<div className='Films-title'>
				<h2>Фильмы</h2>
			</div>
			<nav className='Films-sort'>
				{sortFilm.map((el, index) => (
					<li
						className={sortContext == el ? 'active' : ''}
						onClick={() => {
							setSortContext(el)
						}}
						key={index}
					>
						{el}
					</li>
				))}
			</nav>
			<nav className='Films-category'>
				{categoryFilm.map((el, index) => (
					<li
						className={categoryContext == el.property ? 'active' : ''}
						onClick={() => {
							setCategoryContext(el.property)
						}}
						key={index}
					>
						{el.name}
					</li>
				))}
			</nav>
			<ul className='Films-content'>
				{films.status == 'loading' &&
					loadFilmCard.map((el, index) => <li key={index}>{loading}</li>)}
				{films.status == 'loaded' &&
					films.data?.map((el, index) => (
						<NavLink to={`/film/${el.id}`} key={index}>
							<li className='film-card'>
								<Preview sort={sortContext} {...el} />
							</li>
						</NavLink>
					))}
				{films.status == 'loaded' && !films.data && (
					<div className='Films-error-loading'>
						<h3>Ошибка 400</h3>
						<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
					</div>
				)}
				{films.status == 'error' && (
					<div className='Films-error-loading'>
						<h3>Ошибка 400</h3>
						<p>Проверьте интернет-соединение. Перезагрузите страницу!</p>
					</div>
				)}
			</ul>
			<Pagination pages={films.status == 'loading' ? 0 : films.info.pages} />
		</div>
	)
}

export default Films
