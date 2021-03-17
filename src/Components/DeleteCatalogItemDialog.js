import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Divider, Grid, Typography } from '@material-ui/core'

export default function DeleteCatalogItemDialog(props) {
  const handleClickOpen = () => {
    props.dialogProps.setDeleteItemCatalogIsOpenState(true)
  }

  const handleClose = () => {
    props.dialogProps.setDeleteItemCatalogIsOpenState(false)
  }

  return (
    <div>
      <Dialog
        open={props.dialogProps.deleteItemCatalogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete all items?'}</DialogTitle>
        <DialogContent>
          <Grid container spacing="2">
            <Grid item xs={12}>
              <Typography>
                Are you sure you want to remove all items from your catalog?
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
