import { useEffect, useState, type FC } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import './SearchUsers.css'
import { Button } from '@mui/material'
import VurtualizedListUsers from '../VirtualizedListUsers/VirtualizedListUsers'
import useTelegram from '../../hooks/useTelegram'
import axios from 'axios'
interface IUser {
	id: Number
	username: string
}

const API_URL = import.meta.env.VITE_API_URL

const SearchUsers: FC = () => {
	const { user } = useTelegram()
	const [usersWithSameTaste, setUsersWithSameTaste] = useState<IUser[]>([])
	const [buttonWasPressed, setButtonWasPressed] = useState<Boolean>(false)
	const [userIsAgreed, setUserIsAgreed] = useState<Boolean>(false)

	useEffect(() => {
		checkUserAgreement(user?.id)
	}, [])

	const setNewUsersWithSameTaste = async (userId: Number) => {
		try {
			const { data } = await axios.get(
				`${API_URL}/getUsersWithSameTaste/${userId}`,
			)
			setUsersWithSameTaste(data)
		} catch (e) {
			console.log(e)
		}
	}

	const checkUserAgreement = async (userId: Number) => {
		try {
			const { data } = await axios.get(`${API_URL}/checkAgreement/${userId}`)
			setUserIsAgreed(data)
		} catch (e) {
			console.log(e)
		}
	}

	const setUserAgreementInDB = async (userId: Number) => {
		try {
			await axios.get(`${API_URL}/setAgreement/${userId}`)
		} catch (e) {
			console.log(e)
		}
	}

	if (!userIsAgreed) {
		return (
			<div className='Wrapper'>
				<div className='Content'>
					<div className='AgreementText'>
						Чтобы искать людей с похожим вкусом, ты должен дать согласие на
						обработку своих персональных данных другими пользователями
						<br />
						<br />
						(Твой профиль можно будет найти через поиск людей с похожим вкусом)
					</div>
					<Button
						variant='contained'
						onClick={() => {
							setUserIsAgreed(true)
							setUserAgreementInDB(user?.id)
						}}
						sx={{
							backgroundColor: 'var(--tg-theme-button-color)',
							color: 'var(--tg-theme-button-text-color)',
						}}
					>
						Даю своё согласие
					</Button>
				</div>
			</div>
		)
	}

	return (
		<div className='Wrapper'>
			<div className='Content'>
				<Button
					variant='contained'
					startIcon={<SearchIcon />}
					onClick={() => {
						setButtonWasPressed(true)
						setNewUsersWithSameTaste(user?.id)
					}}
					sx={{
						backgroundColor: 'var(--tg-theme-button-color)',
						color: 'var(--tg-theme-button-text-color)',
					}}
				>
					Найти людей с похожим вкусом
				</Button>
				{usersWithSameTaste.length == 0 && buttonWasPressed && (
					<p className='NoSearchResultsText'>
						Пользователей с похожим вкусом не нашлось :(
					</p>
				)}
				{usersWithSameTaste.length > 0 && (
					<VurtualizedListUsers data={usersWithSameTaste} />
				)}
			</div>
		</div>
	)
}

export default SearchUsers
