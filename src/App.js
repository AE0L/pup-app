import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from './Components/NavigationBar.js'
import View from './Components/View.js'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedMenu: 0,
			menuOpen: false,
			view: 'Overview'
		}
	}

	toggleDrawer = (open) => {
    this.setState({
    	menuOpen: open
    })
	}

	menuOnClickHandler = (index) => {
		let view = ''

		if (index === 0) {
			view = 'Overview'
		} else if (index === 1) {
			view = 'Schedule'
		} else if (index === 2) {
			view = 'Map'
		} else if (index === 3) {
			view = 'Settings'
		} else if (index === 4) {
			view = 'About'
		}

		this.setState({
			selectedMenu: index,
			view: view,
			menuOpen: false
		})
	}

	render() {
	  return (
	  	<div className="main-wrapper">
	  		<CssBaseline />
	  		
	  		<NavigationBar
	  			menuOpen={this.state.menuOpen}
	  			title={this.state.view}
	  			selected={this.state.selectedMenu}
	  			menuOnClick={this.menuOnClickHandler}
	  			toggleDrawer={this.toggleDrawer}
  			/>

	  		<View currentView={this.state.view} />
	  	</div>
	  )
	}
}

export default App