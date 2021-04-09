import React, { useContext, useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from '../Components/LoadingIcon'
import GenericTable from '../Components/GenericTable'
import DriverManagementDialog from '../Components/DriverManagementDialog'
import SetAllPointRatiosDialog from '../Components/SetAllPointRatiosDialog'

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

  const [table2HeadCells, setTable2HeadCells] = useState(null)

  const [table2Data, setTable2Data] = useState(null)
  function setTable2DataState(state) {
    setTable2Data(state)
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
      const driver_profile_data_formatted = driver_profile_data_parsed
        .map((val) => {
          if (val) {
            return {
              Username: val.Username.S,
              FirstName: val.FirstName.S,
              LastName: val.LastName.S,
              AccountType: val.AccountType.S,
              AccountStatus: parseInt(val.AccountStatus.N),
              Bio: val.Bio.S,
            }
          } else {
            return null
          }
        })
        .filter((element) => element.AccountStatus === 1)

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

      let terminated_drivers = sponsorship_list_formatted.filter((val) => {
        return val.Status === 3
      })

      let current_drivers_data = current_drivers
        .map((val) => {
          return {
            ...val,
            ...driver_profile_data_formatted.find(
              (element) => element.Username === val.DriverID,
            ),
          }
        })
        .filter((element) => element.AccountStatus)

      let terminated_drivers_data = terminated_drivers
        .map((val) => {
          return {
            ...val,
            ...driver_profile_data_formatted.find(
              (element) => element.Username === val.DriverID,
            ),
          }
        })
        .filter((element) => element.AccountStatus)

      setAllDriverData([...current_drivers_data, ...terminated_drivers_data])

      let current_drivers_table_data = current_drivers_data.map((val) => {
        return {
          Username: val.Username,
          FirstName: val.FirstName,
          LastName: val.LastName,
          TotalPoints: val.Points,
          PointValue: '$' + val.PointDollarRatio + ' / point',
        }
      })

      let terminated_drivers_table_data = terminated_drivers_data.map((val) => {
        return {
          Username: val.Username,
          FirstName: val.FirstName,
          LastName: val.LastName,

          // PointValue: '$' + val.PointDollarRatio + ' / point',
          // TerminatedOn: 'date here',
        }
      })

      setTable1Data([...current_drivers_table_data])
      setTable2Data([...terminated_drivers_table_data])
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

    setTable2HeadCells([
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

  const [pointRatioDialogIsOpen, setPointRatioDialogIsOpen] = useState(false)
  function setPointRatioDialogIsOpenState(state, refresh) {
    setPointRatioDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [pointRatioDialogResponse, setPointRatioDialogResponse] = useState(
    false,
  )
  function setPointRatioDialogResponseState(state) {
    setPointRatioDialogResponse(state)
  }

  if (!isLoading) {
    return (
      <div className={classes.root}>
        <SetAllPointRatiosDialog
          dialogIsOpen={pointRatioDialogIsOpen}
          setDialogIsOpen={setPointRatioDialogIsOpenState}
          // setDialogResponse={setPointRatioDialogIsOpenState}
          // fullPageUpdate={setPointRatioDialogIsOpenState}
        />

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
                    <Grid item xs={12}>
                      <Typography variant="h6">Your drivers</Typography>
                      <Typography>
                        A list of the drivers you're sponsoring. Click on an
                        entry for more information.
                      </Typography>
                    </Grid>
                  </Grid>
                  <br></br>
                  <Grid item container xs={12} justify="flex-end">
                    {/* set all point values button */}
                    <Grid item align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          // bring up dialog to set all point ratios
                          setPointRatioDialogIsOpen(true)
                        }}
                      >
                        SET ALL POINT VALUES
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
                    <Grid item xs={12}>
                      <Typography variant="h6">Past drivers</Typography>
                      <Typography>
                        A list of your past drivers (i.e., any driver whos
                        sponsorship has been terminated)
                      </Typography>
                    </Grid>
                  </Grid>
                  <br></br>

                  <GenericTable
                    headCells={table2HeadCells}
                    data={table2Data}
                    setDataState={setTable2DataState}
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
