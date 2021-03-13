import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'

import DialogContentText from '@material-ui/core/DialogContentText'

import { Grid, Paper, TextField, Typography } from '@material-ui/core'

export default function SetAllPointRatiosDialog(props) {
  const [newPointDollarRatio, setNewPointDollarRatio] = useState(null)
  const [pointDollarRatio, setPointDollarRatio] = useState(null)
  const [helperText, setHelperText] = useState(null)

  const handleClose = (resp) => {
    props.setDialogIsOpen(false)
    props.setDialogResponse(resp)
    if (resp === true) {
      window.location.reload()
    } else {
    }
  }

  return (
    <div>
      <Dialog
        open={props.dialogIsOpen}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Grid container style={{ padding: 40 }} component={Paper}>
          <Grid item xs={12}>
            <Typography variant="h5" id="alert-dialog-title">
              Set all drivers' point to USD conversion
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <DialogContentText id="alert-dialog-description">
              Set the point to dollar conversion for all of your drivers. .005
              would mean that 1 point is worth .005 USD.
            </DialogContentText>
          </Grid>
          <Grid item xs={12}>
            <br />
          </Grid>
          <Grid
            item
            container
            spacing={3}
            justify="flex-start"
            alignItems="center"
          >
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Point value (USD)"
                variant="filled"
                defaultValue={pointDollarRatio}
                helperText={helperText}
                error={helperText}
                onChange={(event) => {
                  setNewPointDollarRatio(event.target.value)
                }}
                size="small"
              ></TextField>
            </Grid>

            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  if (!newPointDollarRatio) {
                    setHelperText('Need to provide a value')
                    return
                  } else if (!parseFloat(newPointDollarRatio)) {
                    setHelperText('Must enter a number')
                    return
                  } else if (newPointDollarRatio <= 0) {
                    setHelperText('Must be greater than 0')
                    return
                  } else {
                    setHelperText(null)
                  }

                  //   TODO: make api call to set all driver's point-to-dollar ratios to newPointDollarRatio
                  // console.log(pointDollarRatio)
                  // console.log(newPointDollarRatio)

                  handleClose(true)
                }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}
