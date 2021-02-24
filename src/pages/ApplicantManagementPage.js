import React, { useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Grid, Paper, Typography } from '@material-ui/core'
import PendingApplicantTable from '../Components/PendingApplicantTable'
import { Auth } from 'aws-amplify'
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
  const [applicants, setApplicants] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // fetch data
      const user = await Auth.currentAuthenticatedUser()
      let GET_APPLICANT_LIST = `https://n381qvhyo0.execute-api.us-east-1.amazonaws.com/dev/applist?Email_id=${user.attributes.email}`
      const response = await fetch(GET_APPLICANT_LIST)
      const data = await response.json()
      console.log(data)

      // let profile_details = {
      //   Email_ID: data.Item.Email_id,
      //   FirstName: data.Item.FirstName,
      //   LastName: data.Item.LastName,
      //   UserBio: data.Item.UserBio,
      //   AccountType: data.Item.AccountType,
      //   SponsorEmailID: data.Item.SponsorEmailID,
      //   TotalPoints: data.Item.TotalPoints,
      // }

      // props.setProfileState(profile_details)
      setIsLoading(false)
    })()
  }, [])

  // useEffect(() => {
  //   setPendingApplicants([
  //     {
  //       application_id: 'test application_id',
  //       sponsor_email: 'test sponsor_email',
  //       applicant_email: 'test applicant_email',
  //       comments: 'test comments',
  //       dateTime: 'test dateTime',
  //       FirstName: 'test dateTime',
  //       LastName: 'test LastName',
  //       UserBio: 'test UserBio',
  //     },
  //     {
  //       application_id: 'test application_id',
  //       sponsor_email: 'test sponsor_email',
  //       applicant_email: 'test applicant_email',
  //       comments: 'test comments',
  //       dateTime: 'test dateTime',
  //       FirstName: 'test dateTime',
  //       LastName: 'test LastName',
  //       UserBio: 'test UserBio',
  //     },
  //     {
  //       application_id: 'test application_id',
  //       sponsor_email: 'test sponsor_email',
  //       applicant_email: 'test applicant_email',
  //       comments: 'test comments',
  //       dateTime: 'test dateTime',
  //       FirstName: 'test dateTime',
  //       LastName: 'test LastName',
  //       UserBio: 'test UserBio',
  //     },
  //   ])
  // })

  const classes = useStyles()
  return (
    <div className={classes.root}>
      {/* layout stuff */}
      <TopAppBar pageTitle="Your applicants"></TopAppBar>
      <LeftDrawer AccountType="Sponsor" />

      {/* page content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid
          container
          justify="center"
          direction="column"
          component={Paper}
          spacing={4}
        >
          <Grid item>
            <PendingApplicantTable />
          </Grid>
          <Grid item>
            <PendingApplicantTable />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default ApplicantManagementPage
