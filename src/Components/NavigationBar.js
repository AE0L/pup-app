import React from 'react'

// Material UI
import { createMuiTheme, makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import ToolBar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Fab from '@material-ui/core/Fab'

// Icons
import AddIcon from '@material-ui/icons/Add'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import ScheduleIcon from '@material-ui/icons/Schedule'
import MapIcon from '@material-ui/icons/Map'
import SettingsIcon from '@material-ui/icons/Settings'
import InfoIcon from '@material-ui/icons/Info'

const useStyles = makeStyles(theme => ({
  menuBtn: {
    marginRight: theme.spacing(2)
  },

  list: {
    width: '60vw'
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(4),
    right: theme.spacing(4)
  }
}))

const pupTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#830404'
		},
		secondary: {
			main: '#ffee44'
		}
	}
})

export default function NavigationBar(props) {
  const classes = useStyles()

  const [state, setState] = React.useState({
    open: false
  })

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, open: open })
  }

	return (
		<ThemeProvider theme={pupTheme}>
			<AppBar>
        <Drawer open={state.open} onClose={toggleDrawer(false)}>
          <div className={classes.list}>
            <List>
              <ListItem button key='overview' onClick={props.menuOnClick}>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Overview' />
              </ListItem>

              <ListItem button key='schedule' onClick={props.menuOnClick}>
                <ListItemIcon><ScheduleIcon /></ListItemIcon>
                <ListItemText primary='Schedule' />
              </ListItem>

              <ListItem button key='map' onClick={props.menuOnClick}>
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary='Map' />
              </ListItem>

              <Divider />

              <ListItem button key='settings' onClick={props.menuOnClick}>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>

              <ListItem button key='about' onClick={props.menuOnClick}>
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary='About' />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <ToolBar>
					<IconButton onClick={toggleDrawer(true)} className={classes.menuBtn} color='inherit' edge='start' aria-label='menu'>
						<MenuIcon />
					</IconButton>

					<Typography variant='h6'>
						Overview
					</Typography>
        </ToolBar>
			</AppBar>

      <Fab className={classes.fab} color='primary' aria-label='add'>
        <AddIcon />
      </Fab>
		</ThemeProvider>
	)
}
