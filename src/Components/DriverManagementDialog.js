import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteSponsorshipDialog from './DeleteSponsorshipDialog'

import {
  AppBar,
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import GenericTable from './GenericTable'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from './LoadingIcon'
import UserProfileCard from './UserProfileCard'
require('datejs')

function DriverManagementTab(props) {
  // dialog control
  const [deleteProfileDialogIsOpen, setDeleteProfileDialogIsOpen] = useState(
    false,
  )
  function setDeleteProfileCatalogIsOpenState(state, refresh) {
    setDeleteProfileDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }

  const left_col_width = 4
  const right_col_width = 6

  return (
    <Grid container justify="center">
      <DeleteSponsorshipDialog
        dialogProps={{
          dialogIsOpen: deleteProfileDialogIsOpen,
          setDialogIsOpen: setDeleteProfileCatalogIsOpenState,
          pageUpdateFunc: fullPageUpdateState,
        }}
        parentProps={props}
      />
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>

      {/* AREA 1: sponsorship info */}
      {/* Labels */}
      <Grid
        item
        xs={7}
        container
        component={Paper}
        justify="center"
        align="center"
      >
        <Grid item xs={12}>
          <br />
        </Grid>

        {/* driver username */}
        <Grid item container xs={12} justify="center" spacing={2}>
          <Grid item xs={left_col_width} align="right">
            <Typography>
              <Box fontWeight="bold">Username: </Box>
            </Typography>
          </Grid>
          <Grid item xs={right_col_width} align="left">
            <Typography>{props.selectedDriverData.Username}</Typography>
          </Grid>
        </Grid>

        {/* driver name */}
        <Grid item container xs={12} justify="center" spacing={2}>
          <Grid item xs={left_col_width} align="right">
            <Typography>
              <Box fontWeight="bold">Name: </Box>
            </Typography>
          </Grid>
          <Grid item xs={right_col_width} align="left">
            <Typography>
              {props.selectedDriverData.FirstName +
                ' ' +
                props.selectedDriverData.LastName}
            </Typography>
          </Grid>
        </Grid>

        {/* driver bio */}
        <Grid item container xs={12} justify="center" spacing={2}>
          <Grid item xs={left_col_width} align="right">
            <Typography>
              <Box fontWeight="bold">Bio: </Box>
            </Typography>
          </Grid>
          <Grid item xs={right_col_width} align="left">
            <Typography>{props.selectedDriverData.Bio}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <br />
        </Grid>

        {/* sponsored since*/}
        {props.selectedDriverData.Status < 3 ? (
          <Grid item container xs={12} justify="center" spacing={2}>
            <Grid item xs={left_col_width} align="right">
              <Typography>
                <Box fontWeight="bold">Sponsored since: </Box>
              </Typography>
            </Grid>
            <Grid item xs={right_col_width} align="left">
              <Typography>
                {Date.parse(
                  props.selectedDriverData.AppSubmissionDate,
                ).toUTCString()}
              </Typography>
            </Grid>
          </Grid>
        ) : null}

        {/* sponsored because */}
        {props.selectedDriverData.Status < 3 ? (
          <Grid item container xs={12} justify="center" spacing={2}>
            <Grid item xs={left_col_width} align="right">
              <Typography>
                <Box fontWeight="bold">Sponsored because: </Box>
              </Typography>
            </Grid>
            <Grid item xs={right_col_width} align="left">
              <Typography>
                {props.selectedDriverData.AppDecisionReason}
              </Typography>
            </Grid>
          </Grid>
        ) : null}

        {/* total points */}
        {props.selectedDriverData.Status < 3 ? (
          <Grid item container xs={12} justify="center" spacing={2}>
            <Grid item xs={left_col_width} align="right">
              <Typography>
                <Box fontWeight="bold">Total points: </Box>
              </Typography>
            </Grid>

            <Grid item xs={right_col_width} align="left">
              <Typography>{props.selectedDriverData.Points}</Typography>
            </Grid>
          </Grid>
        ) : null}

        {props.selectedDriverData.Status < 3 ? (
          <Grid item xs={12}>
            <br />
          </Grid>
        ) : null}

        {/* end/resume sponsorship button */}
        <Grid
          item
          xs={11}
          container
          justify="flex-end"
          align="center"
          spacing={1}
        >
          {props.selectedDriverData.Status < 3 ? (
            <Grid item>
              <Button
                variant="contained"
                style={{ backgroundColor: '#444444', color: 'white' }}
                onClick={() => {
                  setDeleteProfileCatalogIsOpenState(true)
                }}
              >
                End sponsorship
              </Button>
            </Grid>
          ) : (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  let UPDATE_SPONSORSHIP_URL =
                    'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/updatesponsorshipinfo'
                  let requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      SponsorID: props.selectedDriverData.SponsorID,
                      DriverID: props.selectedDriverData.DriverID,
                      Status: 2,
                    }),
                  }
                  fetch(UPDATE_SPONSORSHIP_URL, requestOptions)

                  props.handleClose(true)
                }}
              >
                Reinstate sponsorship
              </Button>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>

      {/* AREA 2: Sponsorship controls */}
    </Grid>
  )
}

function EditPointDollarRatioMenu(props) {
  const [pointDollarRatio, setPointDollarRatio] = useState(
    props.selectedDriverData.PointDollarRatio,
  )
  const [newPointDollarRatio, setNewPointDollarRatio] = useState(
    props.selectedDriverData.PointDollarRatio,
  )

  const [helperText, setHelperText] = useState(null)

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h6">Point value</Typography>
        <Typography>
          View and edit the point to dollar value ratio for your driver. For
          example, typing in .005 would mean that 1 point is worth .005 USD for
          this particular driver.
        </Typography>
        <br></br>
      </Grid>

      <Grid item container spacing={2} justify="flex-start" alignItems="center">
        <Grid item>
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
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              if (!newPointDollarRatio) {
                setHelperText('Need to provide a value')
                return
              } else if (newPointDollarRatio <= 0) {
                setHelperText('Must be greater than 0')
                return
              }

              let SAVE_APPLICATION_RESPONSE_URL =
                'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/updatesponsorshipinfo'

              let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  SponsorID: props.selectedDriverData.SponsorID,
                  DriverID: props.selectedDriverData.DriverID,
                  PointDollarRatio: parseFloat(newPointDollarRatio),
                }),
              }

              fetch(SAVE_APPLICATION_RESPONSE_URL, requestOptions).then(() => {
                let newDriverDataState = props.allDriverData.map((element) => {
                  if (element.Username === props.selectedDriverData.DriverID) {
                    return {
                      ...element,
                      PointDollarRatio: parseFloat(newPointDollarRatio),
                    }
                  } else {
                    return element
                  }
                })

                props.setAllDriverDataState(newDriverDataState)
                // Trigger reload

                props.triggerPageUpdate()
              })
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

function EditDriverPointsMenu(props) {
  const [reason, setReason] = useState(null)
  const [reasonHelperText, setReasonHelperText] = useState(null)

  const [pointQuantity, setPointQuantity] = useState(null)
  const [pointHelperText, setPointHelperText] = useState(null)

  useEffect(() => {}, [props.pageUpdate])
  if (props.selectedDriverData.Status < 3) {
    return (
      <Grid item container spacing={2} justify="flex-end" alignItems="center">
        <Grid item xs={8} sm={3}>
          <TextField
            fullWidth
            label="Points"
            variant="filled"
            size="small"
            type="number"
            error={pointHelperText}
            helperText={pointHelperText}
            value={pointQuantity}
            onChange={(event) => {
              setPointQuantity(event.target.value)
            }}
          ></TextField>
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label="Reason"
            variant="filled"
            size="small"
            type="text"
            error={reasonHelperText}
            helperText={reasonHelperText}
            onChange={(event) => {
              setReason(event.target.value)
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <ButtonGroup size="large" color="primary" variant="contained">
            <Button
              style={{ backgroundColor: 'red' }}
              onClick={() => {
                // validate input
                let exit = false
                if (!pointQuantity) {
                  setPointHelperText('Must provide a quantity')
                  exit = true
                }
                if (pointQuantity <= 0) {
                  setPointHelperText('Must be >0')
                  exit = true
                } else if (pointQuantity > props.selectedDriverData.Points) {
                  setPointHelperText('Deducting too much')
                  exit = true
                } else {
                }

                if (!reason) {
                  setReasonHelperText('Must provide a reason')
                  exit = true
                }
                if (exit) return

                let SAVE_APPLICATION_RESPONSE_URL =
                  'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/updatesponsorshipinfo'

                let requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    SponsorID: props.selectedDriverData.SponsorID,
                    DriverID: props.selectedDriverData.DriverID,
                    Points:
                      parseInt(props.selectedDriverData.Points) -
                      parseInt(pointQuantity),
                  }),
                }

                fetch(SAVE_APPLICATION_RESPONSE_URL, requestOptions).then(
                  () => {
                    let newDriverDataState = props.allDriverData.map(
                      (element) => {
                        if (
                          element.Username === props.selectedDriverData.DriverID
                        ) {
                          return {
                            ...element,
                            Points:
                              parseInt(props.selectedDriverData.Points) -
                              parseInt(pointQuantity),
                          }
                        } else {
                          return element
                        }
                      },
                    )

                    props.setAllDriverDataState(newDriverDataState)
                    props.triggerPageUpdate()
                  },
                )

                // TODO: make sure that the point history table reflects points changes. Waiting on api for point history logs.
              }}
            >
              Deduct
            </Button>
            <Button
              style={{ backgroundColor: 'green' }}
              onClick={() => {
                // validate input
                let exit = false
                if (!pointQuantity) {
                  setPointHelperText('Must provide a quantity')
                  exit = true
                }
                if (pointQuantity <= 0) {
                  setPointHelperText('Must be >0')
                  exit = true
                }

                if (!reason) {
                  setReasonHelperText('Must provide a reason')
                  exit = true
                }
                if (exit) return

                let SAVE_APPLICATION_RESPONSE_URL =
                  'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/updatesponsorshipinfo'

                let requestOptions = {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    SponsorID: props.selectedDriverData.SponsorID,
                    DriverID: props.selectedDriverData.DriverID,
                    Points:
                      parseInt(props.selectedDriverData.Points) +
                      parseInt(pointQuantity),
                    // TODO: provide reason for point change. waiting on api/table for this
                  }),
                }

                fetch(SAVE_APPLICATION_RESPONSE_URL, requestOptions).then(
                  () => {
                    let newDriverDataState = props.allDriverData.map(
                      (element) => {
                        if (
                          element.Username === props.selectedDriverData.DriverID
                        ) {
                          return {
                            ...element,
                            Points:
                              parseInt(props.selectedDriverData.Points) +
                              parseInt(pointQuantity),
                          }
                        } else {
                          return element
                        }
                      },
                    )

                    props.setAllDriverDataState(newDriverDataState)
                    props.triggerPageUpdate()
                  },
                )

                // props.triggerPageUpdate()
                // TODO: make sure that the point history table reflects points changes. if it doesn't, fix it. waiting on api.
              }}
            >
              Add
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

function DriverPointsTab(props) {
  const [isLoading, setIsLoading] = useState(true)

  // point history table
  const table1HeadCells = [
    {
      id: 'Date',
      label: 'Date',
      isDate: true,
      width: 200,
    },
    {
      id: 'Reason',
      label: 'Reason',
      isDate: false,
      width: 150,
    },
    {
      id: 'TotalPoints',
      label: 'Total points',
      isDate: false,
      width: 50,
    },
    {
      id: 'PointsChange',
      label: 'Difference',
      isDate: false,
      width: 50,
    },
  ]

  const [table1Data, setTable1Data] = useState(null)
  function setTable1DataState(state) {
    setTable1Data(state)
  }

  const [selectedEntry, setSelectedEntry] = useState(null)
  function setSelectedEntryState(state) {
    setSelectedEntry(state)
  }

  const [pageUpdate, setPageUpdate] = useState(0)
  function triggerPageUpdate() {
    setPageUpdate(pageUpdate + 1)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      setTable1Data([
        {
          Date: '2021-03-11 23:08:19.748211',
          Reason: '<a really good reason>',
          TotalPoints: 1650,
          PointsChange: (150 > 0 ? '+' : '-') + 150,
        },
        {
          Date: '2021-03-11 23:08:50.891743',
          Reason: '<please replace me with an actual api call please>',
          TotalPoints: 1500,
          PointsChange: (-150 > 0 ? '+' : null) + -150,
        },
      ])
    })().then(() => {
      setIsLoading(false)
    })
  }, [pageUpdate])

  let LEFT_COL_WIDTH = 5
  let RIGHT_COL_WIDTH = 6
  let COLUMN_SPACING = 1

  if (!isLoading) {
    return (
      <div>
        <Grid container item component={Paper} xs={12}>
          <DialogContent>
            <Grid
              item
              container
              direction="row"
              spacing={COLUMN_SPACING}
              justify="center"
            >
              <Grid item xs={12}>
                <br />
              </Grid>

              {props.selectedDriverData.Status < 3 ? (
                <Grid
                  item
                  container
                  xs={9}
                  spacing={2}
                  justify="flex-start"
                  component={Paper}
                  style={{ padding: 20 }}
                >
                  <Grid item>
                    <Typography>
                      <EditPointDollarRatioMenu
                        selectedDriverData={props.selectedDriverData}
                        triggerPageUpdate={props.pageUpdate}
                        allDriverData={props.allDriverData}
                        setAllDriverDataState={props.setAllDriverDataState}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              ) : null}

              {props.selectedDriverData.Status < 3 ? (
                <Grid item xs={12}>
                  <br />
                </Grid>
              ) : null}

              {/* point history table */}
              <Grid
                item
                container
                xs={9}
                spacing={2}
                justify="center"
                component={Paper}
                style={{ padding: 20 }}
              >
                <Grid item container xs={12} alignItems="center">
                  <Grid item xs={6} align="left">
                    <Typography variant="h6">Points</Typography>
                    {props.selectedDriverData.Status < 3 ? (
                      <Typography>View and edit the driver's points</Typography>
                    ) : (
                      <Typography>View the driver's point history</Typography>
                    )}
                  </Grid>

                  {props.selectedDriverData.Status < 3 ? (
                    <Grid item xs={6} align="right">
                      <Typography variant="h6">
                        {props.selectedDriverData.Points} points total
                      </Typography>
                    </Grid>
                  ) : null}

                  {/* point management */}
                  <Grid item xs={12} align="center">
                    <EditDriverPointsMenu
                      selectedDriverData={props.selectedDriverData}
                      allDriverData={props.allDriverData}
                      setAllDriverDataState={props.setAllDriverDataState}
                      pageUpdate={pageUpdate}
                      triggerPageUpdate={props.pageUpdate}
                    />
                    <br />
                  </Grid>
                  <GenericTable
                    headCells={table1HeadCells}
                    data={table1Data}
                    setDataState={setTable1DataState}
                    tableKey="Date"
                    showKey={false}
                    initialSortedColumn="Date"
                    initialSortedDirection="desc"
                    selectedRow={selectedEntry}
                    setSelectedRow={setSelectedEntryState}
                    dialogIsOpen={props.dialogIsOpen}
                    setDialogIsOpenState={props.setDialogIsOpenState}
                  ></GenericTable>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                {' '}
                <br />
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </div>
    )
  } else {
    return <LoadingIcon />
  }
}

export default function DriverManagementDialog(props) {
  // dialog control
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [pageUpdate, setPageUpdate] = useState(0)
  function triggerPageUpdate() {
    setPageUpdate(pageUpdate + 1)
  }

  const [currentTab, setCurrentTab] = useState(0)
  const handleTabChange = (event, newTab) => {
    setCurrentTab(newTab)
  }

  function setDialogIsOpenState(state, refresh) {
    setDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }
  const handleClose = (refresh) => {
    props.setDialogIsOpenState(false, refresh)
  }
  return (
    <div>
      <Dialog
        open={props.dialogIsOpen}
        onClose={() => {
          handleClose(false)
        }}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth="md"
      >
        {/* dialog header */}
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          alignItems="center"
          direction="row"
        >
          <Grid item container xs={9} alignItems="center">
            <Grid item>
              <DialogTitle id="form-dialog-title">
                Driver: {props.selectedDriverData.FirstName}{' '}
                {props.selectedDriverData.LastName} (
                {props.selectedDriverData.Username})
              </DialogTitle>
            </Grid>
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

        <AppBar position="static">
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Points"></Tab>
            <Tab label="Manage"></Tab>
          </Tabs>
        </AppBar>

        {/* tabs */}

        {currentTab === 0 ? (
          <DriverPointsTab
            pageUpdate={props.fullPageUpdate}
            selectedDriverData={props.selectedDriverData}
            dialogIsOpen={props.dialogIsOpen}
            setDialogIsOpenState={setDialogIsOpenState}
            handleClose={handleClose}
            allDriverData={props.allDriverData}
            setAllDriverDataState={props.setAllDriverDataState}
          />
        ) : currentTab === 1 ? (
          <DriverManagementTab
            selectedDriverData={props.selectedDriverData}
            allDriverData={props.allDriverData}
            setAllDriverDataState={props.setAllDriverDataState}
            handleClose={handleClose}
            fullPageUpdate={props.fullPageUpdate}
            setDialogIsOpenState={props.setDialogIsOpenState}
          />
        ) : null}
      </Dialog>
    </div>
  )
}
