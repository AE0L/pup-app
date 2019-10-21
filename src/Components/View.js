import React from 'react'

import Overview from './Views/Overview.js'
import Schedule from './Views/Schedule.js'
import Foods from './Views/Foods'
import MapView from './Views/MapView.js'
import SubjectCreate from './Views/SubjectCreate.js'
import SubjectEdit from './Views/SubjectEdit.js'
import Settings from './Views/Settings.js'
import About from './Views/About.js'

export default function View(props) {
	let { currentView, changeView, updateData, data, foodData } = props
	window.scrollTo(0, 0)

	if (currentView === 'Overview') {
		window.document.title = 'Overview | PUP App'
		return (<Overview data={data} changeView={changeView} />)
	} else if (currentView === 'Schedule') {
		window.document.title = 'Schedule | PUP App'
		return (<Schedule data={data} changeView={changeView} />)
	} else if (currentView === 'Foods') {
		window.document.title = 'Foods | PUP App'
		return (<Foods data={foodData} changeView={changeView} />)
	} else if (currentView === 'Add Subject') {
		window.document.title = 'Add Subject | PUP App'
		return (<SubjectCreate onCancel={changeView} updateData={updateData} />)
	} else if (currentView === 'Subject Edit') {
		window.document.title = 'Edit Subject | PUP App'
		return (<SubjectEdit />)
	} else if (currentView === 'Map') {
		window.document.title = 'Map | PUP App'
		return (<MapView />)
	} else if (currentView === 'Settings') {
		window.document.title = 'Settings | PUP App'
		return (<Settings />)
	} else if (currentView === 'About') {
		window.document.title = 'About | PUP App'
		return (<About />)
	}
}