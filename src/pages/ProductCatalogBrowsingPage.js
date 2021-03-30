import React, { useContext, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import {
  Button,
  Divider,
  Grid,
  GridList,
  GridListTile,
  Paper,
  Typography,
} from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import ChooseCatalogSponsorDialog from '../Components/ChooseCatalogSponsorDialog'
import LoadingIcon from '../Components/LoadingIcon'
import { Loading } from 'aws-amplify-react'
import { Image } from '@material-ui/icons'

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
  const userData = useContext(UserContext).user

  const [pageUpdate, setPageUpdate] = useState(0)
  const [
    sponsorSelectionDialogIsOpen,
    setSponsorSelectionDialogIsOpen,
  ] = useState(true)
  function setSponsorSelectionDialogIsOpenState(state, refresh) {
    setSponsorSelectionDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [catalogItems, setCatalogItems] = useState(null)
  const [activeSponsor, setActiveSponsor] = useState(false)

  const [pageNumber, setPageNumber] = useState(0)
  const itemsPerPage = 5
  const itemsViewedSoFar = pageNumber * itemsPerPage
  const [pageItems, setPageItems] = useState(null)

  async function setActiveSponsorState(state) {
    setIsLoading(true)
    setActiveSponsor(state)

    let CATALOG_ITEMS_URL = `https://bfv61oiy3h.execute-api.us-east-1.amazonaws.com/dev/getcatalogitems?SponsorID=${state.SponsorID}`
    let catalog_items_raw = await fetch(CATALOG_ITEMS_URL)
    let catalog_items_json = await catalog_items_raw.json()
    let catalog_items_array = await JSON.parse(
      catalog_items_json.body.toString(),
    )
    let catalog_items_parsed = await catalog_items_array.Items[0].ProductIDs.L
    let catalog_items_formatted = catalog_items_parsed.map(
      (element) => element.S,
    )

    let GET_EBAY_ITEMS_URL =
      'https://emdjjz0xd8.execute-api.us-east-1.amazonaws.com/dev/getebayitemsbyproductids'
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ProductIDs: catalog_items_formatted,
      }),
    }
    let item_data_raw = await fetch(GET_EBAY_ITEMS_URL, requestOptions)
    let item_data_json = await item_data_raw.json()
    let item_data_parsed = JSON.parse(item_data_json.body)

    let item_data_array = item_data_parsed.Item.map((element) => {
      return {
        ProductID: element.ItemID,
        Name: element.Title,
        PhotoURL: element.PictureURL[0],
        Stock: element.Quantity - element.QuantitySold,
        Description: element.Description.slice(0, 550),
        Price: element.ConvertedCurrentPrice.Value,
        Location: element.Location,
      }
    })

    let items_to_display = item_data_array.slice(
      itemsViewedSoFar,
      itemsViewedSoFar + itemsPerPage,
    )

    setPageItems(items_to_display)
    setCatalogItems(item_data_array)
    setIsLoading(false)
  }

  return (
    <div className={classes.root}>
      <ChooseCatalogSponsorDialog
        dialogProps={{
          dialogIsOpen: sponsorSelectionDialogIsOpen,
          setDialogIsOpenState: setSponsorSelectionDialogIsOpenState,
          activeSponsor: activeSponsor,
          setActiveSponsor: setActiveSponsorState,
        }}
      />

      {/* layout stuff */}
      <TopAppBar pageTitle="Product catalog"></TopAppBar>
      <LeftDrawer AccountType={userData.AccountType} />

      {/* page content (starts after first div) */}

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Grid container>
          <Grid item xs={12} container>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setSponsorSelectionDialogIsOpenState(true)
              }}
            >
              Choose a sponsor to view their dialog
            </Button>
          </Grid>
          {!isLoading ? (
            <div>
              {activeSponsor ? (
                <Grid item xs={12} container justify="flex-start">
                  <Grid item xs={12}>
                    <br />
                  </Grid>
                  <Grid item container xs={10} spacing={4}>
                    {catalogItems.map((element) => {
                      return (
                        <Grid
                          item
                          container
                          xs={10}
                          justify="flex-start"
                          spacing={4}
                          // component={Paper}
                        >
                          {/* <img src={element.PhotoURL} /> */}
                          <Grid item>
                            <img
                              src={element.PhotoURL}
                              alt="product"
                              style={{ maxWidth: '250px', maxHeight: '250px' }}
                            />
                          </Grid>
                          <Grid item container xs={7}>
                            <Grid item xs={12}>
                              <Typography>{element.Name}</Typography>
                            </Grid>

                            <Grid item xs={12} align="right">
                              <Typography>{element.Stock} in stock</Typography>
                            </Grid>
                            <Grid item xs={12} align="right">
                              <Typography>
                                {Math.ceil(
                                  element.Price /
                                    activeSponsor.PointToDollarRatio,
                                )}{' '}
                                Points
                              </Typography>
                            </Grid>

                            <Grid item xs={12} align="right">
                              <Button variant="contained" color="primary">
                                Add to cart
                              </Button>
                            </Grid>
                          </Grid>

                          <Grid item xs={12}>
                            <Divider />
                          </Grid>
                        </Grid>
                      )
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <br />
                  </Grid>
                </Grid>
              ) : (
                <p>choose a sponsor to view their dialog</p>
              )}
            </div>
          ) : (
            <LoadingIcon />
          )}
        </Grid>
      </main>
    </div>
  )
}

export default ProductCatalogBrowsingPage
