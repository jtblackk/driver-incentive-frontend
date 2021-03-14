import React, { useContext, useEffect, useState } from 'react'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from '../Components/LoadingIcon'
import ApplicationManagementDialog from '../Components/ApplicationManagementDialog'
import GenericTable from '../Components/GenericTable'
import { useHistory } from 'react-router'
import DriverManagementDialog from '../Components/DriverManagementDialog'
import SetAllPointRatiosDialog from '../Components/SetAllPointRatiosDialog'

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

export default function ChooseCatalogItemsPanel() {
  const classes = useStyles()
  let history = useHistory()

  const userData = useContext(UserContext).user
  const [isLoading, setIsLoading] = useState(true)

  // dialog control
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }
  function setDialogIsOpenState(state, refresh) {
    setDialogIsOpen(state)

    if (refresh) {
      setPageUpdate(pageUpdate + 1)
    }
  }

  const [table1HeadCells, setTable1HeadCells] = useState(null)

  const [table1Data, setTable1Data] = useState(null)
  function setTable1DataState(state) {
    setTable1Data(state)
  }

  const [selectedEntry, setSelectedEntry] = useState(null)
  function setSelectedEntryState(state) {
    setSelectedEntry(state)
  }

  //   TODO: probably replace this with all catalog item data
  const [allCatalogData, setAllCatalogData] = useState(null)
  const setAllCatalogDataState = (state) => {
    setAllCatalogData(state)
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

      setTable1Data(
        all_catalog_items_formatted.map((element) => {
          return {
            ItemKey: element.ItemKey,
            ItemName: element.ItemName,
            DollarPrice: element.DollarPrice,
            Stock: element.Stock,
          }
        }),
      )
    })().then(() => {
      setIsLoading(false)
    })

    setTable1HeadCells([
      {
        id: 'ItemKey',
        label: 'Key',
        isDate: false,
        width: 100,
      },
      {
        id: 'ItemName',
        label: 'Name',
        isDate: false,
        width: 200,
      },

      {
        id: 'DollarPrice',
        label: 'Price (USD)',
        isDate: false,
        width: 100,
      },

      {
        id: 'Stock',
        label: 'Stock',
        isDate: false,
        width: 100,
      },
    ])
  }, [pageUpdate])

  return (
    // TODO: NEED TO ADD SUPPORT FOR CATALOG ITEM INFO DIALOG

    <Grid container item component={Paper} style={{ padding: 20 }}>
      <Grid item xs={12}>
        <Typography variant="h6">Catalog items</Typography>
      </Grid>
      <Grid item>
        <Typography>View, add, and remove your catalog items.</Typography>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>

      {/* Button row */}
      <Grid item xs={12} container spacing={1} justify="flex-end">
        <Grid item xs={5}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            style={{ backgroundColor: '#444444', color: 'white' }}
            onClick={() => {
              // TODO: NEED TO ADD SUPPORT FOR DELETING ALL CATALOG ITEMS
            }}
          >
            Delete all items
          </Button>
        </Grid>

        <Grid item xs={3}>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              // TODO: NEED TO ADD SUPPORT FOR ADD NEW ITEM DIALOG
            }}
          >
            Add item
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item>
        {isLoading ? (
          <div>
            <br />
            <LoadingIcon />
            <br />
          </div>
        ) : (
          <GenericTable
            headCells={table1HeadCells}
            data={table1Data}
            setDataState={setTable1DataState}
            tableKey="ItemKey"
            showKey={true}
            initialSortedColumn="LastName"
            initialSortedDirection="asc"
            selectedRow={selectedEntry}
            setSelectedRow={setSelectedEntryState}
            dialogIsOpen={dialogIsOpen}
            setDialogIsOpenState={setDialogIsOpenState}
          />
        )}
      </Grid>
    </Grid>
  )
}
