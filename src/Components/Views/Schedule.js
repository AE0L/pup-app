import React from 'react'

import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import { makeStyles } from '@material-ui/core/styles'
import { Scheduler, WeekView, Appointments } from '@devexpress/dx-react-scheduler-material-ui'

const styles = (theme) => ({
	timeScaleCell: {
		textAlign: 'center',
		height: '10em',
		'& > span': {
			fontSize: '0.75em',
			whiteSpace: 'normal',
		}
	},

	dayScaleCell: {
		textAlign: 'center',
		padding: '14px 16px !important',
		'& > span': {
			fontSize: '1.5em'
		}
	},

	appointment: {
		background: theme.palette.primary.main
	},

	timeTableCell: {
		height: '5em'
	},

	appointmentContent: {
		padding: '4px 2px 0 4px',
		textAlign: 'left',
		display: 'table-cell'
	},

	appointmentSubj: {
		fontSize: '1.2em',
		whiteSpace: 'normal',
		wordBreak: 'break-word'
	},

	appointmentRoom: {
		fontSize: '0.9em',
		color: 'rgba(255, 255, 255, 0.75)'
	}
})

const formatTimeScale = date => moment(date).format('h a')

const formatDayScale = (date, options) => {
	const momentDate = moment(date)
	const { weekday } = options

	return momentDate.format(weekday ? 'dddd' : 'D')
}

const TimeTableCell = withStyles(styles, { name: 'TimeTableCell' }) (
	({ classes, ...restProps }) => {
		return (
			<WeekView.TimeTableCell
				{...restProps}
				className={classes.timeTableCell}
			/>
		)
	}
)

const TimeSacaleCell = withStyles(styles, { name: 'TimeScaleCell'})(
	({ classes, formatDate, ...restProps }) => {
	  return (
	    <WeekView.TimeScaleCell
	    	className={classes.timeScaleCell}
	    	formatDate={formatTimeScale}
	      {...restProps}
	    />
	  )
	}
)

const DaySacaleCell = withStyles(styles, { name: 'DayScaleCell'})(
	({ classes, ...restProps }) => {
		return (
			<WeekView.DayScaleCell
				className={classes.dayScaleCell}
				{...restProps}
			/>
		)
	}
)

const scheduleAppointment = withStyles(styles, { name: "Appointment" })(
	({ classes, children, ...resProps }) => {
		return (
			<Appointments.Appointment
				{...resProps}
				className={classes.appointment}
			>
				{children}
			</Appointments.Appointment>
		)
	}
)

const scheduleContent = withStyles(styles, { name: "AppointmentContent" }) (
	({ classes, children, data, ...restProps }) => {
		return (
				<Appointments.AppointmentContent
					{...restProps}
					className={classes.appointmentContent}
					data={data}
				>
						<Typography className={classes.appointmentSubj} variant='body1'>{data.title}</Typography>
						<Typography className={classes.appointmentRoom} variant='body2'>{data.room}</Typography>
				</Appointments.AppointmentContent>
		)
	}
)

function ScheduleContainer(props) {
	return (
		<Paper style={{marginTop: '5em'}} >
			<Scheduler data={props.data.scheds} >
				<WeekView
					excludedDays={[0]}
					startDayHour={props.data.min}
					endDayHour={props.data.max === 24 ? props.data.max : ++props.data.max}
					cellDuration={30}
					timeTableCellComponent={TimeTableCell}
					timeScaleCellComponent={TimeSacaleCell}
					dayScaleCellComponent={DaySacaleCell}
				/>

				<Appointments
					appointmentComponent={scheduleAppointment}
					appointmentContentComponent={scheduleContent}
				/>
			</Scheduler>
	 </Paper>
	)
}

export default class Schedule extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			data: this.generateData(),
		}
	}

	generateData() {
		var data = {
			min: 24,
			max: 0,
			scheds: []
		}

		this.props.data.subjects.map(subj => {
			subj.schedule.map(sched => {
				let startDate  = moment(new Date())
				let endDate   = moment(new Date())
				let start 		= moment(sched.start, 'h:mm A')
				let end   		= moment(sched.end, 'h:mm A')

				startDate.day(sched.day)
				endDate.day(sched.day)

				startDate.hour(start.format('H'))
				startDate.minute(start.format('m'))

				if (startDate.hour() < data.min) {
					data.min = parseInt(startDate.hour())
				}

				endDate.hour(end.format('H'))
				endDate.minute(end.format('m'))

				if (endDate.hour() > data.max) {
					data.max = parseInt(endDate.hour())
				}

				data.scheds.push({
					title: subj.name,
					startDate: startDate.add(30, 'm').format(),
					endDate: endDate.add(30, 'm').format(),
					room: sched.room
				})
			})
		})

		return data
	}

	render() {
		return (
			<ScheduleContainer {...this.state} />
		)
	}
}