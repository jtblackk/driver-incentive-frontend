import React, { useEffect, useState } from 'react'
import { Avatar, CircularProgress, Grid, Typography } from '@material-ui/core'

const UserProfileCard = (props) => {
  const [userProfileDetails, setUserProfileDetails] = useState({
    Email_ID: props.profileEmail,
    FirstName: '',
    LastName: '',
    AccountType: '',
    UserBio: '',
    TotalPoints: '',
    SponsorEmailID: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [sponsorName, setSponsorName] = useState('')

  useEffect(() => {
    // retrieve user data
    let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${userProfileDetails.Email_ID}`
    fetch(GET_USERDATA_URL)
      .then((response) => response.json())
      .then((data) => {
        setUserProfileDetails({
          FirstName: data.Item.FirstName,
          LastName: data.Item.LastName,
          UserBio: data.Item.UserBio,
          AccountType: data.Item.AccountType,
          SponsorEmailID: data.Item.SponsorEmailID,
          TotalPoints: data.Item.TotalPoints,
        })
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // component that shows how many points the user has and with what sponsor
  function PointsTypography() {
    if (sponsorName === '') {
      setIsLoading(true)

      //
      let GET_SPONSORDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${userProfileDetails.SponsorEmailID}`
      fetch(GET_SPONSORDATA_URL)
        .then((sponsor_response) => sponsor_response.json())
        .then((sponsor_data) => {
          setSponsorName(
            sponsor_data.Item.FirstName + ' ' + sponsor_data.Item.LastName,
          )
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    return (
      <Typography>
        {userProfileDetails.TotalPoints} pts with {sponsorName}
      </Typography>
    )
  }

  // component that shows the user's profile details
  function ProfileDetails() {
    return (
      <Grid container justify="center">
        <Grid item xs={8} sm={6} md={5} lg={3} align="center">
          <br />
          <Avatar></Avatar>
          <Typography>
            {userProfileDetails.FirstName} {userProfileDetails.LastName}
          </Typography>
          {userProfileDetails.AccountType === 'Driver' ? (
            <PointsTypography />
          ) : null}
          <br />
          <Typography align="center">{userProfileDetails.UserBio}</Typography>
        </Grid>
      </Grid>
    )
  }

  // loading icon that shows up when waiting for data to load
  function LoadingIcon() {
    return (
      <Grid container justify="center">
        <Grid item xs={8} sm={6} md={5} lg={3} align="center">
          <CircularProgress></CircularProgress>
        </Grid>
      </Grid>
    )
  }

  // final card
  return isLoading ? <LoadingIcon /> : <ProfileDetails />
}

export default UserProfileCard
