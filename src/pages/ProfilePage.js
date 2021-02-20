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
      <Grid container direction="row" xs={12} justify="center">
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={8}
          md={6}
          lg={4}
          xl={3}
        >
          <Paper className={classes.paper}>
            <Grid item container justify="flex-end">
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

            <Grid item>
              <UserProfileCard userProfile={props} />
            </Grid>

            <Grid item>
              <br />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
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
                    let SAVE_USER_PROFILE_URL =
                      'https://xgfsi0wpb0.execute-api.us-east-1.amazonaws.com/dev/'
                    let requestOptions = {
                      method: 'PUT',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        Email_id: props.userProfile.Email_ID,
                        FirstName: props.userProfile.FirstName,
                        LastName: props.userProfile.LastName,
                        AccountType: props.userProfile.AccountType,
                        UserBio: props.userProfile.UserBio,
                      }),
                    }
                    fetch(SAVE_USER_PROFILE_URL, requestOptions)
                    setIsEditing(!isEditing)
                  }}
                >
                  <Typography>Save</Typography>
                </Button>
              </Grid>

              {/* account info form */}
              <Grid item>
                <EditAccountCard userProfile={props} />
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
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileDetails, setUserProfileDetails] = useState({
    Email_ID: '',
    FirstName: '',
    LastName: '',
    AccountType: '',
    UserBio: '',
    TotalPoints: '',
    SponsorEmailID: '',
  })

  function setProfileState(state) {
    setUserProfileDetails(state)
  }

  useEffect(() => {
    ;(async () => {
      const user = await Auth.currentAuthenticatedUser()
      let user_email = user.attributes.email

      // get user's data
      let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${user_email}`
      const response = await fetch(GET_USERDATA_URL)
      const data = await response.json()
      let profile_details = {
        Email_ID: data.Item.Email_id,
        FirstName: data.Item.FirstName,
        LastName: data.Item.LastName,
        UserBio: data.Item.UserBio,
        AccountType: data.Item.AccountType,
        SponsorEmailID: data.Item.SponsorEmailID,
        TotalPoints: data.Item.TotalPoints,
      }
      setUserProfileDetails(profile_details)

      setIsLoading(false)
    })()
  }, [])

  return (
    <div className={classes.root}>
      {/* layout stuff */}
      <LeftDrawer />
      <TopAppBar pageTitle="Your profile" />

      {/* content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {isLoading ? (
          <div></div>
        ) : (
          <ProfilePageContent
            userProfile={userProfileDetails}
            setProfileState={setProfileState}
          />
        )}
      </main>
    </div>
  )
}

export default ProfilePage
