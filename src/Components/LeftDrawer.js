import React from 'react'
import { useHistory } from 'react-router-dom'
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import SettingsIcon from '@material-ui/icons/Settings'
import { Auth } from 'aws-amplify'
import { DRAWER_WIDTH } from '../Helpers/Constants'

const pages = [
  {
    name: 'Home',
    route: '/',
    icon: <HomeIcon />,
  },
  {
    name: 'My profile',
    route: '/profile',
    icon: <PersonIcon />,
  },
]

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}))

const LeftDrawer = () => {
  let history = useHistory()
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />

      <Divider />

      {/* top pages */}
      <List>
        {pages.map((page, index) => (
          <ListItem
            button
            key={page.name}
            onClick={() => {
              history.push(page.route)
            }}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.name} />
          </ListItem>
        ))}
        <Divider />
      </List>

      {/* bottom pages */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Divider />

        {/* settings */}
        <List>
          <ListItem button key={'Settings'}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Settings'}
              onClick={() => {
                history.push('/settings')
              }}
            />
          </ListItem>

          {/* sign out */}
          <ListItem button key={'Sign out'}>
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText
              primary={'Sign out'}
              onClick={() => {
                Auth.signOut()
              }}
            />
          </ListItem>
        </List>
      </div>
    </Drawer>
  )
}

export default LeftDrawer
