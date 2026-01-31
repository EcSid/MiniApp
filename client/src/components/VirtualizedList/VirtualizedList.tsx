import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { List } from 'react-window'
import MovieIcon from '@mui/icons-material/Movie'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'
import type { FC } from 'react'

function renderRow(props: any) {
	const { index, style, tp, data } = props
	return (
		<ListItem style={style} key={index} component='div' disablePadding>
			<ListItemText primary={data[index]} />
			<IconButton aria-label='comment'>
				{tp == 'films' && <MovieIcon />}
				{tp == 'songs' && <LibraryMusicIcon />}
				{tp == 'books' && <MenuBookIcon />}
			</IconButton>
		</ListItem>
	)
}

interface IVirtualizedList {
	tp: 'films' | 'songs' | 'books'
	data: any[]
}

const VirtualizedList: FC<IVirtualizedList> = ({ tp, data }) => {
	return (
		<Box
			sx={{
				width: '100%',
				height: 200,
				maxWidth: 550,
				bgcolor: 'background.paper',
				border: '1px solid white',
				padding: '2px 10px',
				borderRadius: '12px',
			}}
		>
			<List
				rowHeight={46}
				rowCount={data.length}
				style={{
					height: 400,
					maxWidth: 550,
				}}
				rowProps={{ tp, data }}
				overscanCount={5}
				rowComponent={renderRow}
			/>
		</Box>
	)
}

export default VirtualizedList
