import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changePage } from './../../Redux/Slices/cinemaSlice'
import ReactPaginate from 'react-paginate'
import './Pagination.css'

function Pagination({ pages }) {
	const dispatch = useDispatch()
	const currentPage = useSelector(state => state.cinema.films.info.page)
	return (
		<ReactPaginate
			containerClassName='Pagination'
			activeClassName={'active'}
			onPageChange={event => dispatch(changePage(event.selected + 1))}
			forcePage={currentPage > pages ? 0 : currentPage - 1}
			pageCount={pages}
			breakLabel='...'
			previousLabel='<'
			nextLabel='>'
			renderOnZeroPageCount={null}
		/>
	)
}

export default Pagination
