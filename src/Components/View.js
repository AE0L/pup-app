import React from 'react'

import Overview from './Views/Overview.js'
import Schedule from './Views/Schedule.js'
import MapView from './Views/MapView.js'
import SubjectCreate from './Views/SubjectCreate.js'
import SubjectEdit from './Views/SubjectEdit.js'
import Settings from './Views/Settings.js'
import About from './Views/About.js'

export default function View(props) {
	let view = props.currentView

	if (view === 'Overview')
		return (<Overview menuHandler={props.menuHandler} />)
	else if (view === 'Schedule')
		return (<Schedule />)
	else if (view === 'Subject Create')
		return (<SubjectCreate />)
	else if (view === 'Subject Edit')
		return (<SubjectEdit />)
	else if (view === 'Map')
		return (<MapView />)
	else if (view === 'Settings')
		return (<Settings />)
	else if (view === 'About')
		return (<About />)
}