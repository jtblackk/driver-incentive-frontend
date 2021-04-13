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
import { Divider, Grid, Paper } from '@material-ui/core'
import SponsorInvoiceView from '../Components/InvoicePages/SponsorInvoiceView'
import OrganizationInvoiceView from '../Components/InvoicePages/OrganizationInvoiceView'

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

export default function SponsorInvoicePage() {
  const classes = useStyles()
  const userData = useContext(UserContext).activeProfile
    ? useContext(UserContext).activeProfile
    : useContext(UserContext).user
  //   const userData = useContext(UserContext).activeProfile

  console.log(userData)

  const [isLoading, setIsLoading] = useState(true)
  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
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
        <TopAppBar pageTitle="Invoices"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {!isLoading ? (
            <Grid container justify="flex-start">
              {userData.Username.includes('@') ? (
                <Grid container>
                  <OrganizationInvoiceView
                    Organization={userData.Organization}
                  />
                  <Grid item xs={12}>
                    <br />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      {' '}
                      sponsor selection drop-down goes here
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                  </Grid>
                  <SponsorInvoiceView SponsorID={'jtblack@g.clemson.edu'} />
                </Grid>
              ) : (
                <Grid container>
                  <SponsorInvoiceView SponsorID={userData.Username} />
                </Grid>
              )}
            </Grid>
          ) : (
            <LoadingIcon />
          )}
        </main>
      </div>
    )
  }
}
