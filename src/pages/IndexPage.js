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
  const [isLoading, setIsLoading] = useState(true)
  const classes = useStyles()
  let history = useHistory()
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser
  const activeProfile = useContext(UserContext).activeProfile
  const setActiveProfile = useContext(UserContext).setActiveProfile

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

  async function getUserData() {
    setIsLoading(true)
    getUserDetails().then((newUserProfileDetails) => {
      setUserData(newUserProfileDetails)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    ;(async () => {
      // start loading animation
      setIsLoading(true)

      console.log(userData)
      console.log(activeProfile)
      if (userData.AccountStatus === 0) {
        history.push('/account-setup')
      } else if (
        userData.AccountType === 'Sponsor' &&
        !userData.Organization &&
        !activeProfile
      ) {
        history.push('/organization-setup')
      } else if (
        userData.AccountType === 'Sponsor' &&
        userData.Organization &&
        !activeProfile
      ) {
        console.log('enable profile selection dialog')
        setProfileSelectionDialogIsOpenState(true)
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
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Home"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        <ProfileSelectionDialog
          dialogProps={{
            profileSelectionDialogIsOpen: profileSelectionDialogIsOpen,
            setProfileSelectionDialogIsOpenState: setProfileSelectionDialogIsOpenState,
            fullPageUpdateState: fullPageUpdateState,
            activeProfile: activeProfile,
            setActiveProfile: setActiveProfile,
          }}
        />

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
            ornare massa eget egestas viverra accumsan in. In hendrerit gravida
            rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
            et tortor. Habitant morbi tristique senectus et. Adipiscing elit
            duis tristique sollicitudin nibh sit. Ornare aenean euismod
            elementum nisi quis eleifend. Commodo viverra maecenas accumsan
            lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices
            sagittis orci a.
          </Typography>
        </main>
      </div>
    )
  }
}

export default IndexPage
