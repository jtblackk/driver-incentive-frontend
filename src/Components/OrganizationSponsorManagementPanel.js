import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { UserContext } from '../Helpers/UserContext'
import AddSponsorProfileDialog from './AddSponsorProfileDialog'
import ViewSponsorProfileDialog from './ViewSponsorProfileDialog'
import GenericTable from './GenericTable'
import LoadingIcon from './LoadingIcon'

const OrganizationSponsorManagementPanel = (props) => {
  console.log(props)
  const [isLoading, setIsLoading] = useState(true)

  // dialog control
  const [
    addSponsorProfileDialogIsOpen,
    setAddSponsorProfileDialogIsOpen,
  ] = useState(false)

  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }
  function setAddSponsorProfileDialogIsOpenState(state, refresh) {
    setAddSponsorProfileDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [
    viewSponsorProfileDialogIsOpen,
    setViewSponsorProfileDialogIsOpen,
  ] = useState(false)

  function setViewSponsorProfileDialogIsOpenState(state, refresh) {
    setViewSponsorProfileDialogIsOpen(state)

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
    ;(async () => {
      setTable1Data([
        {
          Username: 'user_1',
          FirstName: 'a first name',
          LastName: 'a last name',
        },
      ])
    })().then(() => {
      setIsLoading(false)
    })

    setTable1HeadCells([
      {
        id: 'Username',
        label: 'Username',
        isDate: false,
        width: 100,
      },
      {
        id: 'FirstName',
        label: 'First name',
        isDate: false,
        width: 100,
      },
      {
        id: 'LastName',
        label: 'Last name',
        isDate: false,
        width: 115,
      },
    ])
  }, [pageUpdate])

  if (isLoading) {
    return <LoadingIcon />
  } else {
    return (
      <Grid item xs={12} container component={Paper} style={{ padding: 20 }}>
        <AddSponsorProfileDialog
          dialogProps={{
            selectionDialogIsOpen: addSponsorProfileDialogIsOpen,
            setSelectionDialogIsOpenState: setAddSponsorProfileDialogIsOpenState,
          }}
        />
        <ViewSponsorProfileDialog
          dialogProps={{
            selectionDialogIsOpen: viewSponsorProfileDialogIsOpen,
            setSelectionDialogIsOpenState: setViewSponsorProfileDialogIsOpen,
          }}
        />
        <Grid item xs={12}>
          <Typography variant="h6">Manage your sponsors</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>Add, view, and remove your sponsor profiles</Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setAddSponsorProfileDialogIsOpenState(true)
              }}
            >
              Add sponsor
            </Button>
          </Grid>
          <Grid item xs={12}>
            <br />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <GenericTable
            headCells={table1HeadCells}
            data={table1Data}
            setDataState={setTable1DataState}
            tableKey="Username"
            showKey={true}
            initialSortedColumn="LastName"
            initialSortedDirection="asc"
            selectedRow={selectedEntry}
            setSelectedRow={setSelectedEntryState}
            dialogIsOpen={setViewSponsorProfileDialogIsOpen}
            setDialogIsOpenState={setViewSponsorProfileDialogIsOpenState}
          />
        </Grid>
      </Grid>
    )
  }
}

export default OrganizationSponsorManagementPanel
