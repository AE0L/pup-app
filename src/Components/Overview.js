import React from 'react'

// Material UI
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles(theme => ({
	wrapper: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
	},

	start: {
		color: 'rgb(100, 100, 100)'
	}
}))

export default function Overview() {
	const classes = useStyle()

	return (
		<div className={classes.wrapper}>
			<Typography className={classes.start} variant='h3' align='center'>
				We don't know your schedule yet :'(
			</Typography>
		</div>
	)
}