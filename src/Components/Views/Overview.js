import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActionArea'
import Grow from '@material-ui/core/Grow'

import FabIcon from '../Navigation/FabIcon.js'
import ScheduleIcon from '@material-ui/icons/Schedule'

const useStyle = makeStyles(theme => ({
	wrapper: {
		margin: '0 1em 1em',
		marginTop: '15vh',
		marginBottom: '25vh'
	},

	cardCont: {
		display: 'grid',
		gridRowGap: '1em',
	},

	card: {
		borderLeft: `.5em solid ${theme.palette.secondary.dark}`,
	},

	dateHeader: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		alignItems: 'center',
		marginTop: '2.5em',
	},

	todayText: {
		justifySelf: 'start',
	},

	todayDate: {
		justifySelf: 'end'
	},

	noSchedCard: {
		background: 'rgb(200, 200, 200)',
		padding: '1em 0'
	},

	subjTime: {
		display: 'grid',
		gridTemplateColumns: 'auto 1fr',
		gridColumnGap: '.5em',
		margin: '.5em 0'
	}
}))

function FabMenuItems(props) {
	return (
		<MenuItem key="add-schedule" onClick={event => props.changeView('Add Subject')}>
			Add new schedule
		</MenuItem>
	)
}

function Cards(props) {
	const classes = useStyle()

	const content = props.data.map(subj =>
		subj.schedule.map(sched =>
			<Card className={classes.card} key={`${subj.name}-${sched.roow}`}>
				<CardActionArea>
					<CardContent style={{paddingBottom: '1em'}}>
						<Typography
							className={classes.subjName}
							noWrap={true}
							variant='body1'
							gutterBottom
						>
							{subj.name}
						</Typography>
						<Typography className={classes.subjTime} variant='body2' color='textSecondary'>
							<ScheduleIcon style={{ fontSize: '1.25em' }} />{`${sched.start} - ${sched.end}`}
						</Typography>
						<Typography className={classes.subjRoom} variant='body2'>{sched.room}</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		)
	)

	return (
		<React.Fragment>
			{content}
		</React.Fragment>
	)
}

function ContentContainer(props) {
	const classes = useStyle()
	const theme = useTheme()

	return (
		<ThemeProvider theme={theme}>
		<Grow in={true}>
			<div className={classes.wrapper}>
				<div className={classes.dateHeader}>
					<Typography className={classes.todayText} variant='h5' gutterBottom>Today</Typography>
					<Typography className={classes.todayDate} color='textSecondary' variant='subtitle2'>{props.todayDate}</Typography>
				</div>
				<div className={classes.cardCont}>
					{props.todayData.length !== 0 && <Cards data={props.todayData} />}
					{props.todayData.length === 0 &&
						<Card className={classes.noSchedCard}>
							<Typography variant='body1' align='center'>No schedule for today</Typography>
						</Card>
					}
					{props.todayData.length !== 0 &&
						<Typography variant='body2' color='textSecondary' align='center'>End of schedule</Typography>
					}
				</div>

				<div className={classes.dateHeader}>
					<Typography className={classes.todayText} variant='h5' gutterBottom>Tomorrow</Typography>
					<Typography className={classes.todayDate} color='textSecondary' variant='subtitle2'>{props.tomDate}</Typography>
				</div>
				<div className={classes.cardCont}>
					{props.tomorrowData.length !== 0 && <Cards data={props.tomorrowData} />}
					{props.tomorrowData.length === 0 &&
						<Card className={classes.noSchedCard}>
							<Typography variant='body1' align='center'>No schedule for tomorrow</Typography>
						</Card>
					}
					{props.tomorrowData.length !== 0 &&
						<Typography variant='body2' color='textSecondary' align='center'>End of schedule</Typography>
					}
				</div>
			</div>
		</Grow>
		<FabIcon> <FabMenuItems changeView={props.changeView} /> </FabIcon>
		</ThemeProvider>
	)
}

export default class Overview extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			today: props.data.date_today,
			tomorrow: props.data.date_tomorrow,
			todayData: this.getTodaySched(props.data),
			tomorrowData: this.getTomorrowSched(props.data)
		}
	}

	getTodaySched = data => {
		data = JSON.parse(JSON.stringify(data))

		let today = data.subjects.filter(subj => {
			let todaySched = subj.schedule.filter(sched => {
				return sched.day === data.day_today
			})

			return (todaySched.length !== 0)
		})

		today = today.map(subj => {
			subj.schedule = subj.schedule.filter(sched => {
				return sched.day === data.day_today
			})

			return subj
		})

		return today
	}

	getTomorrowSched = data => {
		data = JSON.parse(JSON.stringify(data))

		let tom = data.subjects.filter(subj => {
			let tomSched = subj.schedule.filter(sched => {
				return sched.day === data.day_tomorrow
			})

			return (tomSched.length !== 0)
		})

		tom = tom.map(subj => {
			subj.schedule = subj.schedule.filter(sched => {
				return sched.day === data.day_tomorrow
			})

			return subj
		})
		
		return tom
	}

	render() {
		return (
			<ContentContainer
				openSnack={this.props.openSnack}
				closeSnack={this.props.closeSnack}
				onUndo={this.props.onUndo}
				tomDate={this.state.tomorrow}
				todayDate={this.state.today}
				todayData={this.state.todayData}
				tomorrowData={this.state.tomorrowData}
				changeView={this.props.changeView}
		 	/>
		)
	}
}