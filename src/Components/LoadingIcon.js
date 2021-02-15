import { CircularProgress, Grid } from '@material-ui/core'
import React from 'react'

const LoadingIcon = () => {
  return (
    <Grid container justify="center">
      <Grid item xs={8} sm={6} md={5} lg={3} align="center">
        <CircularProgress></CircularProgress>
      </Grid>
    </Grid>
  )
}

export default LoadingIcon
