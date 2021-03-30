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

export default function ChooseCatalogSponsorDialog(props) {
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  const handleClickOpen = () => {
    props.dialogProps.setDialogIsOpenState(true)
  }
  const handleClose = () => {
    props.dialogProps.setDialogIsOpenState(false)
  }

  const [registeredSponsors, setRegisteredSponsors] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      let GET_DRIVERS_SPONSORS_URL = `https://8mhdaeq2kl.execute-api.us-east-1.amazonaws.com/dev/getuserdetails/?DriverID=${userData.Username}`
      let partnered_sponsors_response = await fetch(GET_DRIVERS_SPONSORS_URL)
      let partnered_sponsors_data = await partnered_sponsors_response.json()
      let partnered_sponsors_array = JSON.parse(
        partnered_sponsors_data.body.toString(),
      ).Items

      let active_sponsors_array = partnered_sponsors_array.filter(
        (element) => parseInt(element.Status.N) === 2,
      )

      let active_sponsors_formatted = active_sponsors_array.map((element) => {
        return {
          SponsorID: element.SponsorID.S,
          SponsorName: element.FirstName.S + ' ' + element.LastName.S,
          Points: parseInt(element.Points.N),
          SponsorOrganization: element.Organization.S,
          PointToDollarRatio: parseFloat(element.PointDollarRatio.N),
        }
      })

      setRegisteredSponsors(active_sponsors_formatted)
    })()
    setIsLoading(false)
  }, [])

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.dialogProps.dialogIsOpen}
        fullWidth
        maxWidth="md"
      >
        <Grid container style={{ padding: 20 }}>
          <Grid item xs={12} container justify="flex-start" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" id="alert-dialog-title">
                Which sponsor's catalog do you want to view?
              </Typography>
            </Grid>
          </Grid>

          <Grid item align="center" xs={12}>
            <br />
          </Grid>

          {isLoading || !registeredSponsors ? (
            <LoadingIcon />
          ) : (
            <Grid container justify="center" spacing={3}>
              {registeredSponsors.map((element) => {
                return (
                  <Grid
                    key={element.SponsorID}
                    item
                    container
                    spacing={2}
                    xs={4}
                    component={Paper}
                    style={{ cursor: 'pointer', margin: 10 }}
                    onClick={(event) => {
                      props.dialogProps.setActiveSponsor({
                        SponsorID: element.SponsorID,
                        Points: element.Points,
                        PointToDollarRatio: element.PointToDollarRatio,
                      })

                      handleClose()
                    }}
                  >
                    {/* <Paper style={{ padding: 20, cursor: 'pointer' }}> */}
                    <Grid item align="center" xs={12}>
                      <br />
                    </Grid>
                    <Grid item align="center" xs={12}>
                      {element.SponsorID}
                    </Grid>
                    <Grid item align="center" xs={12}>
                      {element.SponsorName}
                    </Grid>
                    <Grid item align="center" xs={12}>
                      {element.SponsorOrganization}
                    </Grid>

                    <Grid item align="center" xs={12}>
                      {element.Points} points
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
