import React from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import { ThemeProvider, useTheme } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'

import FabIcon from '../Navigation/FabIcon.js'

const useStyle = makeStyles(theme => ({
	wrapper: {
		margin: '0 1em 3em 1em',
		marginTop: '15vh'
	},

	cardCont: {
		display: 'grid',
		gridRowGap: '1em',
	},

	card: {
		borderLeft: `.5em solid ${theme.palette.secondary.dark}`
	},

	todayCont: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		alignItems: 'center',
		marginTop: '4em',
		marginBottom: '1em'
	},

	todayText: {
		justifySelf: 'start',
	},

	todayDate: {
		justifySelf: 'end'
	},

	noSched: {
		background: 'rgb(200, 200, 200)'
	}
}))

function FabMenuItems(props) {
	return (
		<MenuItem key="add-schedule" onClick={event => props.changeView('Subject Create')}>
			Add new schedule
		</MenuItem>
	)
}

function Cards(props) {
	const classes = useStyle()

	const content = props.data.map(subj =>
		subj.schedule.map(sched =>
			<Card className={classes.card} key={`${subj.name}-${sched.roow}`}>
				<CardHeader
					title={subj.name}
					subheader={`${sched.start} - ${sched.end}`}
				/>
				<CardContent>
					<Typography variant='h5'>{sched.room}</Typography>
				</CardContent>
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
			<div className={classes.wrapper}>
				<div className={classes.todayCont}>
					<Typography className={classes.todayText} variant='h4'>Today</Typography>
					<Typography className={classes.todayDate} variant='h6'>{props.todayDate}</Typography>
				</div>
				<div className={classes.cardCont}>
					{props.todayData.length !== 0 && <Cards data={props.todayData} />}
					{props.todayData.length === 0 &&
						<Card>
							<CardContent className={classes.noSched}>
								<Typography variant='h5' align='center'>No schedule today</Typography>
							</CardContent>
						</Card>
					}
					{props.todayData.length !== 0 &&
						<Typography variant='h6' align='center'>End of schedule</Typography>
					}
				</div>

				<div className={classes.todayCont}>
					<Typography className={classes.todayText} variant='h4'>Tomorrow</Typography>
					<Typography className={classes.todayDate} variant='h6'>{props.tomDate}</Typography>
				</div>
				<div className={classes.cardCont}>
					{props.tomorrowData.length !== 0 && <Cards data={props.tomorrowData} />}
					{props.tomorrowData.length === 0 &&
						<Card>
							<CardContent className={classes.noSched}>
								<Typography variant='h5' align='center'>No schedule tomorrow</Typography>
							</CardContent>
						</Card>
					}
					{props.tomorrowData.length !== 0 &&
						<Typography variant='h6' align='center'>End of schedule</Typography>
					}
				</div>
				<FabIcon> <FabMenuItems changeView={props.changeView} /> </FabIcon>
			</div>
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
				tomDate={this.state.tomorrow}
				todayDate={this.state.today}
				todayData={this.state.todayData}
				tomorrowData={this.state.tomorrowData}
				changeView={this.props.changeView}
		 	/>
		)
	}
}