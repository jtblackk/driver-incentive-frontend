import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import TopAppBar from '../Components/TopAppBar'
import UserProfileCard from '../Components/UserProfileCard'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LeftDrawer from '../Components/LeftDrawer'

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

function ProfilePage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <LeftDrawer />
      <TopAppBar pageTitle="Your profile" />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <UserProfileCard profileEmail={'Driver@gmail.com'} />
      </main>
    </div>
  )
}

export default ProfilePage
