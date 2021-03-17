import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Divider, Grid, Typography } from '@material-ui/core'

export default function AddCatalogItemDialog(props) {
  const handleClickOpen = () => {
    props.dialogProps.setAddItemDialogIsOpenState(true)
  }

  const handleClose = () => {
    props.dialogProps.setAddItemDialogIsOpenState(false)
  }

  return (
    <div>
      <Dialog
        open={props.dialogProps.addItemDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Select items to add'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing="2">
            <Grid item xs={12}>
              <Typography>
                display selectable items here (filter out items that are already
                owned)
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  )
}
