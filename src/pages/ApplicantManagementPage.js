import React, { useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Grid, Paper, Typography } from '@material-ui/core'
import PendingApplicantTable from '../Components/PendingApplicantTable'
import { Auth } from 'aws-amplify'
import LoadingIcon from '../Components/LoadingIcon'
import ApplicationManagementDialog from '../Components/ApplicationManagementDialog'
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

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // fetch data
      const user = await Auth.currentAuthenticatedUser()

      let GET_APPLICANT_LIST = `https://unmqqiwf1a.execute-api.us-east-1.amazonaws.com/dev/applist?Email_id=${user.attributes.email}`
      const response = await fetch(GET_APPLICANT_LIST)
      const data = await response.json()

      let all_applicants_json = JSON.parse(data.body.toString()).Items
      let all_applicants = all_applicants_json.map((val) => {
        return {
          ApplicantFirstName: val.FirstName.S,
          ApplicantLastName: val.LastName.S,
          ApplicantBio: val.UserBio.S,
          ApplicantEmail: val.applicant_email.S,
          // ApplicationID: val.application_id.S,
          ApplicantComments: val.comments.S,
          SubmissionDate: val.dateTime.S,
          // SubmissionTime: val.dateTime.S.split(' ')[1],
          SponsorEmail: val.sponsor_email.S,
          isApplicationAccepted: val.decision ? val.decision.S : null,
        }
      })

      let pending_applicants = all_applicants.filter((item) => {
        return (
          item.isApplicationAccepted !== 'accepted' &&
          item.isApplicationAccepted !== 'denied'
        )
      })

      let processed_applicants = all_applicants.filter((item) => {
        return (
          item.isApplicationAccepted === 'accepted' ||
          item.isApplicationAccepted === 'denied'
        )
      })

      // console.log(filtered_application_list)

      setApplicants(pending_applicants)
      setOldApplicants(processed_applicants)
      setIsLoading(false)
      console.log(processed_applicants)
    })()
  }, [pageUpdate])

  const classes = useStyles()

  if (!isLoading) {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Your applicants"></TopAppBar>
        <LeftDrawer AccountType="Sponsor" />

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
            direction="column"
            component={Paper}
            spacing={4}
          >
            <Grid item>
              <PendingApplicantTable
                applicants={applicants}
                setApplicantState={setApplicantState}
                selectedApplicant={selectedApplicant}
                setSelectedApplicantState={setSelectedApplicantState}
                dialogIsOpen={dialogIsOpen}
                setDialogIsOpenState={setDialogIsOpenState}
              />
            </Grid>
            <Grid item>
              <PendingApplicantTable
                applicants={oldApplicants}
                setApplicantState={setApplicantState}
                selectedApplicant={selectedApplicant}
                setSelectedApplicantState={setSelectedApplicantState}
                dialogIsOpen={dialogIsOpen}
                setDialogIsOpenState={setDialogIsOpenState}
              />
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
