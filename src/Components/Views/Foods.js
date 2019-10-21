import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import Typography     from '@material-ui/core/Typography'
import Card           from '@material-ui/core/Card'
import CardContent    from '@material-ui/core/CardContent'
import CardActionArea from '@material-ui/core/CardActions'
import Collapse       from '@material-ui/core/Collapse'
import IconButton     from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = makeStyles(theme => ({
	container: {
		margin: '0 1em',
		marginTop: '15vh',
		marginBottom: '25vh'
	},

	stallCard: {
		margin: `1em 0`,
		borderLeft: `.5em solid ${theme.palette.secondary.dark}`
	},

	expandIcon: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},

	expanded: {
		transform: 'rotate(180deg)'
	}
}))

function StallCard(props) {
	const { name, menu }    = props
	const classes           = styles()
	const [ open, setOpen ] = React.useState(false)
	const [ expandClass, setExpandClass ] = React.useState(classes.expandIcon)

	const handleExpandClick = () => {
		setOpen(!open)

		if (!open) {
			setExpandClass(`${classes.expandIcon} ${classes.expanded}`)
		} else {
			setExpandClass(classes.expandIcon)
		}
	}

	const menuContent = menu.map(food => {
		if (food.variants) {
			return (
				<React.Fragment key={food.food}>
					<Typography style={{
						gridColumn: '1/3'
					}} >{food.food}</Typography>
					<CardContent style={{
						gridColumn: '1/3',
						display: 'grid',
						gridTemplateColumns: '1fr auto'
					}} >
						{food.variants.map(variant => 
							<React.Fragment key={`${food.food}-${variant.type}`}>
								<Typography>{variant.type}</Typography>
								<Typography>{variant.price}</Typography>
							</React.Fragment>
						)}
					</CardContent>
				</React.Fragment>
			)
		} else {
			return (
				<React.Fragment key={food.food}>
					<Typography>{food.food}</Typography>
					<Typography style={{paddingRight: 16}}>{food.price}</Typography>
				</React.Fragment>
			)
		}
	})

	return (
		<Card className={classes.stallCard}>
			<CardActionArea onClick={handleExpandClick}>
				<Typography variant='h6'>{name}</Typography>
				<IconButton
					className={expandClass}
					aria-expanded={open}
					aria-label='show more'
				>
					<ExpandMoreIcon />
				</IconButton>
			</CardActionArea>
			
			<Collapse in={open} timeout='auto' unmountOnExit>
				<CardContent style={{
					display: 'grid',
					gridTemplateColumns: '1fr auto'
				}}>
					{menuContent}
				</CardContent>
			</Collapse>
		</Card>
	)
}

function StallContainer(props) {
	const classes  = styles()
	const { data } = props

	const stallCards = data.list.map(stall =>
		<StallCard
			key={stall.name}
			name={stall.name}
			menu={stall.menu}
		/>
	)

	return (
		<div className={classes.container}>
			<Typography variant='h5' gutterBottom>Food Stalls</Typography>
			<div>
				{stallCards}
			</div>
		</div>
	)
}

export default class Foods extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
		}
	}

	render() {
		return (
			<StallContainer {...this.props} />
		)
	}
}