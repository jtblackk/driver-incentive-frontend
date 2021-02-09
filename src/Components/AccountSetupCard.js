import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const AccountSetupCard = (props) => {
  const [userDetails, setUserDetails] = useState({
    Email_ID: props.accountEmail,
    FirstName: '',
    LastName: '',
    AccountType: '',
    UserBio: '',
  })

  let history = useHistory()

  return (
    <Grid
      container
      justify="center"
      direct="column"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} align="center">
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

      <Grid item xs={12} align="center">
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
      <Grid item xs={5} align="center">
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
            newUserDetails.UserBio = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <br></br>
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
          {/* <MenuItem value="Admin">Admin</MenuItem> */}
        </Select>
      </Grid>
      <Grid item xs={12} align="center">
        <br></br>
        <Button
          variant="outlined"
          onClick={() => {
            // validate input
            if (userDetails.FirstName === '') {
              alert('Please enter your first name')
              return
            }

            if (userDetails.LastName === '') {
              alert('Please enter your last name')
              return
            }

            if (userDetails.AccountType === '') {
              alert('Please choose an account type')
              return
            }

            if (userDetails.UserBio === '') {
              alert('Please write a bio')
              return
            }

            // set up fetch request -> save userdata in DB
            let SAVE_ACCOUNT_DETAILS_URL =
              'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/saveuserdetails'
            let requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                Email_id: userDetails.Email_ID,
                FirstName: userDetails.FirstName,
                LastName: userDetails.LastName,
                AccountType: userDetails.AccountType,
                UserBio: userDetails.UserBio,
                ApplicationStatus: 0,
              }),
            }
            fetch(SAVE_ACCOUNT_DETAILS_URL, requestOptions)

            // route user to home page
            history.push('/')
          }}
        >
          Save account details
        </Button>
      </Grid>
    </Grid>
  )
}

export default AccountSetupCard
