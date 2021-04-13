import { Grid, Paper } from '@material-ui/core'
import React from 'react'

const OrganizationInvoiceView = (props) => {
  return (
    <Grid item xs={12} container component={Paper}>
      <Grid item xs={12}>
        <div>invoice view for entire organization: {props.Organization}</div>
      </Grid>
    </Grid>
  )
}

export default OrganizationInvoiceView
