import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  Box,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import GenericTable from './GenericTable'
import { UserContext } from '../Helpers/UserContext'
require('datejs')

function EditDriverPointsMenu() {
  // todo: validate form input
  // * 0 < points < driver's total points
  // * Reason not empty

  // todo: save point change to database

  // todo: rerender point history table

  return (
    <Grid item container spacing={2} justify="flex-end" alignItems="center">
      <Grid item xs={3}>
        <TextField
          fullWidth
          label="Points"
          variant="filled"
          size="small"
          type="number"
        ></TextField>
      </Grid>
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
          <Button style={{ backgroundColor: 'red' }}>Deduct</Button>
          <Button style={{ backgroundColor: 'green' }}>Add</Button>
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
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          alignItems="center"
          direction="row"
        >
          {/* dialog header/title */}
          <Grid item container xs={9} alignItems="center">
            <Grid item>
              <DialogTitle id="form-dialog-title">
                Driver details: {props.selectedDriverData.FirstName}{' '}
                {props.selectedDriverData.LastName} (
                {props.selectedDriverData.Username})
              </DialogTitle>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton
              onClick={() => {
                props.handleClose(false)
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
              justify="center"
            >
              <Grid
                item
                container
                xs={9}
                spacing={2}
                justify="center"
                component={Paper}
              >
                <Grid item>
                  <Typography>
                    {'add a way to edit the point-to-dollar ratio'}
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
    return null
  }
}

export default function DriverManagementDialog(props) {
  // console.log(props)
  // dialog control
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [pageUpdate, setPageUpdate] = useState(0)
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
        <DriverPointsTab
          pageUpdate={pageUpdate}
          selectedDriverData={props.selectedDriverData}
          dialogIsOpen={props.dialogIsOpen}
          setDialogIsOpenState={setDialogIsOpenState}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  )
}
