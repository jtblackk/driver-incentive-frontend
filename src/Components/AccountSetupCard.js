import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import { UserContext } from '../Helpers/UserContext'

import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

const AccountSetupCard = (props) => {
  const userData = useContext(UserContext).user

  let history = useHistory()
  const [userDetails, setUserDetails] = useState({
    Username: userData.Username,
    FirstName: '',
    LastName: '',
    AccountType: '',
    AccountStatus: '',
    Bio: '',
  })

  return (
    <Grid
      container
      justify="center"
      direct="column"
      alignItems="center"
      spacing={2}
    >
      {/* account type */}
      <Grid item xs={12} align="center">
        <InputLabel id="AccountTypeLabel">Account Type</InputLabel>
        <Select
          labelId="AccountTypeLabel"
          id="AccountType"
          onChange={(event) => {
            // update account type in state
            let newUserDetails = userDetails
            newUserDetails.AccountType = event.target.value
            setUserDetails(newUserDetails)
          }}
        >
          <MenuItem value="Driver">Driver</MenuItem>
          <MenuItem value="Sponsor">Sponsor</MenuItem>
        </Select>
      </Grid>

      {/* name row */}
      <Grid item container xs={12} spacing={1} justify="center" direction="row">
        {/* first name */}
        <Grid item xs={2} align="center">
          <TextField
            id="FirstName"
            label="First name"
            onChange={(event) => {
              // update first name in state
              let newUserDetails = userDetails
              newUserDetails.FirstName = event.target.value
              setUserDetails(newUserDetails)
            }}
          />
        </Grid>

        {/* last name */}
        <Grid item xs={2} align="center">
          <TextField
            id="LastName"
            label="Last name"
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
      <Grid item xs={4} align="center">
        <br></br>
        <TextField
          id="user-bio"
          label="Bio"
          type="text"
          placeholder="Write a short bio"
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          onChange={(event) => {
            // update UserBio in state
            let newUserDetails = userDetails
            newUserDetails.Bio = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
      </Grid>

      {/* submit button */}
      <Grid item xs={12} align="center">
        <br></br>
        <Button
          variant="outlined"
          onClick={() => {
            // validate input
            if (userDetails.FirstName === '') {
              alert('Please enter your first name')
              return
            } else if (userDetails.LastName === '') {
              alert('Please enter your last name')
              return
            } else if (userDetails.AccountType === '') {
              alert('Please choose an account type')
              return
            } else if (userDetails.UserBio === '') {
              alert('Please write a bio')
              return
            }

            // save the profile information
            let SAVE_USER_PROFILE_URL =
              'https://u902s79wa3.execute-api.us-east-1.amazonaws.com/dev/saveuserdetails'
            let requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                Username: userDetails.Username,
                FirstName: userDetails.FirstName,
                LastName: userDetails.LastName,
                AccountType: userDetails.AccountType,
                AccountStatus: 1,
                Bio: userDetails.Bio,
                IsInitialSignup: true,
              }),
            }
            fetch(SAVE_USER_PROFILE_URL, requestOptions).then(() => {
              // route user to appropriate page
              if (userDetails.AccountType === 'Driver') {
                history.push('/application')
              } else if (userDetails.AccountType === 'Sponsor') {
                history.push('organization-setup')
              } else {
                history.push('/')
              }
            })
          }}
        >
          Save account details
        </Button>
      </Grid>
    </Grid>
  )
}

export default AccountSetupCard
