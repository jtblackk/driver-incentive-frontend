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
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }
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

  const [allDriverData, setAllDriverData] = useState(null)
  const setAllDriverDataState = (state) => {
    setAllDriverData(state)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // fetch and parse sponsor's driver's profiles
      const driver_profile_data_endpoint = `https://rb6nqfuvvg.execute-api.us-east-1.amazonaws.com/dev/driverdatabysponsor?SponsorUsername=${userData.Username}`
      const driver_profile_data_response = await fetch(
        driver_profile_data_endpoint,
      )
      const driver_profile_data_json = await driver_profile_data_response.json()
      const driver_profile_data_parsed = JSON.parse(
        driver_profile_data_json.body.toString(),
      )
      const driver_profile_data_formatted = driver_profile_data_parsed.map(
        (val) => {
          if (val.Items[0]) {
            return {
              Username: val.Items[0].Username.S,
              FirstName: val.Items[0].FirstName.S,
              LastName: val.Items[0].LastName.S,
              AccountType: val.Items[0].AccountType.S,
              AccountStatus: parseInt(val.Items[0].AccountStatus.N),
              Bio: val.Items[0].Bio.S,
            }
          } else {
            return null
          }
        },
      )

      //  fetch applicant list
      let sponsorship_list_api = `https://unmqqiwf1a.execute-api.us-east-1.amazonaws.com/dev/applist?Username=${userData.Username}`
      const sponsorship_list_response = await fetch(sponsorship_list_api)
      const sponsorship_list_json = await sponsorship_list_response.json()

      // parse the applicant data
      let sponsorship_list_parsed = JSON.parse(
        sponsorship_list_json.body.toString(),
      ).Items
      let sponsorship_list_formatted = sponsorship_list_parsed.map((val) => {
        return {
          SponsorshipID: val.SponsorshipID ? val.SponsorshipID.S : null,
          SponsorID: val.SponsorID ? val.SponsorID.S : null,
          DriverID: val.DriverID ? val.DriverID.S : null,
          Status: val.Status ? parseInt(val.Status.N) : null,
          Points: val.Points ? parseInt(val.Points.N) : null,
          PointDollarRatio: val.PointDollarRatio
            ? parseFloat(val.PointDollarRatio.N)
            : null,

          AppSubmissionDate: val.AppSubmissionDate
            ? val.AppSubmissionDate.S.split('.')[0].replace(' ', 'T')
            : null,
          AppComments: val.AppComments ? val.AppComments.S : null,
          AppDecisionDate:
            parseInt(val.Status.N) > 0 && val.AppDecisionDate
              ? val.AppDecisionDate.S.split('.')[0].replace(' ', 'T')
              : null,
          AppDecisionReason:
            parseInt(val.Status.N) && val.AppDecisionReason
              ? val.AppDecisionReason.S
              : null,
        }
      })

      let current_drivers = sponsorship_list_formatted.filter((val) => {
        return val.Status === 2
      })

      let current_drivers_data = current_drivers.map((val) => {
        return {
          ...val,
          ...driver_profile_data_formatted.find(
            (element) => element.Username === val.DriverID,
          ),
        }
      })
      setAllDriverData(current_drivers_data)

      let current_drivers_table_data = current_drivers_data.map((val) => {
        return {
          Username: val.Username,
          FirstName: val.FirstName,
          LastName: val.LastName,
          TotalPoints: val.Points,
          PointValue: '$' + val.PointDollarRatio + ' / point',
        }
      })

      setTable1Data([...current_drivers_table_data])
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
      {
        id: 'TotalPoints',
        label: 'Total points',
        isDate: false,
        width: 100,
      },
      {
        id: 'PointValue',
        label: 'Point value',
        isDate: false,
        width: 100,
      },
    ])
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
              // selectedEntry={selectedEntry}
              dialogIsOpen={dialogIsOpen}
              setDialogIsOpenState={setDialogIsOpenState}
              setAllDriverDataState={setAllDriverDataState}
              allDriverData={allDriverData}
              selectedDriverData={allDriverData.find(
                (entry) => entry.Username === selectedEntry.Username,
              )}
              fullPageUpdate={fullPageUpdateState}
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
                  <Grid
                    container
                    justify="space-between"
                    alignItems="center"
                    spacing={2}
                  >
                    <Grid item xs={8}>
                      <Typography variant="h6">Your drivers</Typography>
                      <Typography>
                        A list of the drivers you're sponsoring. Click on an
                        entry for more information.
                      </Typography>
                    </Grid>
                    <Grid item xs={4} align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // TODO: bring up dialog to set all point ratios
                          // TODO: make api call to set all point ratios
                          // TODO: trigger data rerender
                        }}
                      >
                        SET POINT VALUE
                      </Button>
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
