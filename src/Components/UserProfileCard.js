import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Typography } from '@material-ui/core'
import LoadingIcon from './LoadingIcon'

const UserProfileCard = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [sponsorName, setSponsorName] = useState('')
  let userDetails = props.userProfile.userProfile

  useEffect(() => {
    if (userDetails.AccountType === 'Driver') {
      setIsLoading(true)

      let GET_SPONSORDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${userDetails.SponsorEmailID}`
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
  }, [])

  // component that shows how many points the user has and with what sponsor
  function PointsTypography() {
    return (
      <Typography>
        {userDetails.TotalPoints} pts with {sponsorName}
      </Typography>
    )
  }

  // component that shows the user's profile details
  function ProfileDetails() {
    return (
      <Grid container spacing={1} justify="center" direction="column">
        <Grid item align="center">
          <Avatar />
        </Grid>

        <Grid item align="center">
          <Typography>
            {userDetails.FirstName} {userDetails.LastName}
          </Typography>
        </Grid>

        <Grid item align="center">
          {userDetails.AccountType === 'Driver' ? <PointsTypography /> : null}
        </Grid>

        <Grid item xs align="center">
          <br />
        </Grid>

        <Grid item align="center">
          <Typography align="center">{userDetails.UserBio}</Typography>
        </Grid>
        <Grid item xs align="center">
          <br />
        </Grid>
      </Grid>
    )
  }

  function LoadingFiller() {
    return (
      <Grid container spacing={1} justify="center" direction="column">
        <Grid item xs align="center">
          <br />
        </Grid>
        <Grid item xs align="center">
          <br />
        </Grid>
        <Grid item xs align="center">
          <LoadingIcon />
        </Grid>
        <Grid item xs align="center">
          <br />
        </Grid>
        <Grid item xs align="center">
          <br />
        </Grid>
        <Grid item xs align="center">
          <br />
        </Grid>
        <Grid item xs align="center">
          <br />
        </Grid>
      </Grid>
    )
  }

  return isLoading ? <LoadingFiller /> : <ProfileDetails />
}

export default UserProfileCard
