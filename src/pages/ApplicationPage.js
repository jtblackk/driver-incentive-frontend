import React, { useEffect, useState } from 'react'
import {
  AppBar,
  CircularProgress,
  Grid,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DriverApplicationCard from '../Components/DriverApplicationCard'
import { Auth } from 'aws-amplify'
import { DRAWER_WIDTH } from '../Helpers/Constants'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function LoadingIcon() {
  return (
    <Grid container justify="center">
      <Grid item xs={8} sm={6} md={5} lg={3} align="center">
        <CircularProgress></CircularProgress>
      </Grid>
    </Grid>
  )
}

function ApplicationPage() {
  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // fetch the current user's email address
    Auth.currentAuthenticatedUser().then((user) => {
      setCurrentUser(user.attributes.email)
    })
  }, [])

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify="space-evenly" spacing={24}>
            <Grid item>
              <Typography variant="h6">Apply to a sponsor</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* page content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="space-evenly">
          <Grid item>
            {currentUser ? (
              <DriverApplicationCard accountEmail={currentUser} />
            ) : (
              <LoadingIcon />
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default ApplicationPage
