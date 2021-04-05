import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Divider, Grid, Typography } from '@material-ui/core'

export default function ViewSponsorAsDriverDialog(props) {
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
          {props.dialogProps.selectedEntry ? (
            <Grid container spacing="2">
              <Grid item xs={12}>
                <Typography>
                  {JSON.stringify(
                    props.dialogProps.allSponsorshipsData.find(
                      (element) =>
                        element.SponsorID ===
                        props.dialogProps.selectedEntry.SponsorID,
                    ),
                  )}
                </Typography>
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
