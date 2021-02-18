import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import EditIcon from '@material-ui/icons/Edit'

import TopAppBar from '../Components/TopAppBar'
import UserProfileCard from '../Components/UserProfileCard'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LeftDrawer from '../Components/LeftDrawer'
import { Auth } from 'aws-amplify'
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import LoadingIcon from '../Components/LoadingIcon'
import EditAccountCard from '../Components/EditAccountCard'

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
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

function ProfilePageContent(props) {
  const classes = useStyles()
  const [isEditing, setIsEditing] = useState(false)

  if (!isEditing) {
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid
            item
            container
            xs={12}
            sm={8}
            md={6}
            lg={4}
            xl={3}
            justify="center"
          >
            {/* edit button */}
            <Paper className={classes.paper}>
              <Grid container justify="flex-end">
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    setIsEditing(!isEditing)
                  }}
                >
                  <Typography>Edit</Typography>
                </Button>
              </Grid>

              {/* profile info section */}
              <Grid item>
                <UserProfileCard profileEmail={props.currentUser} />
              </Grid>
              <br></br>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item container xs={12} sm={8} md={6} lg={4} xl={3}>
            <Paper className={classes.paper}>
              <Grid container justify="flex-end">
                {/* cancel button */}
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    setIsEditing(!isEditing)
                  }}
                >
                  <Typography>Cancel</Typography>
                </Button>

                {/* submit button */}
                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => {
                    // TODO: save the account info form's information
                    setIsEditing(!isEditing)
                  }}
                >
                  <Typography>Save</Typography>
                </Button>
              </Grid>

              {/* account info form */}
              <Grid item>
                <EditAccountCard accountEmail={props.currentUser} />
              </Grid>

              <br></br>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
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
          <ProfilePageContent currentUser={currentUser} />
        ) : (
          <LoadingIcon />
        )}
      </main>
    </div>
  )
}

export default ProfilePage
