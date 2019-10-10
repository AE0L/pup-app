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
	window.scrollTo(0, 0)

	if (view === 'Overview') {
		window.document.title = 'Overview | PUP App'
		return (<Overview data={props.data} changeView={props.changeView} />)
	} else if (view === 'Schedule') {
		window.document.title = 'Schedule | PUP App'
		return (<Schedule data={props.data} changeView={props.changeView} />)
	} else if (view === 'Add Subject') {
		window.document.title = 'Add Subject | PUP App'
		return (<SubjectCreate onCancel={props.changeView} updateData={props.updateData} />)
	} else if (view === 'Subject Edit') {
		window.document.title = 'Edit Subject | PUP App'
		return (<SubjectEdit />)
	} else if (view === 'Map') {
		window.document.title = 'Map | PUP App'
		return (<MapView />)
	} else if (view === 'Settings') {
		window.document.title = 'Settings | PUP App'
		return (<Settings />)
	} else if (view === 'About') {
		window.document.title = 'About | PUP App'
		return (<About />)
	}
}