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

const ViewSponsorsPage = () => {
  const classes = useStyles()
  let history = useHistory()

  const userData = useContext(UserContext).user
  const [isLoading, setIsLoading] = useState(true)
  const [pageUpdate, setPageUpdate] = useState(0)

  // dialog control
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
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
    ;(async () => {
      // get the sponsors that the driver is partnered to
      // TODO: this api has been upgraded to provide more information. optimize this page to use that new data.
      let GET_DRIVERS_SPONSORS_URL = `https://8mhdaeq2kl.execute-api.us-east-1.amazonaws.com/dev/getuserdetails/?DriverID=${userData.Username}`
      let partnered_sponsors_response = await fetch(GET_DRIVERS_SPONSORS_URL)
      let partnered_sponsors_data = await partnered_sponsors_response.json()
      let partnered_sponsors_array = JSON.parse(
        partnered_sponsors_data.body.toString(),
      ).Items

      let partnered_sponsors_formatted = partnered_sponsors_array.map(
        (element) => {
          return {
            SponsorshipID: element.SponsorshipID.S,
            SponsorID: element.SponsorID.S,
            DriverID: element.DriverID.S,
            AppDecisionDate: element.AppDecisionDate.S,
            Points: parseInt(element.Points.N),
            PointDollarRatio: parseFloat(element.PointDollarRatio.N),
            FirstName: element.FirstName.S,
            LastName: element.LastName.S,
            Organization: element.Organization.S,
            Status: parseInt(element.Status.N),
          }
        },
      )

      let active_sponsors_data = partnered_sponsors_formatted.filter(
        (element) => element.Status === 2,
      )

      let active_sponsors_table_data = active_sponsors_data
        .filter((element) => element)
        .map((element) => {
          return {
            SponsorshipID: element.SponsorshipID,
            Organization: element.Organization,
            FirstName: element.FirstName,
            LastName: element.LastName,
            TotalPoints: parseInt(element.Points),
            StartDate: element.AppDecisionDate,
          }
        })

      setTable1Data(active_sponsors_table_data)
    })().then(() => {
      setIsLoading(false)
    })

    setTable1HeadCells([
      {
        id: 'Organization',
        label: 'Organization',
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
        label: 'Total Points',
        isDate: false,
        width: 100,
      },
      {
        id: 'StartDate',
        label: 'Sponsored since',
        isDate: false,
        width: 100,
      },
    ])
  }, [pageUpdate])

  if (!isLoading) {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Sponsors"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Grid
            container
            justify="center"
            alignContent="center"
            direction="row"
            spacing={4}
          >
            <Grid item xs={10} xl={6}>
              <Paper>
                <div style={{ padding: 20 }}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h6">Your sponsors</Typography>
                      <Typography>
                        A list of the sponsors you're registered to
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          history.push('/application')
                        }}
                      >
                        Apply to more
                      </Button>
                    </Grid>
                  </Grid>
                  <br></br>
                  <GenericTable
                    headCells={table1HeadCells}
                    data={table1Data}
                    setDataState={setTable1DataState}
                    tableKey="SponsorshipID"
                    showKey={false}
                    initialSortedColumn="Organization"
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

export default ViewSponsorsPage
