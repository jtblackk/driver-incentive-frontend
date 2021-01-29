import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { useState } from 'react'

function CreateAccountCard() {
  let userDetailObj = {
    Email_ID: 'DEFAULT',
    FirstName: 'DEFAULT',
    LastName: 'DEFAULT',
    AccountType: 'DEFAULT',
  }
  const [userDetails, setUserDetails] = useState(userDetailObj)

  return (
    <div>
      <form>
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
        <br />
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
        <br />
        <TextField
          id="Email_ID"
          label="Email"
          type="email"
          onChange={(event) => {
            // update email in state
            let newUserDetails = userDetails
            newUserDetails.Email_ID = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
        <br />
        <br />
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
          <MenuItem value="driver">Driver</MenuItem>
          <MenuItem value="sponsor">Sponsor</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        <br />
        <TextField
          id="Password"
          label="Password"
          type="password"
          onChange={(event) => {
            // update email in state
            let newUserDetails = userDetails
            newUserDetails.Email_ID = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
        <br />
        <TextField
          id="ConfirmPassword"
          label="Confirm Password"
          type="password"
          onChange={(event) => {
            // update email in state
            let newUserDetails = userDetails
            newUserDetails.Email_ID = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          onClick={() => {
            // set up fetch request -> create new user entry in driver detail database
            let URL = ''
            let requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                Email_ID: userDetails.Email_ID,
                FirstName: userDetails.FirstName,
                LastName: userDetails.LastName,
              }),
            }

            fetch(URL, requestOptions)
          }}
        >
          Create account
        </Button>
      </form>
      <br />
    </div>
  )
}

export default CreateAccountCard
