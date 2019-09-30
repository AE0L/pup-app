import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import NavigationBar from './Components/Navigation/NavigationBar.js'
import View from './Components/View.js'

const mainTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#830404'
		},
		secondary: {
			main: '#ffee44'
		}
	}
})

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

	menuHandler = view => {
		this.setState({
			view: view,
		})
	}

	render() {
	  return (
	  	<ThemeProvider theme={mainTheme}>
	  		<CssBaseline />
	  		<NavigationBar
	  			theme={mainTheme}
	  			menuOpen={this.state.menuOpen}
	  			title={this.state.view}
	  			selected={this.state.selectedMenu}
	  			menuOnClick={this.menuOnClickHandler}
	  			toggleDrawer={this.toggleDrawer}
  			/>

	  		<View menuHandler={this.menuHandler} currentView={this.state.view} />
	  	</ThemeProvider>
	  )
	}
}

export default App