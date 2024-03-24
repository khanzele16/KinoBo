import React from 'react'
import './Cinema.css'
import { NavLink } from 'react-router-dom'

const categories = [
	{
		imgUrl: 'https://i.ibb.co/8XFKtyW/films-Kino.jpg',
		path: 'films',
	},
	{
		imgUrl: 'https://i.ibb.co/ydS2GGP/serials-Kino.jpg',
		path: 'serials',
	},
	{
		imgUrl: 'https://i.ibb.co/djHgBxk/mults-Kino.jpg',
		path: 'multfilms',
	},
]

function Cinema() {
	return (
		<div className='Cinema'>
			<h2>Кинотеатр</h2>
			<ul className='Cinema-content'>
				{categories.map((el, index) => (
					<NavLink to={`./${el.path}`}>
						<li key={index}>
							<img src={el.imgUrl} alt='' />
						</li>
					</NavLink>
				))}
			</ul>
		</div>
	)
}

export default Cinema
