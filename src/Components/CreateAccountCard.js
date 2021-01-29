import { Button, TextField, Typography } from '@material-ui/core'
import react, { useState } from 'react'

function CreateAccountCard() {
  let userDetailObj = {
    Email_ID: 'DEFAULT',
    FirstName: 'DEFAULT',
    LastName: 'DEFAULT',
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
          id="Confirm Password"
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
      </form>

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

          // fetch(URL, requestOptions)
        }}
      >
        Create account
      </Button>
    </div>
  )
}

export default CreateAccountCard
