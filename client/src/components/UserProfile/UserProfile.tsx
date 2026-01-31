import { useEffect, useState, type FC } from 'react'
import VirtualizedList from '../VirtualizedList/VirtualizedList'
import PersonIcon from '@mui/icons-material/Person'
import './UserProfile.css'
import useTelegram from '../../hooks/useTelegram'
import axios from 'axios'
import cutString from '../../helpers/cutString'

const API_URL = import.meta.env.VITE_API_URL

const UserProfile: FC = () => {
	const { user } = useTelegram()
	const [favouriteFilms, setFavouriteFilms] = useState([])
	const [favouriteSongs, setFavouriteSongs] = useState([])
	const [favouriteBooks, setFavouriteBooks] = useState([])

	useEffect(() => {
		setNewFavouriteFilms(Number(user?.id))
		setNewFavouriteSongs(Number(user?.id))
		setNewFavouriteBooks(Number(user?.id))
	}, [])

	const setNewFavouriteFilms = async (userId: Number) => {
		try {
			const { data } = await axios.get(`${API_URL}/favouriteFilms/${userId}`)
			setFavouriteFilms(data)
		} catch (e) {
			console.log(e)
		}
	}

	const setNewFavouriteSongs = async (userId: Number) => {
		try {
			const { data } = await axios.get(`${API_URL}/favouriteSongs/${userId}`)
			setFavouriteSongs(data)
		} catch (e) {
			console.log(e)
		}
	}

	const setNewFavouriteBooks = async (userId: Number) => {
		try {
			const { data } = await axios.get(`${API_URL}/favouriteBooks/${userId}`)
			setFavouriteBooks(data)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className='Wrapper'>
			<div className='Content'>
				<div className='UserProfile'>
					<PersonIcon
						fontSize='inherit'
						sx={{ fontSize: 40, color: 'var(--tg-theme-text-color)' }}
					/>
					{/* Максимум 26 */}
					<div className='UserProfileName'>{cutString(user?.username, 26)}</div>
				</div>
				<div className='Section'>
					<div className='Text'>Твои любимые фильмы</div>
					<VirtualizedList
						tp='films'
						data={favouriteFilms.map(el => cutString(el, 49))}
					/>
				</div>
				<div className='Section'>
					<div className='Text'>Твои любимые песни</div>
					<VirtualizedList
						tp='songs'
						data={favouriteSongs.map(el => cutString(`${el[0]} - ${el[1]}`))}
					/>
				</div>
				<div className='Section'>
					<div className='Text'>Твои любимые книги</div>
					<VirtualizedList
						tp='books'
						data={favouriteBooks.map(el => cutString(el, 49))}
					/>
				</div>
			</div>
		</div>
	)
}

export default UserProfile
