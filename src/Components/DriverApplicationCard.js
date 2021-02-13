import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

const sponsors = [
  {
    SponsorEmailID: 'sponsor1@gmail.com',
    SponsorCompanyName: 'The Best Sponsors',
    SponsorProfilID: 'a_unique_id',
  },
  {
    SponsorEmailID: 'sponsor2@gmail.com',
    SponsorCompanyName: 'The Bestest Sponsors',
    SponsorProfilID: 'a_unique_id',
  },
  {
    SponsorEmailID: 'sponsor3@gmail.com',
    SponsorCompanyName: 'Even better Sponsors',
    SponsorProfilID: 'a_unique_id',
  },
]

const DriverApplicationCard = (props) => {
  let history = useHistory()
  const [applicationDetails, setApplicationDetails] = useState({
    ApplicantEmailID: props.accountEmail,
    FirstName: '',
    LastName: '',
    UserBio: '',
    Sponsor: '',
    Comments: '',
  })
  useEffect(() => {
    // retrieve user data
    let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${props.accountEmail}`
    fetch(GET_USERDATA_URL)
      .then((response) => response.json())
      .then((data) => {
        let newApplicationDetails = applicationDetails
        newApplicationDetails.FirstName = data.Item.FirstName
        newApplicationDetails.LastName = data.Item.LastName
        newApplicationDetails.UserBio = data.Item.UserBio
        setApplicationDetails(newApplicationDetails)
      })

    // TODO: retrieve list of sponsor companies
  }, [])

  return (
    <Grid
      container
      justify="center"
      direct="column"
      alignItems="center"
      spacing={2}
    >
      {/* sponsor */}
      <Grid item xs={12} align="center">
        <InputLabel id="Sponsor">Sponsor</InputLabel>
        <Select
          labelId="AccountTypeLabel"
          id="AccountType"
          onChange={(event) => {
            // update sponsor
            let newApplicationDetails = applicationDetails
            newApplicationDetails.Sponsor = event.target.value
            setApplicationDetails(newApplicationDetails)
          }}
        >
          {sponsors.map((sponsor) => (
            <MenuItem value={sponsor.SponsorEmailID}>
              {' '}
              {sponsor.SponsorCompanyName}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      {/* additional comments */}
      <Grid item xs={6} align="center">
        <br></br>
        <TextField
          id="additional-comments"
          label="Comments"
          type="text"
          placeholder="Any comments?"
          variant="outlined"
          multiline
          fullWidth
          rows={4}
          onChange={(event) => {
            // update UserBio in state
            let newApplicationDetails = applicationDetails
            newApplicationDetails.Comments = event.target.value
            setApplicationDetails(newApplicationDetails)
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
            if (applicationDetails.SponsorCompany === '') {
              alert('Please choose a sponsor company')
              return
            }

            console.log(applicationDetails)

            // TODO:  fetch -> save application in application table
            // let SAVE_USER_PROFILE_URL =
            //   'https://5u7lb05615.execute-api.us-east-1.amazonaws.com/saveuserprofile'
            // let requestOptions = {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({
            //     Email_id: userDetails.Email_ID,
            //     FirstName: userDetails.FirstName,
            //     LastName: userDetails.LastName,
            //     AccountType: userDetails.AccountType,
            //     UserBio: userDetails.UserBio,
            //   }),
            // }
            // fetch(SAVE_USER_PROFILE_URL, requestOptions).then(() => {
            //   // route user to appropriate page
            //   if (userDetails.AccountType === 'Driver') {
            //     history.push('/application')
            //   } else {
            //     history.push('/')
            //   }
            // })

            // direct driver to home page
            history.push('/')
          }}
        >
          Apply
        </Button>
      </Grid>
    </Grid>
  )
}

export default DriverApplicationCard
