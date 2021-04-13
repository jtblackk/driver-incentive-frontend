import { Grid, Paper } from '@material-ui/core'
import React from 'react'

const SponsorInvoiceView = (props) => {
  return (
    <Grid item xs={12} container component={Paper}>
      <div>Sponsor invoice view for sponsor: {props.SponsorID}</div>
    </Grid>
  )
}

export default SponsorInvoiceView
