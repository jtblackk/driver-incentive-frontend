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
  const setProfileState = props.userProfile.setProfileState
  const userDetails = props.userProfile.userProfile

  const [isLoading, setIsLoading] = useState(false)

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
                setProfileState(newUserDetails)
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
                setProfileState(newUserDetails)
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
              setProfileState(newUserDetails)
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

export default EditAccountCard
