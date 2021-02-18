import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import LoadingIcon from './LoadingIcon'

const EditAccountCard = (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userDetails, setUserDetails] = useState({
    Email_ID: props.accountEmail,
    FirstName: '',
    LastName: '',
    AccountType: '',
    UserBio: '',
  })

  useEffect(() => {
    // retrieve user data
    let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${userDetails.Email_ID}`
    fetch(GET_USERDATA_URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserDetails({
          Email_ID: props.accountEmail,
          FirstName: data.Item.FirstName,
          LastName: data.Item.LastName,
          UserBio: data.Item.UserBio,
        })
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  if (isLoading) {
    return <LoadingIcon />
  } else {
    return (
      <Grid
        container
        justify="center"
        direct="column"
        alignItems="center"
        spacing={2}
      >
        {/* name row */}
        <Grid container spacing={1} justify="center" direction="row">
          {/* first name */}
          <Grid item xs={4} align="center">
            <TextField
              id="FirstName"
              label="First name"
              defaultValue={userDetails.FirstName}
              onChange={(event) => {
                // update first name in state
                let newUserDetails = userDetails
                newUserDetails.FirstName = event.target.value
                setUserDetails(newUserDetails)
              }}
            />
          </Grid>

          {/* last name */}
          <Grid item xs={4} align="center">
            <TextField
              id="LastName"
              label="Last name"
              defaultValue={userDetails.LastName}
              onChange={(event) => {
                // update last name in state
                let newUserDetails = userDetails
                newUserDetails.LastName = event.target.value
                setUserDetails(newUserDetails)
              }}
            />
          </Grid>
        </Grid>

        {/* bio */}
        <Grid item xs={8} align="center">
          <br></br>
          <TextField
            id="user-bio"
            label="Bio"
            type="text"
            placeholder="Write a short bio"
            defaultValue={userDetails.UserBio}
            variant="outlined"
            multiline
            fullWidth
            rows={4}
            onChange={(event) => {
              // update UserBio in state
              let newUserDetails = userDetails
              newUserDetails.UserBio = event.target.value
              setUserDetails(newUserDetails)
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

export default EditAccountCard
