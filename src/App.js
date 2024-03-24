import Main from './Pages/Main/Main.jsx'
import Cinema from './Pages/Cinema/Cinema.jsx'
import Header from './Components/Header/Header.jsx'
import NotFound from './Pages/NotFound/NotFound.jsx'
import Playlists from './Pages/Playlists/Playlists.jsx'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Films from './Pages/Categories/Films/Films.jsx'
import FullPost from './Components/Posts/FullPost/FullPost.jsx'

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Header />
			</header>
			<div className='App-content'>
				<Routes>
					<Route path='/main' element={<Main />} />
					<Route path='/cinema' element={<Cinema />} />
					<Route path='/cinema/films' element={<Films />} />
					<Route path='/playlists' element={<Playlists />} />
					<Route path='/film/:id' element={<FullPost />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</div>
		</div>
	)
}

export default App
