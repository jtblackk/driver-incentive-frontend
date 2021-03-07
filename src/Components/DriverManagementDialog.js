import React, { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {
  Box,
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

export default function DriverManagementDialog(props) {
  // console.log(props)

  const handleClose = (refresh) => {
    props.setDialogIsOpenState(false, refresh)
  }

  let driverProfile = [
    {
      name: 'Username',
      prop: props.selectedEntry.Username,
    },
    {
      name: 'Name',
      prop: props.selectedEntry.FirstName + ' ' + props.selectedEntry.LastName,
    },
    {
      name: 'Driving since',
      prop: '<sponsorship start date',
    },
  ]

  const userData = useContext(UserContext).user
  const [isLoading, setIsLoading] = useState(true)

  // dialog control
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [pageUpdate, setPageUpdate] = useState(0)
  function setDialogIsOpenState(state, refresh) {
    setDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [table1HeadCells, setTable1HeadCells] = useState(null)

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

    // todo: pull sponsorship data, clean it up into needed format

    setTable1Data([
      {
        Date: '2010-01-01T08:00:00.000',
        Reason: 'Jeff',
        TotalPoints: 1500,
        PointsChange: 150,
      },
      {
        Username: 'm2@gmail.com',
        FirstName: 'm',
        LastName: '2',
        TotalPoints: 200,
      },
    ])
    setTable1HeadCells([
      {
        id: 'Date',
        label: 'Date',
        isDate: false,
        width: 100,
      },
      {
        id: 'Reason',
        label: 'Reason',
        isDate: false,
        width: 100,
      },
      {
        id: 'TotalPoints',
        label: 'Total points',
        isDate: false,
        width: 100,
      },
      {
        id: 'PointsChange',
        label: 'Difference',
        isDate: false,
        width: 100,
      },
    ])
    setIsLoading(false)
  }, [pageUpdate])

  let LEFT_COL_WIDTH = 5
  let RIGHT_COL_WIDTH = 6
  let COLUMN_SPACING = 1

  function ResponseForm() {
    return (
      <Grid
        container
        direction="row"
        spacing={COLUMN_SPACING}
        justify="space-evenly"
      >
        <Grid item xs={7} align="right">
          <Grid container item xs={12} justify="flex-end"></Grid>
        </Grid>
      </Grid>
    )
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
        <Grid
          container
          item
          xs={12}
          justify="space-between"
          alignItems="center"
          direction="row"
        >
          <Grid item>
            <DialogTitle id="form-dialog-title">Driver details</DialogTitle>
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
              {driverProfile.map((field) => {
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

              {/* divider */}
              <Grid item xs={12}>
                <br />
                <Divider />

                <br />
                <br />
              </Grid>

              {/* bottom half */}
              <Grid item container xs={7} spacing={2}>
                <Grid item>
                  <GenericTable
                    headCells={table1HeadCells}
                    data={table1Data}
                    setDataState={setTable1DataState}
                    tableKey="Username"
                    showKey={false}
                    initialSortedColumn="LastName"
                    initialSortedDirection="asc"
                    selectedRow={selectedEntry}
                    setSelectedRow={setSelectedEntryState}
                    dialogIsOpen={dialogIsOpen}
                    setDialogIsOpenState={setDialogIsOpenState}
                  ></GenericTable>
                  {/* <Typography>
                    {
                      'put a table of reward history here. The table should have buttons to add/remove points'
                    }
                  </Typography> */}
                </Grid>
                <Grid item>
                  <Typography>
                    {
                      "add a button for removing the driver from the sponsor's organization"
                    }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography>
                    {'add a way to edit the point-to-dollar ratio'}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {' '}
                <br />
              </Grid>
            </Grid>
          </DialogContent>
        </Grid>
      </Dialog>
    </div>
  )
}
