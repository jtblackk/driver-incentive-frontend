import React from 'react'
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

import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import { DRAWER_WIDTH } from '../Helpers/Constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const LeftDrawer = () => {
  const classes = useStyles()
  let history = useHistory()

  let pages = [
    {
      name: 'Home',
      route: '/',
      icon: <HomeIcon />,
    },
    {
      name: 'My Profile',
      route: '/profile',
      icon: <PersonIcon />,
    },
  ]

  return (
    <div>
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
        </List>
        <Divider />
        <List>
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
      </Drawer>
    </div>
  )
}

export default LeftDrawer
