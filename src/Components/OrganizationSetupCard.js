import { Button, Grid, Paper, TextField } from '@material-ui/core'
import { toLower } from 'lodash'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from './LoadingIcon'
import { useHistory } from 'react-router-dom'

const OrganizationSetupCard = () => {
  const [organizationName, setOrganizationName] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const [organizationList, setOrganizationList] = useState(null)
  const [helperText, setHelperText] = useState(null)

  let history = useHistory()
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

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
          clean_sonsor_list.push(toLower(val.Organization.S))
        })
        setOrganizationList(clean_sonsor_list)
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  if (!isLoading) {
  } else {
    return (
      <Grid container justify="center">
        <Grid item container xs={12} direction="column" spacing={2}>
          <Grid item xs={12}>
            <br />
          </Grid>
          <Grid item xs={12}>
            <LoadingIcon />
          </Grid>
          <Grid item xs={12}>
            <br />
          </Grid>
        </Grid>
      </Grid>
    )
  }
  return (
    <Grid container justify="center">
      <Grid item container xs={12} direction="column" spacing={2}>
        {' '}
        <Grid item align="center">
          <TextField
            fullWidth
            id="OrganizationName"
            error={helperText}
            helperText={helperText}
            variant="filled"
            label="Organization name"
            onChange={(event) => {
              setHelperText(null)
              setOrganizationName(event.target.value)
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(event) => {
              // validate input
              if (!organizationName) {
                setHelperText('Please provide an organization name')
              } else if (organizationList.includes(toLower(organizationName))) {
                setHelperText('Must choose a unique organization name')
              } else {
                ;(async () => {
                  setIsLoading(true)
                  let SAVE_USER_PROFILE_URL =
                    'https://thuv0o9tqa.execute-api.us-east-1.amazonaws.com/dev/saveuserdetails'
                  let requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      Username: userData.Username,
                      Organization: organizationName,
                    }),
                  }
                  let response = await fetch(
                    SAVE_USER_PROFILE_URL,
                    requestOptions,
                  )

                  await setUserData({
                    ...userData,
                    Organization: organizationName,
                  })
                })().then(() => {
                  history.push('/')
                })
              }
            }}
          >
            Create organization
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default OrganizationSetupCard
