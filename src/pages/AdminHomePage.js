import Grid from '@material-ui/core/Grid'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import AdminUserModPage from '../Components/AdminUserModPage'
import AdminDelUser from '../Components/AdminDelUser'
import TopAppBar from '../Components/TopAppBar'
import AdminUserTable from '../Components/AdminUserTable'
import ReactDataGrid from 'react-data-grid'

function AdminHomePage() {
  let history = useHistory()

  return (
    <div>
      <TopAppBar pageTitle="Admin Settings" />

      <Grid container justify="space-evenly">
        {/* <div class="row">
          <div class="column" style="background-color:#FFB695;">
              <h2>Column 1</h2>
              <p>Data..</p>
          </div>
          <div class="column" style="background-color:#96D1CD;">
              <h2>Column 2</h2>
              <p>Data..</p>
          </div>
      </div> */}
        <Grid item>
          <p id="test">Welcome to the admin's home page Thomas</p>
          <AdminDelUser></AdminDelUser>
          {/* <Button id="butt" variant="contained" color="primary" onClick={() => history.push('/adminMod')}> */}
          <AdminUserModPage></AdminUserModPage>
          {/* <AdminUserTable></AdminUserTable> */}
          {/* </Button> */}
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminHomePage
