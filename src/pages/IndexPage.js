import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Typography from '@material-ui/core/Typography'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import WaitingForApplicationApprovalScreen from '../Components/WaitingForApplicationAprovalScreen'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LoadingIcon from '../Components/LoadingIcon'

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

function IndexPage() {
  const classes = useStyles()
  let history = useHistory()
  const [isLoading, setIsLoading] = useState(true)
  const [userProfileDetails, setUserProfileDetails] = useState({
    Email_ID: '',
    AccountType: '',
    SponsorID: null,
    ApplicationStatus: null,
  })

  async function getUserData() {
    setIsLoading(true)
    const user = await Auth.currentAuthenticatedUser()

    let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${user.attributes.email}`
    let response = await fetch(GET_USERDATA_URL)
    let data = await response.json()

    // load the user's account type into state
    let newUserProfileDetails = userProfileDetails
    userProfileDetails.Email_ID = data.Item.Email_id
    userProfileDetails.AccountType = data.Item.AccountType
    userProfileDetails.SponsorID = data.Item.SponsorEmailID
    userProfileDetails.ApplicationStatus = data.Item.ApplicationStatus
    setUserProfileDetails(newUserProfileDetails)

    console.log(newUserProfileDetails)
    setIsLoading(false)
  }

  useEffect(() => {
    // start loading animation
    setIsLoading(true)
    ;(async () => {
      await getUserData()
      if (userProfileDetails.ApplicationStatus <= 1) {
        setInterval(getUserData, 10000)
      }

      // if the user has no specified account type, force them to set up an account
      if (!userProfileDetails.AccountType) {
        history.push('/account-setup')
      }
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
    if (
      userProfileDetails.AccountType === 'Driver' &&
      userProfileDetails.ApplicationStatus <= 1
    ) {
      return <WaitingForApplicationApprovalScreen />
    } else {
      return (
        <div className={classes.root}>
          {/* layout stuff */}
          <TopAppBar pageTitle="Home"></TopAppBar>
          <LeftDrawer AccountType={userProfileDetails.AccountType} />

          {/* page content (starts after first div) */}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Typography paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Rhoncus dolor purus non enim praesent elementum facilisis leo vel.
              Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
              gravida rutrum quisque non tellus. Convallis convallis tellus id
              interdum velit laoreet id donec ultrices. Odio morbi quis commodo
              odio aenean sed adipiscing. Amet nisl suscipit adipiscing bibendum
              est ultricies integer quis. Cursus euismod quis viverra nibh cras.
              Metus vulputate eu scelerisque felis imperdiet proin fermentum
              leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt
              lobortis feugiat vivamus at augue. At augue eget arcu dictum
              varius duis at consectetur lorem. Velit sed ullamcorper morbi
              tincidunt. Lorem donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          </main>
        </div>
      )
    }
  }
}

export default IndexPage
