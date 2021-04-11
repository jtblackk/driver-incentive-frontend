/* eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Typography from '@material-ui/core/Typography'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LoadingIcon from '../Components/LoadingIcon'
import { UserContext } from '../Helpers/UserContext'
import getUserDetails from '../Helpers/CommonFunctions'
import { Grid, MenuItem, Select } from '@material-ui/core'

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

export default function SponsorshipManagementPage() {
  const classes = useStyles()
  const userData = useContext(UserContext).user

  const [isLoading, setIsLoading] = useState(true)
  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }

  const [allSponsors, setAllSponsors] = useState(null)
  const [currentSponsor, setCurrentSponsor] = useState(null)

  useEffect(() => {
    ;(async () => {
      // start loading animation
      setIsLoading(true)
      // TODO: get all the sponsors in the app w/ their organization name
      let GET_SPONSORS_URL =
        'https://2cw17jd576.execute-api.us-east-1.amazonaws.com/dev/sponsorlist'
      let sponsors_response = await fetch(GET_SPONSORS_URL)
      let sponsors_json = await sponsors_response.json()
      let sponsors_parsed = JSON.parse(sponsors_json.body)
      let sponsors_list = sponsors_parsed.Items.map((element) => {
        return {
          AccountStatus: parseInt(element.AccountStatus.N),
          Organization: element.Organization.S,
          Name: element.FirstName.S + ' ' + element.LastName.S,
          Username: element.Username.S,
        }
      }).filter((element) => element.AccountStatus === 1)
      setAllSponsors(sponsors_list)
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
        <TopAppBar
          pageTitle="Sponsorships"
          customItem={
            <Grid item xs={12} container justify="space-between">
              <Grid item align="left">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={
                    currentSponsor && currentSponsor.Username
                      ? currentSponsor.Username
                      : null
                  }
                  variant="standard"
                  style={{ color: 'white' }}
                  fullWidth
                >
                  {allSponsors
                    ? allSponsors.map((element) => (
                        <MenuItem
                          onClick={() => {
                            setCurrentSponsor(element)
                          }}
                          value={element.Username}
                        >
                          {element.Organization + ': ' + element.Name}
                        </MenuItem>
                      ))
                    : null}
                </Select>
              </Grid>
            </Grid>
          }
        />

        <LeftDrawer AccountType={userData.AccountType} />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!isLoading ? (
            !currentSponsor ? (
              <Grid container>
                <Grid item>
                  <p>Choose a sponsor to view their sponsorships</p>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item>
                  <p>render the sponsorship's data</p>
                </Grid>
              </Grid>
            )
          ) : (
            <LoadingIcon />
          )}
        </main>
      </div>
    )
  }
}
