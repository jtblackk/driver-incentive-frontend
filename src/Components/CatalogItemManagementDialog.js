import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import { Divider, Grid, Paper } from '@material-ui/core'

import parse from 'html-react-parser'

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

export default function CatalogItemManagementDialog(props) {
  console.log(props)
  const handleClose = () => {
    props.dialogProps.setItemManagementDialogIsOpenState(false)
  }

  let left_col_width = 4
  let right_col_width = 7

  if (props.dialogProps.selectedCatalogEntry) {
    return (
      <div>
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={props.dialogProps.itemManagementDialogIsOpen}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Ebay Item
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} justify="flex-start">
              <Grid item container xs={12} spacing={2} justify="flex-start">
                <Grid item xs={left_col_width} align="center">
                  <img
                    src={props.dialogProps.selectedCatalogEntry.PhotoURL}
                    alt="alt text"
                    style={{ maxWidth: '300px' }}
                  />
                </Grid>
                <Grid
                  item
                  xs={right_col_width}
                  container
                  alignItems="flex-start"
                  direction="row"
                >
                  <Grid item xs={12} align="left">
                    <b>{props.dialogProps.selectedCatalogEntry.Name}</b>
                  </Grid>
                  <Grid item xs={12} align="left">
                    ${props.dialogProps.selectedCatalogEntry.Price}
                  </Grid>

                  <Grid item xs={12} align="left">
                    <Button variant="contained" color="primary">
                      Add to catalog
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item container xs={12}>
                <Grid item xs={12} align="center">
                  <Typography>
                    <b>Ebay Description</b>
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {parse(props.dialogProps.selectedCatalogEntry.Description)}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  put item controls here (remove item button)
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    )
  } else {
    return null
  }
}
