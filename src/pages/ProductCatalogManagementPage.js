import React, { useContext, useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Grid, Paper, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import ChooseCatalogItemsPanel from '../Components/ChooseCatalogItemsPanel'
import CatalogItemManagementDialog from '../Components/CatalogItemManagementDialog'
import LoadingIcon from '../Components/LoadingIcon'
import AddCatalogItemDialog from '../Components/AddCatalogItemDialog'
import DeleteCatalogItemDialog from '../Components/DeleteCatalogItemDialog'

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

  const [isLoading, setIsLoading] = useState(true)

  const [itemTableData, setItemTableData] = useState(null)
  function setItemTableDataState(state) {
    setItemTableData(state)
  }

  const [allCatalogData, setAllCatalogData] = useState(null)
  const setAllCatalogDataState = (state) => {
    setAllCatalogData(state)
  }

  // dialog control
  const [addItemDialogIsOpen, setAddItemDialogIsOpen] = useState(false)
  function setAddItemDialogIsOpenState(state, refresh) {
    setAddItemDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [deleteItemCatalogIsOpen, setDeleteItemCatalogIsOpen] = useState(false)
  function setDeleteItemCatalogIsOpenState(state, refresh) {
    setDeleteItemCatalogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [itemManagementDialogIsOpen, setItemManagementDialogIsOpen] = useState(
    false,
  )
  function setItemManagementDialogIsOpenState(state, refresh) {
    setItemManagementDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }

  const [selectedCatalogEntry, setSelectedCategoryEntry] = useState(null)
  function setSelectedCategoryEntryState(state) {
    setSelectedCategoryEntry(state)
  }

  const [checkedItems, setCheckedItems] = useState(null)
  function setCheckedItemsState(state) {
    setCheckedItems(state)
  }

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      // test?
      // TODO: replace this data with live data | waiting on api to get a sponsor's ebay items
      let list_of_product_ids = [
        '333596718645',
        '122472037548',
        '152355004654',
        '333596715743',
        '182890213137',
        '112981655768',
        '392985369381',
        '164099086115',
        '302673385924',
      ]

      // TODO: get item data from list

      let GET_EBAY_ITEMS_URL =
        'https://emdjjz0xd8.execute-api.us-east-1.amazonaws.com/dev/getebayitemsbyproductids'
      let requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ProductIDs: list_of_product_ids,
        }),
      }
      let item_data_raw = await fetch(GET_EBAY_ITEMS_URL, requestOptions)
      let item_data_json = await item_data_raw.json()
      let item_data_parsed = JSON.parse(item_data_json.body)

      console.log(item_data_parsed)

      let item_data_array = item_data_parsed.Item.map((element) => {
        return {
          ProductID: element.ItemID,
          Name: element.Title,
          PhotoURL: element.PictureURL[0],
          Stock: element.Quantity,
          Description: element.Description,
          Price: element.ConvertedCurrentPrice.Value,
          Location: element.Location,
        }
      })

      let catalog_item_table_data = item_data_array.map((element) => {
        return {
          ProductID: element.ProductID,
          PhotoURL: element.PhotoURL,
          Name: element.Name,
          Price: element.Price,
          Stock: element.Stock,
        }
      })
      // console.log(catalog_item_table_data)

      setAllCatalogData(item_data_array)
      setCheckedItems(
        catalog_item_table_data.map((element) => {
          return {
            key: element.ProductID,
            isChecked: false,
          }
        }),
      )
    })().then(() => {
      setIsLoading(false)
    })
  }, [pageUpdate])

  if (isLoading) {
    return <LoadingIcon />
  } else {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Catalog management"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />
        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <CatalogItemManagementDialog
            dialogProps={{
              itemManagementDialogIsOpen: itemManagementDialogIsOpen,
              setItemManagementDialogIsOpenState: setItemManagementDialogIsOpenState,
              fullPageUpdateState: fullPageUpdateState,
              selectedCatalogEntry: selectedCatalogEntry
                ? allCatalogData.find((element) => {
                    return element.ProductID === selectedCatalogEntry.ProductID
                  })
                : null,
            }}
          />
          <AddCatalogItemDialog
            dialogProps={{
              addItemDialogIsOpen: addItemDialogIsOpen,
              setAddItemDialogIsOpenState: setAddItemDialogIsOpenState,
              fullPageUpdateState: fullPageUpdateState,
              allCatalogData: allCatalogData,
              setAllCatalogDataState: setAllCatalogDataState,
            }}
          />

          <DeleteCatalogItemDialog
            dialogProps={{
              deleteItemCatalogIsOpen: deleteItemCatalogIsOpen,
              setDeleteItemCatalogIsOpenState: setDeleteItemCatalogIsOpenState,
              fullPageUpdateState: fullPageUpdateState,
              allCatalogData: allCatalogData,
              setAllCatalogDataState: setAllCatalogDataState,
            }}
          />

          <Grid container justify="center">
            <Grid item sm={12} md={8} lg={7} xl={6}>
              <ChooseCatalogItemsPanel
                tableProps={{
                  data: allCatalogData,
                  setDataState: setItemTableDataState,
                  selectedRow: selectedCatalogEntry,
                  setSelectedRow: setSelectedCategoryEntryState,
                  dialogIsOpen: itemManagementDialogIsOpen,
                  setDialogIsOpen: setItemManagementDialogIsOpenState,
                  setCheckedItemsState: setCheckedItemsState,
                  checkedItems: checkedItems,
                }}
                dialogProps={{
                  itemManagementDialogIsOpen: itemManagementDialogIsOpen,
                  setItemManagementDialogIsOpenState: setItemManagementDialogIsOpenState,
                  addItemDialogIsOpen: addItemDialogIsOpen,
                  setAddItemDialogIsOpenState: setAddItemDialogIsOpenState,
                  allCatalogData: allCatalogData,
                  setAllCatalogDataState: setAllCatalogDataState,
                  setDeleteItemCatalogIsOpenState: setDeleteItemCatalogIsOpenState,
                }}
              />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

export default ProductCatalogManagementPage
