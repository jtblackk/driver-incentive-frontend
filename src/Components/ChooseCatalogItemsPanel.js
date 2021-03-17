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
import CatalogItemManagementDialog from './CatalogItemManagementDialog'

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

export default function ChooseCatalogItemsPanel(props) {
  const classes = useStyles()
  let history = useHistory()

  const userData = useContext(UserContext).user
  const [isLoading, setIsLoading] = useState(true)

  const [table1HeadCells, setTable1HeadCells] = useState(null)
  const [table1Data, setTable1Data] = useState(null)

  useEffect(() => {
    setIsLoading(false)

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

    setTable1Data(
      props.tableProps.data.map((element) => {
        return {
          ItemKey: element.ItemKey,
          ItemName: element.ItemName,
          DollarPrice: element.DollarPrice,
          Stock: element.Stock,
        }
      }),
    )
  }, [])

  // // dialog control
  // const [addItemDialogIsOpen, setAddItemDialogIsOpen] = useState(false)
  // function setAddItemDialogIsOpenState(state, refresh) {
  //   setAddItemDialogIsOpen(state)

  //   if (refresh) {
  //     setPageUpdate(pageUpdate + 1)
  //   }
  // }

  // const [itemManagementDialogIsOpen, setItemManagementDialogIsOpen] = useState(
  //   false,
  // )
  // function setItemManagementDialogIsOpenState(state, refresh) {
  //   setItemManagementDialogIsOpen(state)

  //   if (refresh) {
  //     setPageUpdate(pageUpdate + 1)
  //   }
  // }

  // const [pageUpdate, setPageUpdate] = useState(0)
  // function fullPageUpdateState() {
  //   setPageUpdate(pageUpdate + 1)
  // }

  // const [selectedCatalogEntry, setSelectedCategoryEntry] = useState(null)
  // function setSelectedCategoryEntryState(state) {
  //   setSelectedCategoryEntry(state)
  // }

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
        <Grid item>
          <Button
            fullWidth
            size="small"
            variant="contained"
            style={{ backgroundColor: '#444444', color: 'white' }}
            onClick={() => {
              // TODO: NEED TO ADD SUPPORT FOR DELETING ALL CATALOG ITEMS
              props.dialogProps.setDeleteItemCatalogIsOpenState(true)
            }}
          >
            Delete all items
          </Button>
        </Grid>

        <Grid item>
          <Button
            fullWidth
            size="small"
            variant="contained"
            color="primary"
            onClick={() => {
              // TODO: NEED TO ADD SUPPORT FOR ADD NEW ITEM DIALOG
              props.dialogProps.setAddItemDialogIsOpenState(true)
            }}
          >
            Add item
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
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
            setDataState={props.tableProps.setDataState}
            tableKey="ItemKey"
            showKey={true}
            initialSortedColumn="ItemName"
            initialSortedDirection="asc"
            selectedRow={props.tableProps.selectedRow}
            setSelectedRow={props.tableProps.setSelectedRow}
            dialogIsOpen={props.tableProps.dialogIsOpen}
            setDialogIsOpenState={props.tableProps.setDialogIsOpen}
          />
        )}
      </Grid>
    </Grid>
  )
}
