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

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // TODO: load oranization users data | waiting on  api
      let GET_ORG_USERS_URL = `https://xqgw415uwe.execute-api.us-east-1.amazonaws.com/dev/getorguserdata?Organization=${userData.Organization}`
      // let GET_ORG_USERS_URL = `https://xqgw415uwe.execute-api.us-east-1.amazonaws.com/dev/getorguserdata?Organization=the%20autobots`
      // let org_users_raw = await fetch(GET_ORG_USERS_URL)
      // let org_users_json = await org_users_raw.json()
      // let org_users_array = await JSON.parse(org_users_json.body.toString())
      // console.log(org_users_array)

      setOrganizationUsers([
        {
          Username: 'demo_driver_8@gmail.com',
          AccountStatus: 1,
          Bio:
            'Amateur social media nerd. Web enthusiast. Avid zombie geek. Certified pop cultureaholic.',
          Sponsors: [],
          SignupDate: '2021-03-10T02:15:05.245Z',
          FirstName: 'Beth',
          LastName: 'Contreras',
          AccountType: 'Driver',
        },
        {
          Username: 'demo_sponsor_1@gmail.com',
          AccountStatus: 1,
          Bio:
            'Amateur social media fan. Professional bacon trailblazer. Hardcore explorer. Award-winning tv expert. Friendly pop culture maven.',
          Sponsors: [],
          SignupDate: '2021-03-13T03:24:53.345Z',
          FirstName: 'Karlyn',
          LastName: 'Barrett',
          AccountType: 'Sponsor',
          Organization: 'Alamo Delivery',
        },

        {
          Username: 'team11sponsordemo@gmail.com',
          AccountStatus: 1,
          Bio:
            'Amateur social media fan. Professional bacon trailblazer. Hardcore explorer. Award-winning tv expert. Friendly pop culture maven.',
          Sponsors: [],
          SignupDate: '2021-03-14T03:24:53.345Z',
          FirstName: 'Cool',
          LastName: 'Sponsor',
          AccountType: 'Sponsor',
          Organization: 'Alamo Delivery',
        },
      ])
    })().then(() => {
      setIsLoading(false)
    })
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
            <Grid item container xs={10} xl={6}>
              <OrganizationContent
                orgProps={{
                  organizationUsers: organizationUsers,
                  setOrganizationUsersState: setOrganizationUsersState,
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
