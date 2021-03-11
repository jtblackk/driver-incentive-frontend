import React, { useContext, useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from '../Components/LoadingIcon'
import ApplicationManagementDialog from '../Components/ApplicationManagementDialog'
import GenericTable from '../Components/GenericTable'
import { useHistory } from 'react-router'
import DriverManagementDialog from '../Components/DriverManagementDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const DriverManagementPage = () => {
  const classes = useStyles()
  let history = useHistory()

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
        Username: 'jtblack@g.clemson.edu',
        FirstName: 'Jeff',
        LastName: 'Black',
        TotalPoints: 150,
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
        id: 'Username',
        label: 'Driver email',
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
        width: 100,
      },
      {
        id: 'TotalPoints',
        label: 'Total points',
        isDate: false,
        width: 100,
      },
    ])
    setIsLoading(false)
  }, [pageUpdate])

  if (!isLoading) {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Drivers"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />

          {dialogIsOpen ? (
            <DriverManagementDialog
              selectedEntry={selectedEntry}
              dialogIsOpen={dialogIsOpen}
              setDialogIsOpenState={setDialogIsOpenState}
            />
          ) : null}

          <Grid
            container
            justify="center"
            alignContent="center"
            direction="row"
            spacing={4}
          >
            {/* active drivers */}
            <Grid item xs={10} xl={6}>
              <Paper>
                <div style={{ padding: 20 }}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h6">Your drivers</Typography>
                      <Typography>
                        A list of the drivers you're sponsoring
                      </Typography>
                    </Grid>
                  </Grid>
                  <br></br>
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
                    dialogIsOpen={dialogIsOpen}
                    setDialogIsOpenState={setDialogIsOpenState}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>
        </main>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <LoadingIcon />
        </main>
      </div>
    )
  }
}

export default DriverManagementPage
