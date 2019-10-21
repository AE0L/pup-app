import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
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
import Button from '@material-ui/core/Button'
import Slide from '@material-ui/core/Slide'

import MenuIcon from '@material-ui/icons/Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import HomeIcon from '@material-ui/icons/Home'
import ScheduleIcon from '@material-ui/icons/Schedule'
import FoodIcon from '@material-ui/icons/Restaurant'
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
  },

  selected: {
    color: theme.palette.primary.main
  }
}))

export default function NavigationBar(props) {
  const classes = useStyles()
  const selected = props.selected

	return (
		<ThemeProvider theme={props.theme}>
        <Drawer
          open={props.menuOpen}
          onClose={event => props.toggleDrawer(false)}
        >
          <div className={classes.list}>
            <List>
              <ListItem
                className={selected === 0 ? classes.selected : ''}
                selected={selected === 0}
                button key='overview'
                onClick={event => props.menuOnClick(0)} >
                <ListItemIcon>
                  <HomeIcon color={selected === 0 ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText
                  primary='Overview' />
              </ListItem>

              <ListItem
                className={selected === 1 ? classes.selected : ''}
                selected={selected === 1} 
                button
                key='schedule'
                onClick={event => props.menuOnClick(1)} >
                <ListItemIcon>
                  <ScheduleIcon color={selected === 1 ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText primary='Schedule' />
              </ListItem>

              <ListItem
                className={selected === 2 ? classes.selected : ''}
                selected={selected === 2} 
                button
                key='foods'
                onClick={event => props.menuOnClick(2)} >
                <ListItemIcon>
                  <FoodIcon color={selected === 2 ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText primary='Foods' />
              </ListItem>

              <ListItem
                className={selected === 3 ? classes.selected : ''}
                selected={selected === 3}
                button
                key='map'
                onClick={event => props.menuOnClick(3)} >
                <ListItemIcon>
                  <MapIcon color={selected === 3 ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText primary='Map' />
              </ListItem>

              <Divider />
            </List>
            <List>
              <ListItem
                className={selected === 4 ? classes.selected : ''}
                selected={selected === 4}
                button
                key='settings'
                onClick={event => props.menuOnClick(4)} >
                <ListItemIcon>
                  <SettingsIcon color={selected === 4 ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText primary='Settings' />
              </ListItem>

              <ListItem
                className={selected === 5 ? classes.selected : ''}
                selected={selected === 5}
                button
                key='about'
                onClick={event => props.menuOnClick(5)} >
                <ListItemIcon>
                  <InfoIcon color={selected === 5 ? 'primary' : 'action'} />
                </ListItemIcon>
                <ListItemText primary='About' />
              </ListItem>
            </List>
          </div>
        </Drawer>
      <AppBar>
        <ToolBar>
          {props.navType === 'menu' && 
  					<IconButton
              onClick={event => props.toggleDrawer(true)}
              className={classes.menuBtn}
              color='inherit'
              edge='start'
              aria-label='menu'
            >
  						<MenuIcon />
  					</IconButton>
          }

          {props.navType === 'back' &&
            <IconButton
              onClick={event => props.returnToOverview()}
              className={classes.menuBtn}
              color='inherit'
              edge='start'
              aria-label='back'
            >
              <ArrowBackIcon />
            </IconButton>
          }

					<Typography style={{flexGrow: 1}} variant='h6'>
            {props.title}
					</Typography>

          {props.showInstall && 
            <Slide direction='left' in={true}>
              <Button color='inherit' onClick={props.installHandler}>
                  Install
              </Button>
            </Slide>
          }
        </ToolBar>
			</AppBar>
		</ThemeProvider>
	)
}
