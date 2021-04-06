import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Typography from '@material-ui/core/Typography'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import WaitingForApplicationApprovalScreen from '../Components/WaitingForApplicationAprovalScreen'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LoadingIcon from '../Components/LoadingIcon'
import { UserContext } from '../Helpers/UserContext'
import getUserDetails from '../Helpers/CommonFunctions'
import ProfileSelectionDialog from '../Components/ProfileSelectionDialog'
import { Grid } from '@material-ui/core'

// set up styling
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

export default function ReusablePage() {
  let history = useHistory()
  const classes = useStyles()
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser
  const activeProfile = useContext(UserContext).activeProfile
  const setActiveProfile = useContext(UserContext).setActiveProfile

  const [isLoading, setIsLoading] = useState(true)
  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }

  const [
    profileSelectionDialogIsOpen,
    setProfileSelectionDialogIsOpen,
  ] = useState(false)
  function setProfileSelectionDialogIsOpenState(state, refresh) {
    setProfileSelectionDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  useEffect(() => {
    ;(async () => {
      // start loading animation
      setIsLoading(true)

      setIsLoading(false)
    })()
  }, [])

  // show loading screen if data is still being fetched
  if (isLoading) {
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <LoadingIcon />
        </main>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Your orders"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* <ProfileSelectionDialog
          dialogProps={{
            profileSelectionDialogIsOpen: profileSelectionDialogIsOpen,
            setProfileSelectionDialogIsOpenState: setProfileSelectionDialogIsOpenState,
            fullPageUpdateState: fullPageUpdateState,
            activeProfile: activeProfile,
            setActiveProfile: setActiveProfile,
          }}
        /> */}

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container>
            <Grid item>
              <p>some stuff</p>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}
