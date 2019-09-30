	import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import Fab from '@material-ui/core/Fab'
import Menu from '@material-ui/core/Menu'

import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles(theme => ({
	fab: {
		position: 'fixed',
		bottom: theme.spacing(5),
		right: theme.spacing(5)
	},

	menu: {
		transform: `translate(-${theme.spacing(6)}px, -${theme.spacing(4)}px)`
	}
}))

export default function FabIcon(props) {
	const classes = useStyles()
	const theme = useTheme()
	const [ anchorEl, setAnchorEl ] = React.useState(null)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return(
		<ThemeProvider theme={theme}>
			<Menu
				id='overview-menu'
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				className={classes.menu}
			>
				<div>
					{props.children}
				</div>
			</Menu>
			<Fab
				className={classes.fab}
				color='primary'
				aria-label='add'
				onClick={handleClick}
			>
				<AddIcon />
			</Fab>
		</ThemeProvider>
	)
}
