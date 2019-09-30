import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'

import FabIcon from '../Navigation/FabIcon.js'

const useStyle = makeStyles(theme => ({
	wrapper: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
		color: 'rgb(100, 100, 100)'
	},

	start: {
	}
}))

function FabMenuItems(props) {
	return (
		<React.Fragment>
			<MenuItem key="add-schedule" onClick={event => props.menuHandler('Subject Create')}>
				Add new schedule
			</MenuItem>
		</React.Fragment>
	)
}

export default function Overview(props) {
	const classes = useStyle()

	return (
		<div>
			<Typography className={classes.wrapper} variant='h3' align='center'>
				We don't know your schedule yet :'(
			</Typography>
			<FabIcon>
				<FabMenuItems menuHandler={props.menuHandler} />
			</FabIcon>
		</div>
	)
}