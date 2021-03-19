import React, { useContext } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { Grid, Paper } from '@material-ui/core'
import getUserDetails from '../Helpers/CommonFunctions'
import { UserContext } from '../Helpers/UserContext'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions)

export default function ProfileSelectionDialog(props) {
  console.log(props)
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  const handleClickOpen = () => {
    props.dialogProps.setProfileSelectionDialogIsOpenState(true)
  }
  const handleClose = () => {
    props.dialogProps.setProfileSelectionDialogIsOpenState(false)
  }

  const sponsor_profiles = [
    { Username: 'jtblack@g.clemson.edu', name: 'Jeff Black' },
    { Username: 'team11sponsordemo@gmail.com', name: 'Demo supersponsor' },
    { Username: 'sponsor_profile_demo_1', name: 'Demo sponsor' },
    { Username: 'team11driverdemo@gmail.com', name: 'Demo driver' },
  ]

  return (
    <div>
      <Dialog
        onClose={null}
        aria-labelledby="customized-dialog-title"
        open={props.dialogProps.profileSelectionDialogIsOpen}
        fullWidth
        maxWidth="md"
      >
        <Grid container style={{ padding: 20 }}>
          <Grid item xs={12} container justify="flex-start" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" id="alert-dialog-title">
                Choose a profile
              </Typography>
            </Grid>
          </Grid>

          <Grid item align="center" xs={12}>
            <br />
          </Grid>

          {/* <Grid container item xs={7} justify="center" component={Paper}> */}
          {/* TODO: display all available profiles on the account */}
          <Grid container justify="center" spacing={3}>
            {sponsor_profiles.map((element) => {
              return (
                <Grid
                  key={element.Username}
                  item
                  container
                  spacing={2}
                  xs={4}
                  component={Paper}
                  style={{ cursor: 'pointer', margin: 10 }}
                  onClick={(event) => {
                    console.log(element.Username)
                    getUserDetails(element.Username).then((chosen_user) => {
                      console.log(chosen_user)
                      setUserData(chosen_user)
                      props.dialogProps.setActiveProfile(chosen_user)
                      handleClose()
                    })
                  }}
                >
                  {/* <Paper style={{ padding: 20, cursor: 'pointer' }}> */}
                  <Grid item align="center" xs={12}>
                    <br />
                  </Grid>
                  <Grid item align="center" xs={12}>
                    {element.name}
                  </Grid>
                  <Grid item align="center" xs={12}>
                    {element.Username}
                  </Grid>
                  <Grid item align="center" xs={12}>
                    <br />
                  </Grid>
                  {/* </Paper> */}
                </Grid>
              )
            })}
          </Grid>

          {/* </Grid> */}

          <Grid item align="center" xs={12}>
            <br />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}
