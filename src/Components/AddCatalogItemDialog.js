import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Avatar, Divider, Grid, Paper, Typography } from '@material-ui/core'
import LoadingIcon from './LoadingIcon'
import Ebay from 'ebay-node-api'
import GenericTableSelectableSpecial from './GenericTableSelectableSpecial'

let eBay = require('ebay-node-api')

export default function AddCatalogItemDialog(props) {
  const handleClickOpen = () => {
    props.dialogProps.setAddItemDialogIsOpenState(true)
  }

  const handleClose = () => {
    setCheckedItems(
      checkedItems.map((element) => {
        return {
          ...element,
          isChecked: false,
        }
      }),
    )
    props.dialogProps.setAddItemDialogIsOpenState(false)
  }

  const [isLoading, setIsLoading] = useState(false)
  const [table1HeadCells, setTable1HeadCells] = useState(null)
  const [checkedItems, setCheckedItems] = useState(null)
  const [table1Data, setTable1Data] = useState(null)
  function setsetTable1DataState(state) {
    setTable1Data(state)
  }

  const [ebayItems, setEbayItems] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      setTable1HeadCells([
        {
          id: 'Photo',
          label: 'Photo',
          isDate: false,
          width: 20,
        },
        {
          id: 'ItemName',
          label: 'Name',
          isDate: false,
          width: 150,
        },

        {
          id: 'DollarPrice',
          label: 'Price (USD)',
          isDate: false,
          width: 80,
        },
      ])

      const FETCH_EBAY_ITEMS_URL =
        'https://0hcub33ona.execute-api.us-east-1.amazonaws.com/dev/ebay'
      let ebay_items_raw = await fetch(FETCH_EBAY_ITEMS_URL)
      let ebay_items_json = await ebay_items_raw.json()
      let ebay_items_array = ebay_items_json
      let ebay_items_array_formatted = ebay_items_array.map((element) => {
        return {
          ItemKey: element.ItemID,
          ItemName: element.ItemName,
          ItemPhotoURL: element.PhotoURL ? element.PhotoURL : null,
          Price: element.Price,
        }
      })

      let ebay_items_table_data = ebay_items_array_formatted.map((element) => {
        return {
          ItemKey: element.ItemKey,
          Photo: <Avatar src={element.ItemPhotoURL} variant="square" />,
          ItemName: element.ItemName,
          DollarPrice: parseFloat(element.Price),
        }
      })

      setTable1Data(ebay_items_table_data)
      setCheckedItems(
        ebay_items_table_data.map((element) => {
          return {
            key: element.ItemKey,
            isChecked: false,
          }
        }),
      )

      setEbayItems(ebayItems)
    })().then(() => {
      setIsLoading(false)
    })
  }, [])

  return (
    <div>
      <Dialog
        open={props.dialogProps.addItemDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          {'Select items to add'}
        </DialogTitle>
        <DialogContent>
          {isLoading ? (
            <LoadingIcon />
          ) : (
            <Grid container spacing="2">
              <Grid item xs={12}>
                <GenericTableSelectableSpecial
                  headCells={table1HeadCells}
                  data={table1Data}
                  setDataState={setsetTable1DataState}
                  tableKey="ItemKey"
                  showKey={false}
                  initialSortedColumn="ItemName"
                  initialSortedDirection="asc"
                  // selectedRow={props.tableProps.selectedRow}
                  // setSelectedRow={props.tableProps.setSelectedRow}
                  // dialogIsOpen={props.tableProps.dialogIsOpen}
                  // setDialogIsOpenState={props.tableProps.setDialogIsOpen}
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
                />
              </Grid>
              <Grid item container xs={12} justify="flex-end">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Add items
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
