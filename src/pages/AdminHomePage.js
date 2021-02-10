import Grid from '@material-ui/core/Grid'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AdminUserModPage from '../Components/AdminUserModPage'

function AdminHomePage() {
  let history = useHistory()

  return (
    <Grid container justify="space-evenly">
      <Grid item>
        <p>Welcome to the admin's home page Thomas</p>
        <p> there's nothing here, yet :)</p>

        <div>
          {/* <Button id="butt" variant="contained" color="primary" onClick={() => history.push('/adminMod')}> */}
          <AdminUserModPage></AdminUserModPage>
          {/* </Button> */}
        </div>
      </Grid>
    </Grid>
  )
}

export default AdminHomePage
