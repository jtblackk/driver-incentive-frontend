import { Button, Grid, Paper, TextField } from '@material-ui/core'
import React from 'react'

const OrganizationSetupCard = () => {
  return (
    <Grid container justify="center">
      <Grid item container xs={12} direction="column" spacing={2}>
        {' '}
        <Grid item align="center">
          <TextField
            fullWidth
            id="OrganizationName"
            variant="filled"
            label="Organization name"
            onChange={(event) => {
              // TODO: save input in state
            }}
          ></TextField>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onCLick={(event) => {
              //   TODO: validate input
              // TODO: set organization name in database
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
