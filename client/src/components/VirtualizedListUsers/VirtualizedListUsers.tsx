import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { IconButton } from '@mui/material'
import MessageIcon from '@mui/icons-material/Message'
import type { FC } from 'react'
import cutString from '../../helpers/cutString'

interface IUser {
	id: Number
	username: string
}
interface IVirtualizedListUsers {
	data: IUser[]
}

const VurtualizedListUsers: FC<IVirtualizedListUsers> = ({ data }) => {
	// const [checked, setChecked] = React.useState([1])

	// const handleToggle = (value: number) => () => {
	// 	const currentIndex = checked.indexOf(value)
	// 	const newChecked = [...checked]

	// 	if (currentIndex === -1) {
	// 		newChecked.push(value)
	// 	} else {
	// 		newChecked.splice(currentIndex, 1)
	// 	}

	// 	setChecked(newChecked)
	// }

	return (
		<List
			dense
			sx={{
				width: '100%',
				maxWidth: 360,
				bgcolor: 'var(--tg-theme-bg-color)',
				marginTop: '18px',
				color: 'var(--tg-theme-text-color)',
				'& .MuiListItemButton-root': {
					color: 'inherit',
				},
				'& .MuiListItemText-primary': {
					color: 'inherit',
				},
				'& .MuiAvatar-root': {
					bgcolor: 'grey.800',
				},
			}}
		>
			{data.map(value => {
				return (
					<ListItem
						key={Number(value?.id)}
						secondaryAction={
							<IconButton>
								<MessageIcon
									sx={{ color: 'grey' }}
									onClick={() =>
										window.Telegram.WebApp.openTelegramLink(
											`tg://user?id=${value?.id}`,
										)
									}
								/>
							</IconButton>
						}
						disablePadding
					>
						<ListItemButton
							onClick={() =>
								window.Telegram.WebApp.openTelegramLink(
									`tg://user?id=${value?.id}`,
								)
							}
						>
							<ListItemAvatar>
								<Avatar />
							</ListItemAvatar>
							<ListItemText primary={cutString(value?.username, 26)} />
						</ListItemButton>
					</ListItem>
				)
			})}
		</List>
	)
}

export default VurtualizedListUsers
