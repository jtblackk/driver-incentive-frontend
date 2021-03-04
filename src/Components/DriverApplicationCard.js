import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../Helpers/UserContext'
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
import ApplyAgainDialog from './ApplyAgainDialog'

const DriverApplicationCard = (props) => {
  let history = useHistory()
  const userData = useContext(UserContext).user
  const [applicationDetails, setApplicationDetails] = useState({
    Email_ID: userData.Email_ID,
    FirstName: userData.FirstName,
    LastName: userData.LastName,
    UserBio: userData.UserBio,
    Sponsor: '',
    Comments: '',
  })
  const [sponsorList, setSponsorList] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  function setDialogIsOpenState(state) {
    setDialogIsOpen(state)
  }

  const [dialogResponse, setDialogResponse] = useState(false)
  function setDialogResponseState(state) {
    setDialogResponse(state)
  }

  useEffect(() => {
    setIsLoading(true)

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
        <ApplyAgainDialog
          dialogIsOpen={dialogIsOpen}
          setDialogIsOpen={setDialogIsOpenState}
          setDialogResponse={setDialogResponseState}
        />

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
                  sponsor_email: applicationDetails.Sponsor,
                  FirstName: applicationDetails.FirstName.replaceAll("'", "''"),
                  LastName: applicationDetails.LastName.replaceAll("'", "''"),
                  comments: applicationDetails.Comments.replaceAll("'", "''"),
                  UserBio: applicationDetails.UserBio.replaceAll("'", "''"),
                }),
              }
              fetch(SEND_APPLICATION_URL, requestOptions).then(() => {
                setDialogIsOpen(true)
              })

              // TODO: ask if the user wants to apply to another sponsor (if there are more to apply to)

              // history.push('/')
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
