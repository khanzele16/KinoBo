import React from 'react'
import SPost from '../Posts/SPost/SPost'
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { clearData, fetchSearch } from '../../Redux/Slices/searchSlice'
import './Header.css'
import ContentLoader from 'react-content-loader'

const catalogHeader = [
	{ name: 'Главная', path: 'main' },
	{ name: 'Кинотеатр', path: 'cinema' },
	{ name: 'Подборки', path: 'playlists' },
]

export default function Header() {
	const screen = window.screen.availWidth
	const [isSearch, setIsSearch] = React.useState(false)
	const [valueText, setValueText] = React.useState('')
	const [openModal, setOpenModal] = React.useState(false)
	const searchData = useSelector(state => state.search.data)
	const status = useSelector(state => state.search.status)
	const searchInput = React.useRef()
	const inputRef = React.useRef()
	const dispatch = useDispatch()
	const loading = (
		<ContentLoader
			speed={2}
			width={
				screen <= 1300 ? 290 : screen <= 1500 ? 420 : screen <= 1650 ? 452 : 575
			}
			height={90}
			viewBox={`0 0 ${
				screen <= 1300 ? 290 : screen <= 1500 ? 420 : screen <= 1650 ? 452 : 575
			} 90`}
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
		>
			<rect x='15' y='7' rx='2' ry='2' width='50' height='75' />
			<rect
				x='75'
				y='15'
				rx='0'
				ry='0'
				width={
					screen <= 1300
						? 150
						: screen <= 1500
						? 240
						: screen <= 1650
						? 260
						: 380
				}
				height='12'
			/>
			<rect
				x='75'
				y='40'
				rx='0'
				ry='0'
				width={screen <= 1300 ? 100 : 225}
				height='12'
			/>
			<rect
				x={
					screen <= 1300
						? 250
						: screen <= 1500
						? 375
						: screen <= 1650
						? 400
						: 520
				}
				y='35'
				rx='2'
				ry='2'
				width={screen <= 1500 ? 26 : 30}
				height={screen <= 1500 ? 18 : 20}
			/>
		</ContentLoader>
	)
	const searchFetch = React.useCallback(
		debounce(async params => {
			await dispatch(fetchSearch(params))
		}, 800),
		[]
	)
	const changeInput = event => {
		setValueText(event.target.value)
		searchFetch(event.target.value)
	}
	React.useEffect(() => {
		if (valueText == '') {
			dispatch(clearData())
		}
	}, [valueText])
	React.useEffect(() => {
		if (!isSearch) {
			setValueText('')
			dispatch(clearData())
		}
	}, [isSearch])
	React.useEffect(() => {
		const handleClickListener = event => {
			if (!event.composedPath().includes(searchInput.current)) {
				setIsSearch(false)
				dispatch(clearData())
			}
		}
		document.body.addEventListener('click', handleClickListener)
		return () => document.body.removeEventListener('click', handleClickListener)
	}, [])
	return (
		<>
			<div className='Header-title'>
				<NavLink className='Header-title-navlink' to='/main'>
					<img src='https://i.ibb.co/ZxS12Cv/logo.jpg' alt='' />
					<h1>KinoBo</h1>
				</NavLink>
			</div>
			<ul className='Header-catalog'>
				{catalogHeader.map((el, index) => (
					<NavLink
						key={index}
						className={({ isActive }) => (isActive ? 'active' : '')}
						to={`/${el.path}`}
					>
						<li>{el.name}</li>
					</NavLink>
				))}
			</ul>
			{isSearch ? (
				<div className='Header-search' ref={searchInput}>
					<div className='Header-search-inner'>
						<svg
							id='search-icon'
							xmlns='http://www.w3.org/2000/svg'
							version='1.1'
							viewBox='0 0 56.966 56.966'
							onClick={() => setIsSearch(false)}
						>
							<g>
								<path
									d='M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'
									opacity='1'
								></path>
							</g>
						</svg>
						<input
							value={valueText}
							ref={inputRef}
							onChange={changeInput}
							type='text'
							placeholder='Поиск по фильмам, сериалам...'
						/>
						{valueText && (
							<svg
								onClick={() => {
									setValueText('')
									inputRef.current.focus()
								}}
								xmlns='http://www.w3.org/2000/svg'
								version='1.1'
								id='header-x'
								viewBox='0 0 320.591 320.591'
								fill='b5b5b5'
							>
								<g>
									<path
										d='M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z'
										opacity='1'
									></path>
									<path
										d='M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z'
										opacity='1'
									></path>
								</g>
							</svg>
						)}
					</div>
					{valueText && (
						<ul className='Header-search-catalog'>
							{status == 'loaded' && searchData.length == 0 && (
								<li id='header-empty'>
									<p>Не нашли фильмы по вашему запросу</p>
								</li>
							)}
							{status == 'loading' &&
								[...new Array(8)].map((el, index) => (
									<li key={index}>{loading}</li>
								))}
							{status == 'loaded' &&
								searchData?.map((el, index) => (
									<NavLink key={index} to={`/film/${el.id}`}>
										<li>
											<SPost {...el} />
										</li>
									</NavLink>
								))}
						</ul>
					)}
				</div>
			) : (
				<div className='Header-search-button'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						version='1.1'
						viewBox='0 0 56.966 56.966'
						onClick={() => setIsSearch(true)}
					>
						<g>
							<path
								d='M55.146 51.887 41.588 37.786A22.926 22.926 0 0 0 46.984 23c0-12.682-10.318-23-23-23s-23 10.318-23 23 10.318 23 23 23c4.761 0 9.298-1.436 13.177-4.162l13.661 14.208c.571.593 1.339.92 2.162.92.779 0 1.518-.297 2.079-.837a3.004 3.004 0 0 0 .083-4.242zM23.984 6c9.374 0 17 7.626 17 17s-7.626 17-17 17-17-7.626-17-17 7.626-17 17-17z'
								opacity='1'
							></path>
						</g>
					</svg>
				</div>
			)}
			<div className='Header-buttons'>
				<button id='theme'>
					<img src='https://i.ibb.co/B6s7PS0/black-theme.png' alt='' />
				</button>
				<div className='Header-authorization'>
					<button id='Login'>Войти</button>
				</div>
				{
					<div className='Header-burger'>
						<button onClick={() => setOpenModal(!openModal)} id='burger-menu'>
							<img src='https://i.ibb.co/3BGJtVs/more.png' alt='' />
						</button>
						{openModal && (
							<ul className='Header-menu'>
								{catalogHeader.map((el, index) => (
									<NavLink to={`/${el.path}`} key={index}>
										<li>{el.name}</li>
									</NavLink>
								))}
							</ul>
						)}
					</div>
				}
			</div>
		</>
	)
}
