import React, { useContext, useEffect, useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import MuiDialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import {
  Divider,
  Grid,
  Input,
  ownerDocument,
  Paper,
  TextField,
} from '@material-ui/core'
import getUserDetails from '../Helpers/CommonFunctions'
import { UserContext } from '../Helpers/UserContext'
import LoadingIcon from './LoadingIcon'

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
})

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

export default function CartDialog(props) {
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser

  const handleClickOpen = () => {
    props.dialogProps.setDialogIsOpenState(true)
  }
  const handleClose = () => {
    props.dialogProps.setDialogIsOpenState(false)
  }

  const [isLoading, setIsLoading] = useState(false)

  const [cartCost, setCartCost] = useState(null)

  useEffect(() => {
    //   setIsLoading(true)
    //   ;(async () => {
    //     let GET_DRIVERS_SPONSORS_URL = `https://8mhdaeq2kl.execute-api.us-east-1.amazonaws.com/dev/getuserdetails/?DriverID=${userData.Username}`
    //     let partnered_sponsors_response = await fetch(GET_DRIVERS_SPONSORS_URL)
    //     let partnered_sponsors_data = await partnered_sponsors_response.json()
    //     let partnered_sponsors_array = await JSON.parse(
    //       partnered_sponsors_data.body.toString(),
    //     ).Items
    //     let active_sponsors_array = partnered_sponsors_array.filter(
    //       (element) =>
    //         parseInt(element.Status.N) === 2 &&
    //         parseInt(element.AccountStatus.N) === 1,
    //     )
    //     let active_sponsors_formatted = active_sponsors_array.map((element) => {
    //       return {
    //         SponsorID: element.SponsorID.S,
    //         SponsorName: element.FirstName.S + ' ' + element.LastName.S,
    //         Points: parseInt(element.Points.N),
    //         SponsorOrganization: element.Organization.S,
    //         PointToDollarRatio: parseFloat(element.PointDollarRatio.N),
    //       }
    //     })
    //     setRegisteredSponsors(active_sponsors_formatted)
    //   })()
    //   setIsLoading(false)
  }, [])

  let cart_cost = props.dialogProps.cart.reduce((prev, curr) => {
    return (
      prev +
      (curr.FullItemDetails.Price * curr.Quantity) /
        props.dialogProps.activeSponsor.PointToDollarRatio
    )
  }, 0)

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.dialogProps.dialogIsOpen}
        fullWidth
        maxWidth="sm"
      >
        <Grid container style={{ padding: 20 }}>
          <Grid item xs={12} container justify="flex-start" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" id="alert-dialog-title">
                Your cart
              </Typography>
            </Grid>
          </Grid>

          <Grid item align="center" xs={12}>
            <br />
          </Grid>

          {isLoading ? (
            <LoadingIcon />
          ) : (
            <Grid container justify="center" spacing={3}>
              {/* {JSON.stringify(props.dialogProps.cart)} */}
              {props.dialogProps.cart.map((element) => {
                return (
                  <Grid item xs={12} container spacing={2} alignItems="center">
                    <Grid item xs={12}>
                      <b> {element.FullItemDetails.Name}</b>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      justify="space-between"
                      alignItems="flex-end"
                      spacing={2}
                    >
                      <Grid>
                        <img
                          src={element.FullItemDetails.PhotoURL}
                          alt="alt text"
                          style={{ maxWidth: '125px', maxHeight: '125px' }}
                        />
                      </Grid>

                      <Grid
                        item
                        container
                        justify="flex-end"
                        // component={Paper}
                        xs={5}
                      >
                        <Grid item>
                          <TextField
                            type="number"
                            variant="filled"
                            size="small"
                            label="Quantity"
                            value={element.Quantity}
                            onChange={(event) => {
                              if (
                                event.target.value >= 0 &&
                                event.target.value <=
                                  element.FullItemDetails.Stock
                              )
                                props.dialogProps.changeItemQuantity(
                                  element,
                                  event.target.value,
                                )
                            }}
                          ></TextField>
                        </Grid>
                        <Grid item>
                          {element.FullItemDetails.Price /
                            props.dialogProps.activeSponsor
                              .PointToDollarRatio}{' '}
                          pts x {element.Quantity} ={' '}
                          {(element.FullItemDetails.Price /
                            props.dialogProps.activeSponsor
                              .PointToDollarRatio) *
                            element.Quantity}{' '}
                          pts
                        </Grid>

                        <Grid item xs={12}>
                          <br />
                        </Grid>

                        <Grid item>
                          <Button
                            variant="contained"
                            style={{
                              color: 'white',
                              backgroundColor: '#444444',
                            }}
                            onClick={() => {
                              props.dialogProps.removeItem(element)
                            }}
                          >
                            Remove from cart
                          </Button>
                        </Grid>

                        {/* <p>Quantity: {element.Quantity}</p> */}
                      </Grid>
                      <Grid item xs={12}>
                        <br />
                      </Grid>
                      <Grid item xs={12}>
                        {' '}
                        <Divider />{' '}
                      </Grid>
                    </Grid>
                  </Grid>
                )
              })}
              {cart_cost > 0 ? (
                <Grid item xs={12} container align="right" justify="flex-end">
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        if (
                          cart_cost > 0 &&
                          cart_cost < props.dialogProps.activeSponsor.Points
                        ) {
                          let ordered_products = props.dialogProps.cart
                            .filter((element) => element.Quantity > 0)
                            .map((element) => {
                              return element.ProductID
                            })

                          let MAKE_ORDER_URL =
                            'https://jbcqty2yxb.execute-api.us-east-1.amazonaws.com/dev/createorder'
                          let requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              SponsorID:
                                props.dialogProps.activeSponsor.SponsorID,
                              DriverID: props.dialogProps.activeDriver.Username,
                              ProductIDs: ordered_products,
                              Cost:
                                cart_cost *
                                props.dialogProps.activeSponsor
                                  .PointToDollarRatio,
                            }),
                          }
                          fetch(MAKE_ORDER_URL, requestOptions).then(() => {
                            // TODO: take the user to an order confirmation page
                            console.log('order confirmation page needs to show')
                          })
                        }
                      }}
                    >
                      Check out
                    </Button>
                  </Grid>
                  <Grid item>{cart_cost} points</Grid>
                </Grid>
              ) : (
                <p>Your cart is empty</p>
              )}
            </Grid>
          )}

          <Grid item align="center" xs={12}>
            <br />
          </Grid>
        </Grid>
      </Dialog>
    </div>
  )
}
