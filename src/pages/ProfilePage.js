import React, { useEffect, useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'

import TopAppBar from '../Components/TopAppBar'
import UserProfileCard from '../Components/UserProfileCard'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LeftDrawer from '../Components/LeftDrawer'
import { Auth } from 'aws-amplify'
import { CircularProgress, Grid } from '@material-ui/core'
import LoadingIcon from '../Components/LoadingIcon'

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
