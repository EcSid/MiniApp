import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import UserProfile from './components/UserProfile/UserProfile'
import SearchUsers from './components/SearchUsers/SearchUsers'
import useTelegram from './hooks/useTelegram'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL

function App() {
	window?.Telegram?.WebApp?.ready()

	const [value, setValue] = React.useState(0)
	const [isRegistered, setIsRegistered] = React.useState<Boolean>(false)
	const { user } = useTelegram()

	React.useEffect(() => {
		setNewIsRegistered(user?.id)
	}, [])

	const setNewIsRegistered = async (userId: Number) => {
		try {
			const { data } = await axios.get(
				`${API_URL}/checkRegistration/${userId || 1}`,
			)
			setIsRegistered(data)
		} catch (e) {
			console.log(e)
		}
	}

	if (!isRegistered) {
		return <h2 className='NotRegistered'>Ты не зарегистрирован!</h2>
	}

	return (
		<>
			{/* Navigation */}
			<Box sx={{ width: '100%' }}>
				<BottomNavigation
					sx={{
						bgcolor: 'var(--tg-theme-bg-color)',
						'& .MuiBottomNavigationAction-root': {
							color: 'grey.600',
						},
						'& .Mui-selected': {
							'& .MuiBottomNavigationAction-label': {
								color: 'var(--tg-theme-button-color)',
							},
							'& .MuiSvgIcon-root': {
								color: 'var(--tg-theme-button-color)',
							},
						},
					}}
					showLabels
					value={value}
					onChange={(_, newValue) => {
						setValue(newValue)
					}}
				>
					<BottomNavigationAction
						label='Мой профиль'
						icon={<AccountCircleIcon />}
					/>
					<BottomNavigationAction
						label='Искать людей'
						icon={<PersonSearchIcon />}
					/>
				</BottomNavigation>
			</Box>
			{/* Content */}
			{value == 0 && <UserProfile />}
			{value == 1 && <SearchUsers />}
		</>
	)
}

export default App
