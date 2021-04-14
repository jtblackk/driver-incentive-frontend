import { Divider, Grid, MenuItem, Select, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import OrganizationInvoiceView from './OrganizationInvoiceView'
import SponsorInvoiceView from './SponsorInvoiceView'
import _ from 'lodash'

const OrganizationInvoiceContent = (props) => {
  const [isLoading, setIsLoading] = useState(null)
  const [orgSponsors, setOrgSponsors] = useState(null)
  const [selectedSponsor, setSelectedSponsor] = useState(
    props.SponsorID ? props.SponsorID : null,
  )

  useEffect(() => {
    ;(async () => {
      setSelectedSponsor(props.SponsorID)
      // start loading animation
      setIsLoading(true)

      let GET_ORG_SPONSORS_URL = `https://xqgw415uwe.execute-api.us-east-1.amazonaws.com/dev/getorgsponsors?Organization=${props.Organization.replace(
        ' ',
        '%20',
      )}`
      let org_sponsors_raw = await fetch(GET_ORG_SPONSORS_URL)
      let org_sponsors_json = await org_sponsors_raw.json()
      let org_sponsors_parsed = JSON.parse(org_sponsors_json.body.toString())
      let org_sponsors_formatted = org_sponsors_parsed.Items.filter(
        (element) => parseInt(element.AccountStatus.N) < 2,
      ).map((element) => {
        return {
          Username: element.Username.S,
          Name: element.FirstName.S + ' ' + element.LastName.S,
        }
      })

      setOrgSponsors(org_sponsors_formatted)
    })().then(() => {
      setIsLoading(false)
    })
  }, [props.Organization])

  return (
    <Grid item container>
      <OrganizationInvoiceView Organization={props.Organization} />
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={10}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12} container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">
            Sponsor invoices: {selectedSponsor}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <br />
        </Grid>
      </Grid>
      <Grid item container xs={10}>
        <Grid item xs={12}>
          <Select
            fullWidth
            labelId="SponsorLabel"
            id="Sponsor"
            variant="filled"
            value={selectedSponsor}
            onChange={(event) => {
              // update sponsor
              setSelectedSponsor(event.target.value)
            }}
          >
            {_.sortBy(orgSponsors, ['Organization', 'Name'], ['asc']).map(
              (sponsor) => (
                <MenuItem value={sponsor.Username}>
                  {' '}
                  {sponsor.Username + ': ' + sponsor.Name}
                </MenuItem>
              ),
            )}
          </Select>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      {/* TODO: feed input from a dropdown */}
      <SponsorInvoiceView SponsorID={selectedSponsor} />
    </Grid>
  )
}

export default OrganizationInvoiceContent
