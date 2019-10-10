import React from 'react'

import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import MenuItem from '@material-ui/core/MenuItem'
import DateFnsUtils from '@date-io/date-fns'
import { MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grow from '@material-ui/core/Grow'
import Slide from '@material-ui/core/Slide'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
	form: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '1fr',
		gridRowGap: '2em',
		marginTop: '10vh',
		padding: '2em'
	},

	schedCont: {
		display: 'grid',
		gridRowGap: '1em',
	},

	schedCard: {
		borderLeft: `.5em solid ${theme.palette.secondary.dark}`
	},

	card: {
		display: 'grid',
		gridRowGap: '1em'
	},

	addIcon: {
		alignSelf: 'center',
		justifySelf: 'center',
		margin: '2em'
	},

	btnCont: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr'
	},

	btn: {
		margin: '1em'
	},
}))

function Schedules(props) {
	const classes = useStyles()

	return (
		<React.Fragment>
			{props.schedules.map((sched, i) => {
				return (
					<Grow mountOnEnter in={true} key={`sched-${i}`}>
					<Card className={classes.schedCard}>
						{i !== 0 
							? <CardHeader
									title='Schedule'
									subheader='Enter schedule details'
									action={
										<IconButton onClick={event => props.onDelete(i)}>
											<CloseIcon />
										</IconButton>
									}
								/>
							: <CardHeader
									title='Schedule'
									subheader='Enter schedule details'
								/>
						}
						<CardContent className={classes.card}>
							<TextField
								id='room'
								label='Room'
								value={sched.room}
								onChange={props.onChange(i, 'room')}
							/>

							<TextField
								id='select-day'
								select
								label='Day'
								value={sched.day}
								onChange={props.onChange(i, 'day')}
								margin='dense'
							>
								{['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(option => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</TextField>

							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<TimePicker
									autoOk
									clearable
									label='Start'
									value={sched.start}
									minutesStep={5}
									onChange={props.onChange(i, 'start')}
								/>
							</MuiPickersUtilsProvider>

							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<TimePicker
									autoOk
									clearable
									label='End'
									value={sched.end}
									minutesStep={5}
									onChange={props.onChange(i, 'end')}
								/>
							</MuiPickersUtilsProvider>
						</CardContent>
					</Card>
					</Grow>
				)
			})}
		</React.Fragment>
	)
}

function Form(props) {
	const classes = useStyles()

	return (
		<Slide direction='up' in={true}>
		<form className={classes.form} noValidate autoComplete='off'>
			<Typography variant='h5'>Subject Details</Typography>
			<TextField 
				autoFocus
				id='name'
				label='Subject Name'
				value={props.values.name}
				onChange={props.handleChange('name')}
			/>
			<TextField 
				id='prof'
				label='Subject Professor'
				value={props.values.prof}
				onChange={props.handleChange('prof')}
			/>
			<Typography variant='h5' style={{marginTop: '1em'}}>Subject Schedule/s</Typography>
			<div className={classes.schedCont}>
				<Schedules schedules={props.values.schedule} onChange={props.cardChange} onDelete={props.onDelete}/>
				<Fab className={classes.addIcon} color='primary' onClick={props.addOnClick}>
					<AddIcon />
				</Fab>
			</div>
			<div className={classes.btnCont}>
					<Button onClick={event => props.onCancel('Overview')} className={classes.btn} size='large' variant='outlined'>
						Cancel
					</Button>

					<Button onClick={props.readyData} className={classes.btn} size='large' variant='contained' color='primary'>
						Add
					</Button>
				</div>
		</form>
		</Slide>
	)
}

export default class SubjectCreate extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			prof: '',
			schedule: [
				{ grow: false, room: '', day: '', start: null, end: null }
			]
		}
	}

	handleChange = (name) => (event) => {
		this.setState({ ...this.state, [name]: event.target.value })
	}

	cardChange = (index, name) => (event) => {
		if (name !== 'start' && name !== 'end') {
			event.persist()
		}
		this.setState(state => {
			const schedule = state.schedule.map((sched, i) => {
				if (index === i) {
					if (name === 'start' || name === 'end') {
						return { ...sched, [name]: event }
					} else {
						return { ...sched, [name]: event.target.value }
					}
				} else {
					return sched
				}
			})

			return {
				schedule
			}
		})
	}

	addCard = event => {
		this.setState(state => {
			const schedule = state.schedule.push({
				grow: true,
				room: '',
				day: '',
				start: null,
				end: null
			})

			return schedule
		})
	}

	deleteCard = (index) => {
		this.setState(state => {
			const schedule = state.schedule
			schedule.splice(index, 1)

			return schedule
		})
	}

	readyData = () => {
		let subject = JSON.parse(JSON.stringify(this.state))

		subject.schedule = subject.schedule.map(schedules => {
			let schedule = JSON.parse(JSON.stringify(schedules))
			let timeStart = moment(new Date(schedule.start))
			let timeEnd = moment(new Date(schedule.end))

			schedule.start = moment(new Date(schedule.start)).format('h:mm A')
			schedule.end = moment(new Date(schedule.end)).format('h:mm A')

			return schedule
		})

		this.props.updateData(subject)
	}

	render() {
		return (
			<Form
				values={this.state}
				handleChange={this.handleChange}
				cardChange={this.cardChange}
				addOnClick={this.addCard}
				onDelete={this.deleteCard}
				onCancel={this.props.onCancel}
				readyData={this.readyData}
			/>
		)
	}
}