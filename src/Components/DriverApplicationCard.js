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
import LoadingIcon from './LoadingIcon'

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
  const [sponsorList, setSponsorList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
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

    let GET_SPONSORDATA_URL =
      'https://2cw17jd576.execute-api.us-east-1.amazonaws.com/dev/sponsorlist'
    fetch(GET_SPONSORDATA_URL)
      .then((response) => response.json())
      .then((data) => {
        let clean_sonsor_list = []

        let sponsor_array = JSON.parse(data.body.toString()).Items
        sponsor_array.forEach((val) => {
          clean_sonsor_list.push({
            Email_id: val.Email_id.S,
            FirstName: val.FirstName.S,
            LastName: val.LastName.S,
            // TODO: add a sponsor nick name (e.g., Statefarm)
          })
        })

        setSponsorList(clean_sonsor_list)
        // console.log(clean_sonsor_list)
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  if (!isLoading) {
    console.log(sponsorList)
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
            {sponsorList.map((sponsor) => (
              <MenuItem value={sponsor.Email_id}>
                {' '}
                {sponsor.Email_id.toString().split('@')[0]}
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
  } else {
    return <LoadingIcon />
  }
}

export default DriverApplicationCard
