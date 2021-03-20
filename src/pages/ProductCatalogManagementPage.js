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
      // TODO: replace this data with live data from the sponsor's catalog | waiting on api
      let all_catalog_items_formatted = [
        {
          ItemKey: 1,
          ItemName: 'big cap',
          DollarPrice: 1.05,
          Stock: '2/25',
        },
        {
          ItemKey: 2,
          ItemName: 'bigger cap',
          DollarPrice: 2.25,
          Stock: '4/10',
        },
      ]

      setAllCatalogData(all_catalog_items_formatted)
      setCheckedItems(
        all_catalog_items_formatted.map((element) => {
          return {
            key: element.ItemKey,
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
              selectedCatalogEntry: selectedCatalogEntry,
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
