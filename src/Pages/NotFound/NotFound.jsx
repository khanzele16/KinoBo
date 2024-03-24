import React from 'react'
import './NotFound.css'

export default function NotFound() {
	return (
		<div className='NotFound'>
			<div className='NotFound-description'>
				<p id='error'>Ошибка 404.</p>
				<p id='error-banner'>Данной страницы не существует.</p>
			</div>
			<img
				src='https://cdn-icons-png.flaticon.com/512/3585/3585596.png'
				alt=''
			/>
		</div>
	)
}
