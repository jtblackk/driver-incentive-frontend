/* eslint-disable*/
import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Box, Grid, Typography } from '@material-ui/core'

export default function ViewSponsorAsDriverDialog(props) {
  const handleClose = () => {
    props.dialogProps.setDialogIsOpen(false)
  }

  let sponsorshipInfo =
    props.dialogProps.allSponsorshipsData && props.dialogProps.selectedEntry
      ? props.dialogProps.allSponsorshipsData.find(
          (element) =>
            element.SponsorID === props.dialogProps.selectedEntry.SponsorID,
        )
      : null

  const left_col_width = 4
  const right_col_width = 6

  return (
    <div>
      <Dialog
        open={props.dialogProps.dialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Sponsorship information: ' +
            props.dialogProps.allSponsorshipsData &&
          props.dialogProps.selectedEntry
            ? sponsorshipInfo.Organization +
              ': ' +
              sponsorshipInfo.FirstName +
              ' ' +
              sponsorshipInfo.LastName
            : null}
        </DialogTitle>
        <DialogContent>
          {props.dialogProps.allSponsorshipsData &&
          props.dialogProps.selectedEntry ? (
            <Grid container spacing="2">
              <Grid item xs={12}>
                <Typography>{JSON.stringify(sponsorshipInfo)}</Typography>
              </Grid>
              <Grid item container xs={12} justify="center" spacing={2}>
                <Grid item xs={left_col_width} align="right">
                  <Typography>
                    <Box fontWeight="bold">Sponsor Bio: </Box>
                  </Typography>
                </Grid>
                <Grid item xs={right_col_width} align="left">
                  <Typography>{sponsorshipInfo.Bio}</Typography>
                </Grid>
              </Grid>

              {/* sponsored since*/}
              {sponsorshipInfo.Status > 1 ? (
                <Grid item container xs={12} justify="center" spacing={2}>
                  <Grid item xs={left_col_width} align="right">
                    <Typography>
                      <Box fontWeight="bold">Sponsored since: </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs={right_col_width} align="left">
                    <Typography>
                      {Date.parse(
                        sponsorshipInfo.AppDecisionDate,
                      ).toUTCString()}
                    </Typography>
                  </Grid>
                </Grid>
              ) : null}

              {/* sponsored because */}

              <Grid item container xs={12} justify="center" spacing={2}>
                <Grid item xs={left_col_width} align="right">
                  <Typography>
                    <Box fontWeight="bold">Sponsored because: </Box>
                  </Typography>
                </Grid>
                <Grid item xs={right_col_width} align="left">
                  <Typography>{sponsorshipInfo.AppDecisionReason}</Typography>
                </Grid>
              </Grid>

              {/* total points */}

              <Grid item container xs={12} justify="center" spacing={2}>
                <Grid item xs={left_col_width} align="right">
                  <Typography>
                    <Box fontWeight="bold">Total points: </Box>
                  </Typography>
                </Grid>

                <Grid item xs={right_col_width} align="left">
                  <Typography>{sponsorshipInfo.Points}</Typography>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
