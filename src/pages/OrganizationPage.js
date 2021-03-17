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
import { Grid, Paper } from '@material-ui/core'
import SuperSponsorContent from '../Components/SuperSponsorOrganizationContent'
import OrganizationContent from '../Components/OrganizationContent'
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

function OrganizationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  let history = useHistory()
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  useEffect(() => {
    setIsLoading(false)
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
        <TopAppBar pageTitle="Your organization"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container justify="center">
            <Grid item container xs={12} sm={11} md={8} lg={6} xl={4}>
              <OrganizationContent />
            </Grid>

            <Grid xs={12} item>
              <br />
            </Grid>

            {/* supersponsor content: only renders for super sponsors */}
            <Grid item container xs={12} sm={11} md={8} lg={6} xl={4}>
              {userData.Username.includes('@') ? <SuperSponsorContent /> : null}
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

export default OrganizationPage
