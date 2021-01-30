import email_validator from 'email-validator'

import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import { useState } from 'react'

import { useHistory } from 'react-router-dom'

function CreateAccountCard() {
  let userDetailObj = {
    Email_ID: '',
    FirstName: '',
    LastName: '',
    AccountType: '',
    Password: '',
    ConfirmPassword: '',
  }
  const [userDetails, setUserDetails] = useState(userDetailObj)

  let history = useHistory()

  return (
    <div>
      <form onSubmit={this.handleSubmit}>
      
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
            // update password in state
            let newUserDetails = userDetails
            newUserDetails.Password = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
        <br />
        <TextField
          id="ConfirmPassword"
          label="Confirm Password"
          type="password"
          onChange={(event) => {
            // validate password exists
            let newUserDetails = userDetails
            newUserDetails.ConfirmPassword = event.target.value
            setUserDetails(newUserDetails)
          }}
        />
        <br />
        <br />
        <Button
          variant="outlined"
          onClick={() => {
            // validate input
            if (userDetails.FirstName === '')
              alert('Please enter your first name')

            if (userDetails.LastName === '')
              alert('Please enter your last name')

            if (userDetails.Email_ID === '')
              alert('Please enter your email address')
            else if (email_validator.validate(userDetails.Email_ID) === false)
              alert('Please enter a valid email address')

            if (userDetails.AccountType === '')
              alert('Please choose an account type')

            if (
              userDetails.Password === '' ||
              userDetails.ConfirmPassword === ''
            )
              alert('Please enter a password')
            else if (userDetails.Password !== userDetails.ConfirmPassword)
              alert("Passwords don't match")

            // set up fetch request -> create new user entry in driver detail database
            let CREATE_USER_URL =
              'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/saveuserdetails'
            let requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                Email_id: userDetails.Email_ID,
                AccountType: userDetails.AccountType,
                ApplicationStatus: 0,
                FirstName: userDetails.FirstName,
                LastName: userDetails.LastName,
              }),
            }
            fetch(CREATE_USER_URL, requestOptions)

            // let GET_USERDATA_URL = `https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?email=${userDetails.Email_ID}`
            // fetch(GET_USERDATA_URL)
            //   .then((response) => response.json())
            //   .then((data) => {
            //     console.log(data)
            //    // verify that account was successfully created
            //   })

            // route user to appropriate home page
            if (userDetails.AccountType === 'driver') {
              history.push('/driver')
            } else if (userDetails.AccountType === 'sponsor') {
              history.push('/sponsor')
            } else if (userDetails.AccountType === 'admin') {
              history.push('/admin')
            } else {
            }
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
