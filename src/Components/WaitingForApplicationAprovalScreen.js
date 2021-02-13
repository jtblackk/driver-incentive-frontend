import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { AppBar, CircularProgress, Grid, Toolbar } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

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

const WaitingForApplicationAprovalScreen = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar position="fixed">
        <Toolbar>
          <Grid container justify="space-evenly" spacing={24}>
            <Grid item>
              <Typography variant="h6">
                Waiting for driver application approval
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* loading screen */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center">
          <Grid item xs={8} sm={6} md={5} lg={3} align="center">
            <CircularProgress></CircularProgress>
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default WaitingForApplicationAprovalScreen
