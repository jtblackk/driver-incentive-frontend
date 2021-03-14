import React, { useContext, useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Grid, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import ChooseCatalogItemsPanel from '../Components/ChooseCatalogItemsPanel'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

const ProductCatalogManagementPage = () => {
  const classes = useStyles()
  const userData = useContext(UserContext).user

  return (
    <div className={classes.root}>
      {/* layout stuff */}
      <TopAppBar pageTitle="Catalog management"></TopAppBar>
      <LeftDrawer AccountType={userData.AccountType} />

      {/* page content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center">
          <Grid item sm={11} md={8} lg={6} xl={4}>
            <ChooseCatalogItemsPanel />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export default ProductCatalogManagementPage
