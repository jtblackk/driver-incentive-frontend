import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box, Divider, Grid, IconButton, Paper } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function ApplicationManagementDialog(props) {
  // console.log(props)
  // const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    // setOpen(true)
  }
  const handleClose = (refresh) => {
    props.setDialogIsOpenState(false, refresh)
  }

  const [decisionReason, setDecisionReason] = useState(null)

  let LEFT_COL_WIDTH = 5
  let RIGHT_COL_WIDTH = 6
  let COLUMN_SPACING = 1

  return (
    <div>
      <Dialog
        open={props.dialogIsOpen}
        onClose={() => {
          handleClose(false)
        }}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <Grid container xs={12} justify="space-between" direction="row">
          <Grid item>
            <DialogTitle id="form-dialog-title">
              Driver's Application
            </DialogTitle>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={() => {
                handleClose(false)
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container component={Paper} xs={12}>
          <DialogContent>
            <Grid
              item
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={LEFT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="right" fontWeight="fontWeightBold">
                    Email:
                  </Box>
                </DialogContentText>
              </Grid>

              <Grid item xs={RIGHT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="left">
                    {' '}
                    {props.applicationDetails.ApplicantEmail}
                  </Box>
                </DialogContentText>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={LEFT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="right" fontWeight="fontWeightBold">
                    Name:
                  </Box>
                </DialogContentText>
              </Grid>
              <Grid item xs={RIGHT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="left">
                    {props.applicationDetails.ApplicantFirstName +
                      ' ' +
                      props.applicationDetails.ApplicantLastName}
                  </Box>
                </DialogContentText>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={LEFT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="right" fontWeight="fontWeightBold">
                    Bio:
                  </Box>
                </DialogContentText>
              </Grid>
              <Grid item xs={RIGHT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="left">
                    {props.applicationDetails.ApplicantBio}
                  </Box>
                </DialogContentText>
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={LEFT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="right" fontWeight="fontWeightBold">
                    Comments:
                  </Box>
                </DialogContentText>
              </Grid>
              <Grid item xs={RIGHT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="left">
                    {props.applicationDetails.ApplicantComments}
                  </Box>
                </DialogContentText>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <br />
            </Grid>

            <Grid
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={LEFT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="right" fontWeight="fontWeightBold">
                    Submission date:
                  </Box>
                </DialogContentText>
              </Grid>
              <Grid item xs={RIGHT_COL_WIDTH}>
                <DialogContentText>
                  <Box textAlign="left">
                    {props.applicationDetails.SubmissionDate}
                  </Box>
                </DialogContentText>
              </Grid>
            </Grid>

            <Grid item>
              <br />
              <Divider />
              <br />
              <br />
            </Grid>

            <Grid
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={7} align="center">
                <TextField
                  variant="outlined"
                  label="Decision reason"
                  placeholder="Provide a reason for your decision"
                  multiline
                  rows={3}
                  autoFocus
                  fullWidth
                  error={!decisionReason}
                  onChange={(event) => {
                    setDecisionReason(event.target.value)
                  }}
                />
              </Grid>
            </Grid>

            <Grid
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              <Grid item xs={7} align="right">
                <Button
                  color="secondary"
                  onClick={() => {
                    if (!decisionReason) {
                      return
                    }

                    let updated_application = {
                      ...props.applicationDetails,
                      ApplicationResponse: 'denied',
                    }
                    // console.log(updated_application)

                    let SAVE_APPLICATION_RESPONSE =
                      'https://k6q4diznde.execute-api.us-east-1.amazonaws.com/dev/applicationresponse'
                    let requestOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        applicant_email: updated_application.ApplicantEmail,
                        // ApplicationStatus: 2,
                        SponsorEmailID: updated_application.SponsorEmail,
                        applicationStatus: 0,
                        decision: updated_application.ApplicationResponse,
                      }),
                    }
                    fetch(SAVE_APPLICATION_RESPONSE, requestOptions).then(
                      () => {
                        handleClose(true)
                      },
                    )
                  }}
                >
                  Reject
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={() => {
                    if (!decisionReason) {
                      return
                    }

                    let updated_application = {
                      ...props.applicationDetails,
                      ApplicationResponse: 'accepted',
                    }

                    // console.log(updated_application)

                    let SAVE_APPLICATION_RESPONSE =
                      'https://k6q4diznde.execute-api.us-east-1.amazonaws.com/dev/applicationresponse'
                    let requestOptions = {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        applicant_email: updated_application.ApplicantEmail,
                        SponsorEmailID: updated_application.SponsorEmail,
                        applicationStatus: 2,
                        decision: updated_application.ApplicationResponse,
                      }),
                    }
                    fetch(SAVE_APPLICATION_RESPONSE, requestOptions).then(
                      () => {
                        handleClose(true)
                      },
                    )
                    // handleClose(true)
                  }}
                >
                  Accept
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <br />
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
    </div>
  )
}
