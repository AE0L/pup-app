import React from 'react'

import Overview from './Overview.js'

export default function View(props) {
	if (props.currentView === 'overview') {
		return (<Overview />)
	}
}