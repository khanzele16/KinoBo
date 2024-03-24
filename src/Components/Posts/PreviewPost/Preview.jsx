import React from 'react'
import './Preview.css'

const Preview = props => {
	return (
		<div className='Preview'>
			<div className='Preview-image'>
				<img
					id='preview-img'
					src={
						!props.poster.previewUrl
							? 'https://i.ibb.co/LY8zffQ/kino.jpg'
							: props.poster.previewUrl
					}
					alt=''
				/>
			</div>
			<div className='Preview-rating'>
				<p
					style={
						props.rating.kp <= 5
							? { backgroundColor: 'red' }
							: props.rating.kp <= 7
							? { backgroundColor: '#777' }
							: { backgroundColor: '#3bb33b' }
					}
					id='preview-rating'
				>
					{props.rating.kp.toString().substring(0, 3)}
				</p>
			</div>
			<div className='Preview-description'>
				<p id='preview-title'>
					{props.name
						? props.name.length >= 17
							? props.name.substring(0, 17) + '...'
							: props.name
						: 'Неизвестно'}
				</p>
				<p id='preview-info'>
					{props?.category
						? props?.category == 'всё'
							? `${props.year}, ${props.genres[0]?.name}`
							: `${props.year}, ${props?.category}`
						: `${props.year}, ${props.genres[0]?.name}`}
					{props.seasonsInfo
						? `, ${props.seasonsInfo.length} сезон${
								props.seasonsInfo.length == 1
									? ''
									: props.seasonsInfo.length <= 4
									? 'а'
									: 'ов'
						  }`
						: ''}
					{props.ageRating ? `, ${props.ageRating}+` : ''}
				</p>
			</div>
		</div>
	)
}

export default Preview
