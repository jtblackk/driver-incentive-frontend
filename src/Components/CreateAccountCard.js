import email_validator from 'email-validator'
//import { Auth } from "aws-amplify";

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
  const [userDetails, setUserDetails] = useState({
    Email_ID: '',
    Password: '',
    ConfirmPassword: '',
  })

  let history = useHistory()

  return (
    <div>
      <form>
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
            if (userDetails.Email_ID === '')
              alert('Please enter your email address')
            else if (email_validator.validate(userDetails.Email_ID) === false)
              alert('Please enter a valid email address')

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
                ApplicationStatus: 0,
              }),
            }
            fetch(CREATE_USER_URL, requestOptions)

            let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${userDetails.Email_ID}`
            fetch(GET_USERDATA_URL)
              .then((response) => response.json())
              .then((data) => {
                console.log(data)
                // verify that account was successfully created
              })

            history.push('/account-setup')
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
