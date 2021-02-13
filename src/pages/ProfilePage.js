import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import TopAppBar from '../Components/TopAppBar'
import UserProfileCard from '../Components/UserProfileCard'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LeftDrawer from '../Components/LeftDrawer'
import { Auth } from 'aws-amplify'
import { CircularProgress, Grid } from '@material-ui/core'

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

// loading icon that shows up when waiting for data to load
function LoadingIcon() {
  return (
    <Grid container justify="center">
      <Grid item xs={8} sm={6} md={5} lg={3} align="center">
        <CircularProgress></CircularProgress>
      </Grid>
    </Grid>
  )
}

function ProfilePage() {
  const classes = useStyles()

  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // fetch current user's email
    Auth.currentAuthenticatedUser().then((user) => {
      console.log(user.attributes.email)
      setCurrentUser(user.attributes.email)
    })
  }, [])

  return (
    <div className={classes.root}>
      {/* layout stuff */}
      <LeftDrawer />
      <TopAppBar pageTitle="Your profile" />

      {/* content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {currentUser ? (
          <UserProfileCard profileEmail={currentUser} />
        ) : (
          <LoadingIcon />
        )}
      </main>
    </div>
  )
}

export default ProfilePage
