import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { AppBar, CircularProgress, Grid, Toolbar } from '@material-ui/core'

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

function IndexPage() {
  const classes = useStyles()
  let history = useHistory()

  const [userProfileDetails, setUserProfileDetails] = useState({
    Email_ID: '',
    FirstName: '',
    LastName: '',
    AccountType: '',
    UserBio: '',
    TotalPoints: '',
    SponsorEmailID: '',
  })

  useEffect(() => {
    // check if the current user has registered their account details. if they have not, take them to the account setup page.
    Auth.currentAuthenticatedUser().then((user) => {
      let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${user.attributes.email}`
      fetch(GET_USERDATA_URL)
        .then((response) => response.json())
        .then((data) => {
          if (!data.Item.AccountType) history.push('/account-setup')
          setUserProfileDetails({
            Email_ID: data.Item.Email_id,
            FirstName: data.Item.FirstName,
            LastName: data.Item.LastName,
            UserBio: data.Item.UserBio,
            AccountType: data.Item.AccountType,
            SponsorID: data.Item.SponsorEmailID,
            TotalPoints: data.Item.TotalPoints,
          })
        })
    })
  }, [])

  if (
    userProfileDetails.AccountType === 'Driver' &&
    !userProfileDetails.SponsorID
  ) {
    return (
      <div className={classes.root}>
        {/* app bar */}
        <AppBar position="fixed">
          <Toolbar>
            <Grid container justify="space-evenly" spacing={24}>
              <Grid item>
                <Typography variant="h6">
                  Waiting for driver application approval
                </Typography>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container justify="center">
            <Grid item xs={8} sm={6} md={5} lg={3} align="center">
              <CircularProgress></CircularProgress>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Welcome"></TopAppBar>
        <LeftDrawer />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
            dolor purus non enim praesent elementum facilisis leo vel. Risus at
            ultrices mi tempus imperdiet. Semper risus in hendrerit gravida
            rutrum quisque non tellus. Convallis convallis tellus id interdum
            velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean
            sed adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
            integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
            eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
            quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
            vivamus at augue. At augue eget arcu dictum varius duis at
            consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
            ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
            elementum integer enim neque volutpat ac tincidunt. Ornare
            suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
            volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
            ornare massa eget egestas purus viverra accumsan in. In hendrerit
            gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
            aliquam sem et tortor. Habitant morbi tristique senectus et.
            Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
            euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
            ultrices sagittis orci a.
          </Typography>
        </main>
      </div>
    )
  }
}

export default IndexPage
