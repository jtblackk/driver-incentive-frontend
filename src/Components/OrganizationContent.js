import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { toLower } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from './LoadingIcon'

function OrganizationInfoPanel(props) {
  useEffect(() => {
    ;(async () => {
      let GET_ORG_USERS_URL = `https://xqgw415uwe.execute-api.us-east-1.amazonaws.com/dev/getorguserdata?Organization=${userData.Organization.replace(
        ' ',
        '%20',
      )}`
      // let org_users_raw = await fetch(GET_ORG_USERS_URL)
      // let org_users_json = await org_users_raw.json()
      // let org_users_parsed = JSON.parse(org_users_json.body.toString())
      // TODO: continue parsing data and calculate analytics | waiting for api
      // console.log(org_users_parsed)
    })()
  })

  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  const [organizationNameHelperText, setOrganizationNameHelperText] = useState(
    null,
  )

  const [isLoading, setIsLoading] = useState(false)

  if (isLoading) {
    return <LoadingIcon></LoadingIcon>
  } else {
    return (
      // header
      <Grid
        item
        container
        justify="space-between"
        xs={12}
        component={Paper}
        style={{ padding: 20 }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">Organization info</Typography>
        </Grid>

        <Grid item xs={12}>
          <br />
        </Grid>

        {/* organization data */}
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          spacing={1}
          justify="center"
        >
          <Grid item container xs={12} md={12} spacing={2}>
            <Grid item xs={6} align="right">
              <Typography>
                <Box fontWeight="fontWeightBold">Organization name:</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} align="left">
              {userData.Organization}
            </Grid>
          </Grid>

          <Grid item container xs={12} md={12} spacing={2}>
            <Grid item xs={6} align="right">
              <Typography>
                <Box fontWeight="fontWeightBold">Leader:</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} align="left">
              org leader's email and name
            </Grid>
          </Grid>

          <Grid item container xs={12} md={12} spacing={2}>
            <Grid item xs={6} align="right">
              <Typography>
                <Box fontWeight="fontWeightBold">Total sponsors:</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} align="left">
              number of sponsors
            </Grid>
          </Grid>

          <Grid item container xs={12} md={12} spacing={2}>
            <Grid item xs={6} align="right">
              <Typography>
                <Box fontWeight="fontWeightBold">Total drivers:</Box>
              </Typography>
            </Grid>
            <Grid item xs={6} align="left">
              number of drivers
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default function OrganizationContent(props) {
  return (
    <Grid item xs={12} container justify="center">
      <Grid item xs={12}>
        <OrganizationInfoPanel />
      </Grid>
    </Grid>
  )
}
