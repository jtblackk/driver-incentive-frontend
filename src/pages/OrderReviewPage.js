import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import Typography from '@material-ui/core/Typography'
import LeftDrawer from '../Components/LeftDrawer'
import TopAppBar from '../Components/TopAppBar'
import WaitingForApplicationApprovalScreen from '../Components/WaitingForApplicationAprovalScreen'
import { makeStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../Helpers/Constants'
import LoadingIcon from '../Components/LoadingIcon'
import { UserContext } from '../Helpers/UserContext'
import getUserDetails from '../Helpers/CommonFunctions'
import ProfileSelectionDialog from '../Components/ProfileSelectionDialog'
import { Grid, Paper } from '@material-ui/core'
import GenericTable from '../Components/GenericTable'

// set up styling
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

// TODO: replace mock data with api call
let mock_data = [
  {
    OrderID: {
      S: 'team11driverdemo@gmail.com2021-04-06 15:02:21.280247',
    },
    Cost: {
      N: '41.910000000000004',
    },
    DriverID: {
      S: 'team11driverdemo@gmail.com',
    },
    CurrentPointDollarRatio: {
      N: '0.125',
    },
    Organization: {
      S: 'Alamo Delivery',
    },
    ProductIDs: {
      L: [
        {
          M: {
            ProductID: {
              S: '193548709703',
            },
            Quantity: {
              N: '3',
            },
            CostPerItem: {
              N: '13.97',
            },
          },
        },
      ],
    },
    SponsorID: {
      S: 'team11sponsordemo@gmail.com',
    },
    Status: {
      N: '1',
    },
    OrderSubmitted: {
      S: '2021-04-06 15:02:21.280247',
    },
  },
  {
    OrderID: {
      S: 'team11driverdemo@gmail.com2021-04-06 15:02:56.142110',
    },
    Cost: {
      N: '18.86',
    },
    DriverID: {
      S: 'team11driverdemo@gmail.com',
    },
    CurrentPointDollarRatio: {
      N: '0.125',
    },
    Organization: {
      S: 'Alamo Delivery',
    },
    ProductIDs: {
      L: [
        {
          M: {
            ProductID: {
              S: '193065707751',
            },
            Quantity: {
              N: '1',
            },
            CostPerItem: {
              N: '9.97',
            },
          },
        },
        {
          M: {
            ProductID: {
              S: '133298519957',
            },
            Quantity: {
              N: '1',
            },
            CostPerItem: {
              N: '6.89',
            },
          },
        },
        {
          M: {
            ProductID: {
              S: '133704802714',
            },
            Quantity: {
              N: '2',
            },
            CostPerItem: {
              N: '1',
            },
          },
        },
      ],
    },
    SponsorID: {
      S: 'team11sponsordemo@gmail.com',
    },
    Status: {
      N: '2',
    },
    OrderSubmitted: {
      S: '2021-04-06 15:02:56.142110',
    },
  },
  {
    OrderID: {
      S: 'team11driverdemo@gmail.com2021-04-06 15:02:56.142110',
    },
    Cost: {
      N: '18.86',
    },
    DriverID: {
      S: 'team11driverdemo@gmail.com',
    },
    CurrentPointDollarRatio: {
      N: '0.125',
    },
    Organization: {
      S: 'Alamo Delivery',
    },
    ProductIDs: {
      L: [
        {
          M: {
            ProductID: {
              S: '193065707751',
            },
            Quantity: {
              N: '4',
            },
            CostPerItem: {
              N: '9.97',
            },
          },
        },
        {
          M: {
            ProductID: {
              S: '133298519957',
            },
            Quantity: {
              N: '7',
            },
            CostPerItem: {
              N: '6.89',
            },
          },
        },
        {
          M: {
            ProductID: {
              S: '133704802714',
            },
            Quantity: {
              N: '2',
            },
            CostPerItem: {
              N: '1',
            },
          },
        },
      ],
    },
    SponsorID: {
      S: 'team11sponsordemo@gmail.com',
    },
    Status: {
      N: '3',
    },
    OrderSubmitted: {
      S: '2021-04-06 15:02:56.142110',
    },
  },
]

const currentOrdersTableHeadCells = [
  {
    id: 'Organization',
    label: 'Organization',
    isDate: false,
    width: 50,
  },
  {
    id: 'SponsorID',
    label: 'Sponsor',
    isDate: false,
    width: 50,
  },
  {
    id: 'Cost',
    label: 'Cost (points)',
    isDate: false,
    width: 50,
  },
  {
    id: 'OrderDate',
    label: 'Ordered on',
    isDate: false,
    width: 200,
  },
  {
    id: 'Status',
    label: 'Status',
    isDate: true,
    width: 50,
  },
]

const previousOrdersTableHeadCells = [
  {
    id: 'Organization',
    label: 'Organization',
    isDate: false,
    width: 50,
  },
  {
    id: 'SponsorID',
    label: 'Sponsor',
    isDate: false,
    width: 50,
  },
  {
    id: 'Cost',
    label: 'Cost (points)',
    isDate: false,
    width: 100,
  },
  {
    id: 'OrderDate',
    label: 'Ordered on',
    isDate: false,
    width: 200,
  },
]

export default function OrderReviewPage() {
  let history = useHistory()
  const classes = useStyles()
  const userData = useContext(UserContext).user
  const setUserData = useContext(UserContext).setUser
  const activeProfile = useContext(UserContext).activeProfile
  const setActiveProfile = useContext(UserContext).setActiveProfile

  const [isLoading, setIsLoading] = useState(true)
  const [pageUpdate, setPageUpdate] = useState(0)
  function fullPageUpdateState() {
    setPageUpdate(pageUpdate + 1)
  }

  const [allOrders, setAllOrders] = useState(null)
  function setAllOrdersState(state) {
    setAllOrders(state)
  }

  const [currentOrders, setCurrentOrders] = useState(null)
  function setCurrentOrdersState(state) {
    setCurrentOrders(state)
  }
  const [currentOrdersTableData, setCurrentOrdersTableData] = useState(null)
  function setCurrentOrdersTableDataState(state) {
    setCurrentOrdersTableData(state)
  }
  const [previousOrders, setPreviousOrders] = useState(null)
  function setPreviousOrdersState(state) {
    setPreviousOrders(state)
  }
  const [previousOrdersTableData, setPreviousOrdersTableData] = useState(null)
  function setPreviousOrdersTableDataState(state) {
    setPreviousOrdersTableData(state)
  }

  useEffect(() => {
    ;(async () => {
      // start loading animation
      setIsLoading(true)
      let all_orders_json = mock_data

      let all_orders_parsed = all_orders_json.map((element) => {
        return {
          OrderID: element.OrderID.S,
          DriverID: element.DriverID.S,
          SponsorID: element.SponsorID.S,
          Organization: element.Organization.S,
          Status: parseInt(element.Status.N),
          Cost: parseFloat(element.Cost.N),
          PointDollarRatio: parseFloat(element.CurrentPointDollarRatio.N),
          OrderDate: element.OrderSubmitted.S,
          Products: element.ProductIDs.L.map((element) => {
            return {
              ProductID: element.M.ProductID.S,
              Quantity: parseInt(element.M.Quantity.N),
              PricePerItem: parseFloat(element.M.CostPerItem.N),
            }
          }),
        }
      })

      let current_orders = all_orders_parsed.filter(
        (element) => element.Status < 3,
      )

      let previous_orders = all_orders_parsed.filter(
        (element) => element.Status >= 3,
      )

      let current_orders_table_data = current_orders.map((element) => {
        return {
          OrderID: element.OrderID,
          Organization: element.Organization,
          SponsorID: element.SponsorID,
          Cost: element.Cost / element.PointDollarRatio,
          OrderDate: element.OrderDate,
          Status:
            element.Status === 1
              ? 'Processing'
              : element.Status === 2
              ? 'In transit'
              : element.Status === 3
              ? 'Delivered'
              : 'Unknown status',
        }
      })

      let previous_orders_table_data = previous_orders.map((element) => {
        return {
          OrderID: element.OrderID,
          Organization: element.Organization,
          SponsorID: element.SponsorID,
          Cost: element.Cost / element.PointDollarRatio,
          OrderDate: element.OrderDate,
        }
      })

      setAllOrders(all_orders_parsed)
      setPreviousOrders(previousOrders)
      setPreviousOrdersTableData(previous_orders_table_data)
      setCurrentOrders(currentOrders)
      setCurrentOrdersTableData(current_orders_table_data)

      setIsLoading(false)
    })()
  }, [])

  // show loading screen if data is still being fetched
  if (isLoading) {
    return (
      <div className={classes.root}>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <LoadingIcon />
        </main>
      </div>
    )
  } else {
    return (
      <div className={classes.root}>
        {/* layout stuff */}
        <TopAppBar pageTitle="Your orders"></TopAppBar>
        <LeftDrawer AccountType={userData.AccountType} />

        {/* <ProfileSelectionDialog
          dialogProps={{
            profileSelectionDialogIsOpen: profileSelectionDialogIsOpen,
            setProfileSelectionDialogIsOpenState: setProfileSelectionDialogIsOpenState,
            fullPageUpdateState: fullPageUpdateState,
            activeProfile: activeProfile,
            setActiveProfile: setActiveProfile,
          }}
        /> */}

        {/* page content (starts after first div) */}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid item container justify="center">
            {/* <Grid item xs={12}> */}
            <Grid item xs={10} xl={6}>
              <Paper>
                <div style={{ padding: 20 }}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h6">Current orders</Typography>
                      <Typography>
                        Orders that have not been delivered yet
                      </Typography>
                    </Grid>
                  </Grid>
                  <br></br>
                  <GenericTable
                    headCells={currentOrdersTableHeadCells}
                    data={currentOrdersTableData}
                    setDataState={setCurrentOrdersTableDataState}
                    tableKey="OrderID"
                    showKey={false}
                    initialSortedColumn="OrderDate"
                    initialSortedDirection="desc"
                    //   selectedRow={selectedEntry}
                    //   setSelectedRow={setSelectedEntryState}
                    //   dialogIsOpen={dialogIsOpen}
                    //   setDialogIsOpenState={setDialogIsOpenState}
                  />
                </div>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <br />
            </Grid>

            <Grid item xs={10} xl={6}>
              <Paper>
                <div style={{ padding: 20 }}>
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant="h6">Previous orders</Typography>
                      <Typography>Orders that have been delivered</Typography>
                    </Grid>
                  </Grid>
                  <br></br>
                  <GenericTable
                    headCells={previousOrdersTableHeadCells}
                    data={previousOrdersTableData}
                    setDataState={setPreviousOrdersTableDataState}
                    tableKey="OrderID"
                    showKey={false}
                    initialSortedColumn="OrderDate"
                    initialSortedDirection="desc"
                    //   selectedRow={selectedEntry}
                    //   setSelectedRow={setSelectedEntryState}
                    //   dialogIsOpen={dialogIsOpen}
                    //   setDialogIsOpenState={setDialogIsOpenState}
                  />
                </div>
              </Paper>
            </Grid>
          </Grid>

          {/* </Grid> */}
        </main>
      </div>
    )
  }
}
