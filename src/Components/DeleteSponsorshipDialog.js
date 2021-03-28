import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Divider, Grid, Typography } from '@material-ui/core'

export default function DeleteSponsorshipDialog(props) {
  const handleClickOpen = () => {
    props.dialogProps.setDialogIsOpen(true)
  }

  const handleClose = () => {
    props.dialogProps.setDialogIsOpen(false)
  }

  return (
    <div>
      <Dialog
        open={props.dialogProps.dialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'End sponsorship?'}</DialogTitle>
        <DialogContent>
          <Grid container spacing="2">
            <Grid item xs={12}>
              <Typography>
                Are you sure you want to end this sponsorship? This <b>can</b>{' '}
                be undone in the future.
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              // props.parentProps.handleClose(true)
            }}
            color="primary"
          >
            No
          </Button>
          <Button
            onClick={() => {
              let SAVE_APPLICATION_RESPONSE_URL =
                'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/updatesponsorshipinfo'
              let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  SponsorID: props.parentProps.selectedDriverData.SponsorID,
                  DriverID: props.parentProps.selectedDriverData.DriverID,
                  Status: 3,
                }),
              }
              fetch(SAVE_APPLICATION_RESPONSE_URL, requestOptions)
                .then(() => {
                  let newDriverDataState = props.parentProps.allDriverData.map(
                    (element) => {
                      if (
                        element.Username ===
                        props.parentProps.selectedDriverData.DriverID
                      ) {
                        return {
                          ...element,
                          Status: 3,
                        }
                      } else {
                        return element
                      }
                    },
                  )
                  props.parentProps.setAllDriverDataState(newDriverDataState)
                })
                .then(() => {
                  handleClose()
                  props.parentProps.handleClose(true)
                })
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}