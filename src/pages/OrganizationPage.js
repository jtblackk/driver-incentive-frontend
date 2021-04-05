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

  const [organizationUsers, setOrganizationUsers] = useState(null)
  function setOrganizationUsersState(state) {
    setOrganizationUsers(state)
  }

  const [terminatedUsers, setTerminatedUsers] = useState(null)
  function setTerminatedUsersState(state) {
    setTerminatedUsers(state)
  }

  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      let GET_ORG_USERS_URL = `https://xqgw415uwe.execute-api.us-east-1.amazonaws.com/dev/getorguserdata?Organization=${userData.Organization}`
      let org_users_raw = await fetch(GET_ORG_USERS_URL)
      let org_users_json = await org_users_raw.json()
      let org_users_array = await JSON.parse(org_users_json.body.toString())

      let org_users_array_formatted = org_users_array
        .map((element) => {
          if (element.AccountType.S === 'Sponsor') {
            return {
              Username: element.Username.S,
              AccountType: element.AccountType.S,
              AccountStatus: parseInt(element.AccountStatus.N),
              FirstName: element.FirstName.S,
              LastName: element.LastName.S,
              Bio: element.Bio.S,
              SignupDate: element.SignupDate.S.split('.')[0].replace(' ', 'T'),
              Organization: element.Organization.S,
            }
          } else if (element.AccountType.S === 'Driver') {
            console.log(element)
            return {
              Username: element.Username.S,
              AccountType: element.AccountType.S,
              AccountStatus: parseInt(element.AccountStatus.N),
              FirstName: element.FirstName.S,
              LastName: element.LastName.S,
              Bio: element.Bio.S,
              SignupDate: element.SignupDate.S.split('.')[0].replace(' ', 'T'),
              Status: parseInt(element.Status.N),
              Points: parseInt(element.Points.N),
              PointDollarRatio: parseFloat(element.PointDollarRatio.N),
            }
          }
        })
        .filter((element) => {
          return element.AccountStatus > 0
        })

      let not_banned_users = org_users_array_formatted.filter((element) => {
        return element.AccountStatus < 3
      })

      setOrganizationUsers(not_banned_users)
    })().then(() => {
      setIsLoading(false)
    })
  }, [pageUpdate])

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
            <Grid item container xs={10} xl={6}>
              <OrganizationContent
                orgProps={{
                  organizationUsers: organizationUsers,
                  setOrganizationUsersState: setOrganizationUsersState,
                }}
                pageProps={{
                  // TODO: be sure to call these functions on page update
                  updateCount: pageUpdate,
                  updatePage: fullPageUpdateState,
                }}
              />
            </Grid>

            <Grid xs={12} item>
              <br />
            </Grid>

            {/* supersponsor content: only renders for super sponsors */}
            <Grid item container xs={10} xl={6}>
              {userData.Username.includes('@') ? (
                <SuperSponsorContent
                  orgProps={{
                    organizationUsers: organizationUsers,
                    setOrganizationUsersState: setOrganizationUsersState,
                  }}
                  pageProps={{
                    // TODO: be sure to call these functions on page update
                    updateCount: pageUpdate,
                    updatePage: fullPageUpdateState,
                  }}
                />
              ) : null}
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

export default OrganizationPage
