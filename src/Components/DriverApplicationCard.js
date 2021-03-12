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
  Typography,
} from '@material-ui/core'
import LoadingIcon from './LoadingIcon'
import ApplyAgainDialog from './ApplyAgainDialog'
import { sortBy } from 'lodash'

const DriverApplicationCard = (props) => {
  let history = useHistory()
  const userData = useContext(UserContext).user
  const [applicationDetails, setApplicationDetails] = useState({
    Username: userData.Username,
    FirstName: userData.FirstName,
    LastName: userData.LastName,
    Bio: userData.Bio,
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
            Username: val.Username.S,
            FirstName: val.FirstName.S,
            LastName: val.LastName.S,
            Organization: val.Organization.S,
          })
        })

        setSponsorList(clean_sonsor_list)
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  if (!isLoading) {
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
        <Grid item container xs={7} align="left">
          <Grid container item xs={12}>
            <Grid item xs={12} align="left">
              <InputLabel id="Sponsor">Sponsor</InputLabel>
            </Grid>
            <Grid item xs={12}>
              <Select
                fullWidth
                labelId="SponsorLabel"
                id="Sponsor"
                onChange={(event) => {
                  // update sponsor
                  let newApplicationDetails = applicationDetails
                  newApplicationDetails.Sponsor = event.target.value
                  setApplicationDetails(newApplicationDetails)
                }}
              >
                {sortBy(sponsorList, ['Organization', 'FirstName']).map(
                  (sponsor) => (
                    // TODO: filter out the sponsors that the driver has already applied to
                    <MenuItem value={sponsor.Username}>
                      {' '}
                      {sponsor.Organization +
                        ': ' +
                        sponsor.FirstName +
                        ' ' +
                        sponsor.LastName}
                    </MenuItem>
                  ),
                )}
              </Select>
            </Grid>
          </Grid>
        </Grid>

        {/* additional comments */}
        <Grid item xs={7} align="center">
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
        <Grid item xs={7} align="center">
          <br></br>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              // validate input
              if (
                !applicationDetails.Sponsor ||
                applicationDetails.Sponsor === ''
              ) {
                alert('Please choose a sponsor company')
                return
              } else if (
                !applicationDetails.Comments ||
                applicationDetails.Comments === ''
              ) {
                alert('Please provide some comments')
                return
              }

              // fetch -> save application in application table
              let SEND_APPLICATION_URL =
                'https://z8yu8acjwj.execute-api.us-east-1.amazonaws.com/dev/submitapplication'
              let requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  DriverID: applicationDetails.Username,
                  SponsorID: applicationDetails.Sponsor,
                  AppComments: applicationDetails.Comments.replaceAll(
                    "'",
                    "''",
                  ),
                }),
              }
              fetch(SEND_APPLICATION_URL, requestOptions).then(() => {
                setDialogIsOpen(true)
              })
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
