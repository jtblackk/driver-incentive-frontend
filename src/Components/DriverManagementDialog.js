import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
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

function DriverEditingTab() {
  /* AREA 1:  user profile info */
  /* AREA 2: user profile controls */
  /* AREA 3: account controls */
}

function DriverManagementTab(props) {
  console.log(props.selectedDriverData)

  const left_col_width = 4
  const right_col_width = 6

  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <br />
      </Grid>

      {/* AREA 2: Sponsorship controls */}

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
            <Typography>{props.selectedDriverData.Username}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <br />
        </Grid>

        {/* sponsored since*/}
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

        {/* sponsored because */}
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

        {/* total points */}
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
      </Grid>

      <Grid item xs={12}>
        <br />
      </Grid>

      <Grid item xs={7} container justify="flex-end" align="center" spacing={1}>
        {/* end sponsorship button */}
        <Grid item>
          <Button
            variant="contained"
            style={{ backgroundColor: '#444444', color: 'white' }}
          >
            End sponsorship
          </Button>
        </Grid>

        {/* edit driver's account button */}
        <Grid item>
          <Button variant="contained" color="primary">
            Edit profile
          </Button>
        </Grid>

        <Grid item xs={12}>
          <br />
        </Grid>
      </Grid>
    </Grid>
  )
}

function EditPointDollarRatioMenu() {
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
          {/* TODO: get this field to display the current dollar value by default */}
          {/* TODO: set up form validation support */}
          <TextField
            fullWidth
            label="Point value (USD)"
            variant="filled"
            size="small"
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              // TODO: validate form input
              // * points not empty
              // * 0 < points
              // TODO: save PointDollarRatio change to database
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

function EditDriverPointsMenu() {
  return (
    <Grid item container spacing={2} justify="flex-end" alignItems="center">
      <Grid item xs={3}>
        {/* TODO: set up form validation support */}
        <TextField
          fullWidth
          label="Points"
          variant="filled"
          size="small"
          type="number"
        ></TextField>
      </Grid>
      {/* TODO: set up form validation support */}
      <Grid item xs={5}>
        <TextField
          fullWidth
          label="Reason"
          variant="filled"
          size="small"
          type="text"
        ></TextField>
      </Grid>
      <Grid item>
        <ButtonGroup size="large" color="primary" variant="contained">
          <Button
            style={{ backgroundColor: 'red' }}
            onClick={() => {
              // TODO: validate form input
              // * 0 < points < driver's total points
              // * Reason not empty
              // TODO: save point change to database
              // TODO: rerender point history table
            }}
          >
            Deduct
          </Button>
          <Button
            style={{ backgroundColor: 'green' }}
            onClick={() => {
              // TODO: validate form input
              // * 0 < points < driver's total points
              // * Reason not empty
              // TODO: save point change to database
              // TODO: rerender point history table
            }}
          >
            Add
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}

function DriverPointsTab(props) {
  // console.log(props)
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
  }, [props.pageUpdate])

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
                    <EditPointDollarRatioMenu />
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <br />
              </Grid>

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
                <Grid item xs={12}>
                  <Typography variant="h6">Points</Typography>
                  <Typography>View and edit the driver's points</Typography>
                  <br />
                  {/* point management */}
                  <Grid item xs={12} align="center">
                    <EditDriverPointsMenu />
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
  // console.log(props)
  // dialog control
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [pageUpdate, setPageUpdate] = useState(0)

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
            pageUpdate={pageUpdate}
            selectedDriverData={props.selectedDriverData}
            dialogIsOpen={props.dialogIsOpen}
            setDialogIsOpenState={setDialogIsOpenState}
            handleClose={handleClose}
          />
        ) : currentTab === 1 ? (
          <DriverManagementTab selectedDriverData={props.selectedDriverData} />
        ) : null}
      </Dialog>
    </div>
  )
}
