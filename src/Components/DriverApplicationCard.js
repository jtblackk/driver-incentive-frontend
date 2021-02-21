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

// filler data for sponsor selection
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
    Email_ID: props.accountEmail,
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
          labelId="SponsorLabel"
          id="Sponsor"
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
            // update application comments in state
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
            if (applicationDetails.Sponsor === '') {
              alert('Please choose a sponsor company')
              return
            }

            // fetch -> save application in application table
            let SEND_APPLICATION_URL =
              'https://z8yu8acjwj.execute-api.us-east-1.amazonaws.com/dev/submitapplication'
            let requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                applicant_email: applicationDetails.Email_ID,
                FirstName: applicationDetails.FirstName,
                LastName: applicationDetails.LastName,
                UserBio: applicationDetails.UserBio,
                sponsor_email: applicationDetails.Sponsor,
                comments: applicationDetails.Comments,
              }),
            }
            fetch(SEND_APPLICATION_URL, requestOptions)

            // console.log({
            //   applicant_email: applicationDetails.Email_ID,
            //   FirstName: applicationDetails.FirstName,
            //   LastName: applicationDetails.LastName,
            //   UserBio: applicationDetails.UserBio,
            //   sponsor_email: applicationDetails.Sponsor,
            //   comments: applicationDetails.Comments,
            // })
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
