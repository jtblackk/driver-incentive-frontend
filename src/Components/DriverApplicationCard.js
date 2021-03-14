import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../Helpers/UserContext'
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
    ;(async () => {
      // get all the potential sponsors
      let GET_SPONSORLIST_URL =
        'https://2cw17jd576.execute-api.us-east-1.amazonaws.com/dev/sponsorlist'
      let sponsorlist_response = await fetch(GET_SPONSORLIST_URL)
      let sponsorlist_data = await sponsorlist_response.json()
      let sponsorlist_array = JSON.parse(sponsorlist_data.body.toString()).Items
      let sponsorlist_formatted = sponsorlist_array.map((element) => {
        return {
          Username: element.Username.S,
          FirstName: element.FirstName.S,
          LastName: element.LastName.S,
          Organization: element.Organization.S,
        }
      })

      let GET_DRIVERS_SPONSORS_URL = `https://8mhdaeq2kl.execute-api.us-east-1.amazonaws.com/dev/getuserdetails/?DriverID=${userData.Username}`
      let partnered_sponsors_response = await fetch(GET_DRIVERS_SPONSORS_URL)
      let partnered_sponsors_data = await partnered_sponsors_response.json()
      let partnered_sponsors_array = JSON.parse(
        partnered_sponsors_data.body.toString(),
      ).Items
      let partnered_sponsors_formatted = partnered_sponsors_array.map(
        (element) => {
          return element.SponsorID.S
        },
      )

      let eligible_sponsor_list = sponsorlist_formatted.filter((element) => {
        return !partnered_sponsors_formatted.includes(element.Username)
      })

      setSponsorList(eligible_sponsor_list)
    })().then(() => {
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
