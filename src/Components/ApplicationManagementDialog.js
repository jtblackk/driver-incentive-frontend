import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box, Divider, Grid, IconButton, Paper } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

export default function ApplicationManagementDialog(props) {
  // console.log(props)

  const handleClose = (refresh) => {
    props.setDialogIsOpenState(false, refresh)
  }

  const [decisionReason, setDecisionReason] = useState(null)

  let applicationFields = [
    {
      name: 'Email',
      prop: props.applicationDetails.applicantEmail,
    },
    {
      name: 'Name',
      prop:
        props.applicationDetails.applicantFirstName +
        ' ' +
        props.applicationDetails.applicantLastName,
    },
    {
      name: 'Bio',
      prop: props.applicationDetails.applicantBio,
    },
    {
      name: 'Comments',
      prop: props.applicationDetails.applicantComments,
    },
    {
      name: 'Submission date',
      prop: props.applicationDetails.submissionDate,
    },
  ]

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
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <DialogTitle id="form-dialog-title">
              Driver's Application
            </DialogTitle>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                handleClose(false)
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container item component={Paper} xs={12}>
          <DialogContent>
            <Grid
              item
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="space-evenly"
            >
              {applicationFields.map((field) => {
                return (
                  <Grid
                    container
                    direction="row"
                    spacing={COLUMN_SPACING}
                    justify="space-evenly"
                  >
                    <Grid item xs={LEFT_COL_WIDTH}>
                      <DialogContentText>
                        <Box textAlign="right" fontWeight="fontWeightBold">
                          {field.name}:
                        </Box>
                      </DialogContentText>
                    </Grid>
                    <Grid item xs={RIGHT_COL_WIDTH}>
                      <DialogContentText>
                        <Box textAlign="left">{field.prop}</Box>
                      </DialogContentText>
                    </Grid>
                  </Grid>
                )
              })}

              <Grid item xs={12}>
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

              <Grid item xs={12}></Grid>

              <Grid
                container
                direction="row"
                spacing={COLUMN_SPACING}
                justify="space-evenly"
              >
                <Grid item xs={7} align="right">
                  <Grid container item xs={12} justify="flex-end">
                    <Grid item xs={3}>
                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          if (!decisionReason) {
                            return
                          }

                          let SAVE_APPLICATION_RESPONSE_URL =
                            'https://k6q4diznde.execute-api.us-east-1.amazonaws.com/dev/applicationresponse'
                          let requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              applicant_email:
                                props.applicationDetails.applicantEmail,
                              SponsorEmailID:
                                props.applicationDetails.sponsorEmail,
                              decision: 'denied',
                              decisionReason: decisionReason,
                              applicationStatus: 0,
                            }),
                          }
                          fetch(
                            SAVE_APPLICATION_RESPONSE_URL,
                            requestOptions,
                          ).then(() => {
                            handleClose(true)
                          })
                        }}
                      >
                        Reject
                      </Button>
                    </Grid>

                    <Grid item xs={3}>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={() => {
                          if (!decisionReason) {
                            return
                          }

                          let SAVE_APPLICATION_RESPONSE_URL =
                            'https://k6q4diznde.execute-api.us-east-1.amazonaws.com/dev/applicationresponse'
                          let requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              applicant_email:
                                props.applicationDetails.applicantEmail,
                              SponsorEmailID:
                                props.applicationDetails.sponsorEmail,
                              decision: 'accepted',
                              decisionReason: decisionReason,
                              applicationStatus: 2,
                            }),
                          }
                          fetch(
                            SAVE_APPLICATION_RESPONSE_URL,
                            requestOptions,
                          ).then(() => {
                            handleClose(true)
                          })
                        }}
                      >
                        Accept
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <br />
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
    </div>
  )
}
