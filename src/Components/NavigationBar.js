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
  const selected = props.selected

	return (
		<ThemeProvider theme={pupTheme}>
			<AppBar>
        <Drawer
          open={props.menuOpen}
          onClose={event => props.toggleDrawer(false)}
        >
          <div className={classes.list}>
            <List>
              <ListItem
                selected={selected === 0}
                button key='overview'
                onClick={event => props.menuOnClick(0)}
              >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary='Overview' />
              </ListItem>

              <ListItem
                selected={selected === 1} 
                button
                key='schedule'
                onClick={event => props.menuOnClick(1)}
              >
                <ListItemIcon><ScheduleIcon /></ListItemIcon>
                <ListItemText primary='Schedule' />
              </ListItem>

              <ListItem
                selected={selected === 2}
                button
                key='map'
                onClick={event => props.menuOnClick(2)}
              >
                <ListItemIcon><MapIcon /></ListItemIcon>
                <ListItemText primary='Map' />
              </ListItem>

              <Divider />
            </List>
            <List>
              <ListItem
                selected={selected === 3}
                button
                key='settings'
                onClick={event => props.menuOnClick(3)}
              >
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>

              <ListItem
                selected={selected === 4}
                button
                key='about'
                onClick={event => props.menuOnClick(4)}
              >
                <ListItemIcon><InfoIcon /></ListItemIcon>
                <ListItemText primary='About' />
              </ListItem>
            </List>
          </div>
        </Drawer>
        <ToolBar>
					<IconButton
            onClick={event => props.toggleDrawer(true)}
            className={classes.menuBtn}
            color='inherit'
            edge='start'
            aria-label='menu'
          >
						<MenuIcon />
					</IconButton>

					<Typography variant='h6'>
            {props.title}
					</Typography>
        </ToolBar>
			</AppBar>

      <Fab
        className={classes.fab}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
		</ThemeProvider>
	)
}
