import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../Helpers/UserContext'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import TopAppBar from '../Components/TopAppBar'
import UserProfileCard from '../Components/UserProfileCard'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LeftDrawer from '../Components/LeftDrawer'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import EditAccountCard from '../Components/EditAccountCard'
import LoadingIcon from '../Components/LoadingIcon'
import Amplify, { Storage, Auth } from 'aws-amplify'
import aws_exports from '../aws-exports'

Amplify.configure(aws_exports)

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
  const [isLoading, setIsLoading] = useState(false)
  const [newData, setNewData] = useState({
    Email_ID: props.userProfile.Email_ID,
    FirstName: props.userProfile.FirstName,
    LastName: props.userProfile.LastName,
    UserBio: props.userProfile.UserBio,
    AccountType: props.userProfile.AccountType,
    SponsorEmailID: props.userProfile.SponsorEmailID,
    TotalPoints: props.userProfile.TotalPoints,
    ProfilePicture: props.userProfile.ProfilePicture,
  })
  function setNewDataState(state) {
    setNewData(state)
  }

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
              {/* edit button */}
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
              <UserProfileCard userProfile={props.userProfile} />
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
                    ;(async () => {
                      setIsEditing(!isEditing)
                      setNewData({
                        Email_ID: props.userProfile.Email_ID,
                        FirstName: props.userProfile.FirstName,
                        LastName: props.userProfile.LastName,
                        UserBio: props.userProfile.UserBio,
                        AccountType: props.userProfile.AccountType,
                        SponsorEmailID: props.userProfile.SponsorEmailID,
                        TotalPoints: props.userProfile.TotalPoints,
                        ProfilePicture: props.userProfile.ProfilePicture,
                      })
                    })()
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
                    ;(async () => {
                      setIsLoading(true)
                      // const s3Key = await Storage.put(
                      //   `${props.userProfile.Email_ID}-profile-pic`,
                      //   'howdy!',
                      // )
                      // console.log(
                      //   Storage.get(
                      //     `${props.userProfile.Email_ID}-profile-pic`,
                      //   ),
                      // )
                      console.log(newData)
                      // TODO: set up this api call to update the image url in UserDetails
                      let SAVE_USER_PROFILE_URL =
                        'https://xgfsi0wpb0.execute-api.us-east-1.amazonaws.com/dev/'

                      // todo: set up this to use newData
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
                      const result = await fetch(
                        SAVE_USER_PROFILE_URL,
                        requestOptions,
                      )

                      setIsEditing(!isEditing)
                      setIsLoading(false)
                    })()
                  }}
                >
                  <Typography>Save</Typography>
                </Button>
              </Grid>
              <br></br>

              {/* account info form */}
              <Grid item>
                <EditAccountCard
                  userProfile={newData}
                  setNewDataState={setNewDataState}
                />
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
  const [isLoading, setIsLoading] = useState(false)
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  function setProfileState(state) {
    setUserData(state)
  }

  return (
    <div className={classes.root}>
      {/* layout stuff */}
      <LeftDrawer AccountType={userData.AccountType} />
      <TopAppBar pageTitle="Your profile" />

      {/* content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <ProfilePageContent
            userProfile={userData}
            setProfileState={setUserData}
          />
        )}
      </main>
    </div>
  )
}

export default ProfilePage
