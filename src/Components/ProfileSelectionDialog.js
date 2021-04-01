import React, { useContext, useEffect, useState } from 'react'
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
import LoadingIcon from './LoadingIcon'

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
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  const handleClickOpen = () => {
    props.dialogProps.setProfileSelectionDialogIsOpenState(true)
  }
  const handleClose = () => {
    props.dialogProps.setProfileSelectionDialogIsOpenState(false)
  }

  const [sponsorsInOrganization, setSponsorsInOrganization] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      let GET_ORG_SPONSORS_URL = `https://xqgw415uwe.execute-api.us-east-1.amazonaws.com/dev/getorgsponsors?Organization=${userData.Organization.replace(
        ' ',
        '%20',
      )}`
      let org_sponsors_raw = await fetch(GET_ORG_SPONSORS_URL)
      let org_sponsors_json = await org_sponsors_raw.json()
      let org_sponsors_parsed = JSON.parse(org_sponsors_json.body.toString())
      console.log(org_sponsors_parsed)
      let org_sponsors_formatted = org_sponsors_parsed.Items.filter(
        (element) => parseInt(element.AccountStatus.N) < 2,
      ).map((element) => {
        console.log(element)
        return {
          Username: element.Username.S,
          Name: element.FirstName.S + ' ' + element.LastName.S,
        }
      })

      setSponsorsInOrganization(org_sponsors_formatted)
    })()
    setIsLoading(false)
  }, [])

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
                Log in to a profile
              </Typography>
            </Grid>
          </Grid>

          <Grid item align="center" xs={12}>
            <br />
          </Grid>

          {isLoading || !sponsorsInOrganization ? (
            <LoadingIcon />
          ) : (
            <Grid container justify="center" spacing={3}>
              {sponsorsInOrganization.map((element) => {
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
                      getUserDetails(element.Username).then((chosen_user) => {
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
                      {element.Name}
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
          )}

          <Grid item align="center" xs={12}>
            <br />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}
