import React from 'react'
import './SPost.css'
import { NavLink } from 'react-router-dom'

function SPost({ ...el }) {
	return (
		<div className='SPost'>
			<div className='SPost-image'>
				<img
					src={
						!el.poster.previewUrl
							? 'https://i.ibb.co/LY8zffQ/kino.jpg'
							: el.poster.previewUrl
					}
					alt=''
				/>
			</div>
			<div className='SPost-description'>
				<p id='spost-title'>
					{el.name
						? el.name.length >= 30
							? el.name.substring(0, 30) + '...'
							: el.name
						: 'Неизвестно'}
				</p>
				<p id='spost-enTitle'>
					{el.alternativeName
						? el.alternativeName.length >= 30
							? el.alternativeName.substring(0, 30) + '...'
							: el.alternativeName
						: ''}
				</p>
				<p id='spost-about'>{`${el.year}, ${
					!el.genres ? '' : el.genres[0]?.name
				}${
					el.seasonsInfo
						? `, ${el.seasonsInfo.length} сезон${
								el.seasonsInfo.length == 1
									? ''
									: el.seasonsInfo.length <= 4
									? 'а'
									: 'ов'
						  }`
						: ''
				}${el.ageRating ? `, ${el.ageRating}+` : ''}`}</p>
			</div>
			<div className='SPost-rating'>
				<p
					style={
						el.rating.kp <= 5
							? { backgroundColor: 'red' }
							: el.rating.kp <= 7
							? { backgroundColor: '#777' }
							: { backgroundColor: '#3bb33b' }
					}
					id='spost-rating'
				>
					{el.rating.kp.toString().substring(0, 3)}
				</p>
			</div>
		</div>
	)
}

export default SPost
