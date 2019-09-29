import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from './Components/NavigationBar.js'
import View from './Components/View.js'

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			drawerOpen: false,
			view: 'overview'
		}
	}

	toggleDrawer = (open) => {
		this.setState({
			drawerOpen: open
		})
	}

	render() {
	  return (
	  	<div className="main-wrapper">
	  		<CssBaseline />
	  		<NavigationBar />
	  		<View currentView={this.state.view} />
	  	</div>
	  )
	}
}

export default App