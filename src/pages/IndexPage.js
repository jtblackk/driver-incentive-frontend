import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import WaitingForApplicationApprovalScreen from '../Components/WaitingForApplicationAprovalScreen'
import { makeStyles } from '@material-ui/core/styles'
import { Auth } from 'aws-amplify'
import { DRAWER_WIDTH } from '../Helpers/Constants'
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

// loading icon that shows up when waiting for data to load

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

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const user = await Auth.currentAuthenticatedUser()

      let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${user.attributes.email}`
      let response = await fetch(GET_USERDATA_URL)
      let data = await response.json()

      let newUserProfileDetails = userProfileDetails
      userProfileDetails.Email_ID = data.Item.Email_id
      userProfileDetails.FirstName = data.Item.FirstName
      userProfileDetails.LastName = data.Item.LastName
      userProfileDetails.UserBio = data.Item.UserBio
      userProfileDetails.AccountType = data.Item.AccountType
      userProfileDetails.SponsorID = data.Item.SponsorEmailID
      userProfileDetails.TotalPoints = data.Item.TotalPoints
      setUserProfileDetails(newUserProfileDetails)
      setIsLoading(false)

      if (!userProfileDetails.AccountType) {
        history.push('/account-setup')
      }
    })()
  }, [])

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
      !userProfileDetails.SponsorID
    ) {
      return <WaitingForApplicationApprovalScreen />
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
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
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
