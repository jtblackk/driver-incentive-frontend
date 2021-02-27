import React from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Typography } from '@material-ui/core'

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

const ProductCatalogBrowsingPage = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {/* layout stuff */}
      <TopAppBar pageTitle="Home"></TopAppBar>
      <LeftDrawer AccountType={'Sponsor'} />

      {/* page content (starts after first div) */}
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Typography>
          your sponsor's product catalog will display here
        </Typography>
      </main>
    </div>
  )
}

export default ProductCatalogBrowsingPage
