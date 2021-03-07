import React, { useEffect, useState, useContext } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Box, Grid, Paper, Typography } from '@material-ui/core'
import PendingApplicantTable from '../Components/PendingApplicantTable'
import { Auth } from 'aws-amplify'
import LoadingIcon from '../Components/LoadingIcon'
import ApplicationManagementDialog from '../Components/ApplicationManagementDialog'
import ProcessedApplicantTable from '../Components/ProcessedApplicantTable'
import { UserContext } from '../Helpers/UserContext'
require('datejs')

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

const ApplicantManagementPage = () => {
  const [pageUpdate, setPageUpdate] = useState(0)

  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  function setDialogIsOpenState(state, refresh) {
    setDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }
  const [applicants, setApplicants] = useState(null)
  function setApplicantState(state) {
    setApplicants(state)
  }

  const [oldApplicants, setOldApplicants] = useState(null)
  function setOldApplicantState(state) {
    setOldApplicants(state)
  }

  const [selectedApplicant, setSelectedApplicant] = useState(null)
  function setSelectedApplicantState(state) {
    setSelectedApplicant(state)
  }

  const userData = useContext(UserContext).user

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      //  fetch applicant list
      // TODO: fit this to use new tables/apis
      let GET_APPLICANT_LIST = `https://unmqqiwf1a.execute-api.us-east-1.amazonaws.com/dev/applist?Email_id=${userData.Email_ID}`
      const response = await fetch(GET_APPLICANT_LIST)
      const data = await response.json()

      // parse the applicant data
      let allApplicants_ugly = JSON.parse(data.body.toString()).Items
      let allApplicants = allApplicants_ugly.map((val) => {
        return {
          applicantFirstName: val.FirstName.S,
          applicantLastName: val.LastName.S,
          applicantBio: val.UserBio.S,
          applicantEmail: val.applicant_email.S,
          applicantComments: val.comments.S,
          submissionDate: val.dateTime
            ? Date.parse(
                val.dateTime.S.split('.')[0].replace(' ', 'T'),
              ).toISOString()
            : null,
          sponsorEmail: val.sponsor_email.S,
          response: val.decision ? val.decision.S : null,
          responseDate: val.decisionDateTime
            ? Date.parse(
                val.decisionDateTime.S.split('.')[0].replace(' ', 'T'),
              ).toISOString()
            : null,
          responseReason: val.decisionReason ? val.decisionReason.S : null,
        }
      })

      let pendingApplicants = allApplicants.filter((item) => {
        return item.response !== 'accepted' && item.response !== 'denied'
      })

      let processedApplicants = allApplicants.filter((item) => {
        return item.response === 'accepted' || item.response === 'denied'
      })

      setApplicants(pendingApplicants)
      setOldApplicants(processedApplicants)
      setIsLoading(false)
    })()
  }, [pageUpdate])

  const classes = useStyles()

  if (!isLoading) {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Applicants"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {selectedApplicant ? (
            <ApplicationManagementDialog
              applicationDetails={selectedApplicant}
              dialogIsOpen={dialogIsOpen}
              setDialogIsOpenState={setDialogIsOpenState}
            />
          ) : null}
          <Grid
            container
            justify="center"
            alignContent="center"
            direction="row"
            // component={Paper}
            spacing={4}
          >
            <Grid item xs={10} xl={6}>
              <Paper>
                <div style={{ padding: 20 }}>
                  <Typography variant="h6">Pending applications</Typography>
                  <Typography>
                    Click on an applicant to view and respond to their
                    application.
                  </Typography>
                  <br></br>
                  <PendingApplicantTable
                    applicants={applicants}
                    setApplicantState={setApplicantState}
                    selectedApplicant={selectedApplicant}
                    setSelectedApplicantState={setSelectedApplicantState}
                    dialogIsOpen={dialogIsOpen}
                    setDialogIsOpenState={setDialogIsOpenState}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={10} xl={6}>
              <Paper>
                <div style={{ padding: 20 }}>
                  <Typography variant="h6">Applicant history</Typography>
                  <Typography>
                    Click on a previous applicant to view their application and
                    your decision.
                  </Typography>
                  <br></br>
                  <ProcessedApplicantTable
                    applicants={oldApplicants}
                    setApplicantState={setApplicantState}
                    selectedApplicant={selectedApplicant}
                    setSelectedApplicantState={setSelectedApplicantState}
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

export default ApplicantManagementPage
