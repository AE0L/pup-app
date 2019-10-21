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
			navType: 'menu',
			foodData: props.foodData,
			data: props.data,
			selectedMenu: 0,
			menuOpen: false,
			view: 'Overview',
			showInstall: false,
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
			view = 'Foods'
		} else if (index === 3) {
			view = 'Map'
		} else if (index === 4) {
			view = 'Settings'
		} else if (index === 5) {
			view = 'About'
		}

		this.setState({
			selectedMenu: index,
			view: view,
			menuOpen: false
		})
	}

	changeView = view => {
		this.setState({
			view: view,
			navType: view === 'Add Subject' ? 'back' : 'menu'
		})
	}

	returnToOverview = () => {
		this.setState({
			view: 'Overview',
			navType: 'menu'
		})
	}

	updateData = subject => {
		let newData = JSON.parse(JSON.stringify(this.state.data))
		newData.subjects.push(subject)

		this.setState({
			data: this.props.updateCache(newData)
		})

		this.returnToOverview()
	}

	showInstall = () => {
		this.setState({
			showInstall: true,
		})
	}

	installHandler = () => {
		this.state.deferredPrompt.prompt()

		this.state.deferredPrompt.userChoice.then(
			choice => {
				if (choice.outcome === 'accepted') {
					this.setState({
						showInstall: false,
					})
				}

				this.setState({
					deferredPrompt: null
				})
			}
		)
	} 

	render() {
		window.addEventListener('beforeinstallprompt', e => {
			e.preventDefault()

			this.setState({
				deferredPrompt: e
			})

			this.showInstall()
		})

	  return (
	  	<ThemeProvider theme={mainTheme}>
	  		<CssBaseline />
	  		<NavigationBar
	  			installHandler={this.installHandler}
	  			showInstall={this.state.showInstall}
	  			navType={this.state.navType}
	  			returnToOverview={this.returnToOverview}
	  			theme={mainTheme}
	  			menuOpen={this.state.menuOpen}
	  			title={this.state.view}
	  			selected={this.state.selectedMenu}
	  			menuOnClick={this.menuOnClickHandler}
	  			toggleDrawer={this.toggleDrawer}
  			/>
	  		<View
	  			foodData={this.state.foodData}
	  			data={this.state.data}
	  			updateData={this.updateData}
	  			changeView={this.changeView}
	  			currentView={this.state.view}
	  		/>
	  	</ThemeProvider>
	  )
	}
}

export default App