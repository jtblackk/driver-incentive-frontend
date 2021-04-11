/* eslint-disable*/
import { Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'

const EditAccountCard = (props) => {
  const setProfileState = props.setNewDataState
  const userDetails = props.userProfile
  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <div></div>
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
        <Grid
          item
          xs={10}
          container
          spacing={2}
          justify="space-between"
          direction="row"
        >
          {/* first name */}
          <Grid item xs={6} align="center">
            <TextField
              id="FirstName"
              label="First name"
              variant="filled"
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
          <Grid item xs={6} align="center">
            <TextField
              id="LastName"
              label="Last name"
              defaultValue={userDetails.LastName}
              variant="filled"
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
        <Grid item xs={10} align="center">
          {/* <br></br> */}
          <TextField
            id="user-bio"
            label="Bio"
            type="text"
            placeholder="Write a short bio"
            defaultValue={userDetails.Bio}
            variant="filled"
            multiline
            fullWidth
            rows={4}
            onChange={(event) => {
              // update UserBio in state
              let newUserDetails = userDetails
              newUserDetails.Bio = event.target.value
              setProfileState(newUserDetails)
            }}
          />
        </Grid>
      </Grid>
    )
  }
}

export default EditAccountCard
