import React from 'react'

import Overview from './Overview.js'

export default function View(props) {
	let view = props.currentView

	if (view === 'Overview')
		return (<Overview />)
	else if (view === 'Schedule')
		return (<h1>Schedule</h1>)
	else if (view === 'Map')
		return (<h1>Map</h1>)
	else if (view === 'Settings')
		return (<h1>Settings</h1>)
	else if (view === 'About')
		return (<h1>About</h1>)
}