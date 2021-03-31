import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import { Avatar, Button, Grid, Paper, Typography } from '@material-ui/core'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from '../Components/LoadingIcon'
import GenericTableSelectable from '../Components/GenericTableSelectable'
import { useHistory } from 'react-router'

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
  // console.log(props)
  const classes = useStyles()
  const userData = useContext(UserContext).user
  const [isLoading, setIsLoading] = useState(true)

  const [table1HeadCells, setTable1HeadCells] = useState(null)
  const [table1Data, setTable1Data] = useState(null)

  useEffect(() => {
    setIsLoading(false)

    setTable1HeadCells([
      // {
      //   id: 'ItemKey',
      //   label: 'Product ID',
      //   isDate: false,
      //   width: 125,
      // },
      {
        id: 'Photo',
        label: 'Photo',
        isDate: false,
        width: 20,
      },
      {
        id: 'Name',
        label: 'Name',
        isDate: false,
        width: 250,
      },

      {
        id: 'Price',
        label: 'Price (USD)',
        isDate: false,
        width: 60,
      },

      {
        id: 'Stock',
        label: 'Quantity',
        isDate: false,
        width: 60,
      },
    ])

    setTable1Data(
      props.tableProps.data.map((element) => {
        return {
          ProductID: element.ProductID,
          Photo: <Avatar src={element.PhotoURL} variant="square" />,
          Name: element.Name,
          Price: element.Price,
          Stock: element.Stock,
        }
      }),
    )
  }, [])

  return (
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
            variant="contained"
            style={{ backgroundColor: '#444444', color: 'white' }}
            onClick={() => {
              props.dialogProps.setDeleteItemCatalogIsOpenState(true)
            }}
          >
            Delete selected
          </Button>
        </Grid>

        <Grid item>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              props.dialogProps.setAddItemDialogIsOpenState(true)
            }}
          >
            Add new items
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
          <GenericTableSelectable
            headCells={table1HeadCells}
            data={table1Data}
            setDataState={props.tableProps.setDataState}
            tableKey="ProductID"
            showKey={false}
            initialSortedColumn="Name"
            initialSortedDirection="asc"
            selectedRow={props.tableProps.selectedRow}
            setSelectedRow={props.tableProps.setSelectedRow}
            dialogIsOpen={props.tableProps.dialogIsOpen}
            setDialogIsOpenState={props.tableProps.setDialogIsOpen}
            checkedItems={props.tableProps.checkedItems}
            setCheckedItems={props.tableProps.setCheckedItemsState}
          />
        )}
      </Grid>
    </Grid>
  )
}
