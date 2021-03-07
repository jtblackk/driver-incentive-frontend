import { Avatar, Grid, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

const EditAccountCard = (props) => {
  const setProfileState = props.setNewDataState
  const userDetails = props.userProfile
  const [isLoading, setIsLoading] = useState(false)

  // console.log(props)

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
        {/* <Grid item align="center">
          <Avatar
            style={{ cursor: 'pointer' }}
            src={userDetails.ProfilePicture}
          />
          <br></br>
        </Grid> */}

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
            defaultValue={userDetails.Bio}
            variant="outlined"
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
