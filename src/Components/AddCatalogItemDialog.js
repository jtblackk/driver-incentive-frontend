import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Divider, Grid, Typography } from '@material-ui/core'
import LoadingIcon from './LoadingIcon'
import Ebay from 'ebay-node-api'

let eBay = require('ebay-node-api')

export default function AddCatalogItemDialog(props) {
  const handleClickOpen = () => {
    props.dialogProps.setAddItemDialogIsOpenState(true)
  }

  const handleClose = () => {
    props.dialogProps.setAddItemDialogIsOpenState(false)
  }

  const [isLoading, setIsLoading] = useState(false)

  const [ebayItems, setEbayItems] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const FETCH_EBAY_ITEMS_URL =
        'https://0hcub33ona.execute-api.us-east-1.amazonaws.com/dev/ebay'
      let ebay_items_raw = await fetch(FETCH_EBAY_ITEMS_URL)
      let ebay_items_json = await ebay_items_raw.json()
      let ebay_items_array = ebay_items_json.Product
      console.log(ebay_items_array)
      setEbayItems(ebayItems)
    })().then(() => {
      setIsLoading(false)
    })

    // setEbay(Ebay({ clientID: 'wtf' }))
    // new eBay({
    //   clientID: 'effBlac-DriverIn-PRD-4418204ca-4dac81da',
    // }),

    setIsLoading(false)
  }, [])

  return (
    <div>
      <Dialog
        open={props.dialogProps.addItemDialogIsOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
                <Typography>
                  display selectable items here (filter out items that are
                  already owned)
                </Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
