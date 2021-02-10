import Grid from '@material-ui/core/Grid'
import { data } from 'browserslist'
import { useState } from 'react'
import Button from '@material-ui/core/Button'
import { ListItem } from '@material-ui/core'
import React, { useEffect } from 'react'
import '../App.css'
import addEntryData from './User_List'
import withListLoading from './with_List_Loading'

function AdminUserModPage() {
  const ListLoading = withListLoading(addEntryData)
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
  })

  useEffect(() => {
    setAppState({ loading: true })
    const apiUrl =
      'https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/entries'
    fetch(apiUrl)
      .then((res) => res.json())
      .then((repos) => {
        console.log(repos)
        // addEntryData(repos)
        setAppState({ loading: false, repos: repos })
      })
  }, [setAppState])

  return (
    <div className="App">
      <div className="container">
        <h1>User Tables</h1>
      </div>
      <div className="repo-container">
        <ListLoading isLoading={appState.loading} repos={appState.repos} />
      </div>
    </div>
  )

  // let userDetailObj = {
  //   Email_ID: '',
  //   FirstName: '',
  //   LastName: '',
  //   AccountType: '',
  //   TotalPoints: '',
  // }
  // const [userDetails, setUserDetails] = useState(userDetailObj)

  // let GET_USERDATA_URL = //'https://cors-anywhere.herokuapp.com/https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/entries'
  // 'https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/entries'
  // // 'https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/DynamoDB_read'
  // // fetch(GET_USERDATA_URL)
  // var x =[[]];
  // var i;
  // const myList = document.querySelector('ul');
  // fetch(GET_USERDATA_URL)
  // .then((response) => response.json())
  // .then((data) => {
  //   // for (const user of data.Items) {
  //   //   let listItem = document.createElement('li');
  //   //   listItem.appendChild(
  //   //     document.createElement('strong')
  //   //   ).textContent = product.Name;
  //   //   listItem.append(
  //   //     ` can be found in ${
  //   //       product.Location
  //   //     }. Cost: `
  //   //   );
  //   //   listItem.appendChild(
  //   //     document.createElement('strong')
  //   //   ).textContent = `£${product.Price}`;
  //   //   myList.appendChild(listItem);
  //   // }
  //   // console.log(data)
  //   // console.log(data.Items.length)
  //   // console.log(x[0][0])
  //   // console.log(data.Items[0])
  //   // verify that account was successfully created
  //     })

  // return (
  //   <div>
  //   <Grid container justify="space-evenly">

  //     <Grid item>
  //       <p id="demo">404: page doesn't exist :(</p>

  //       <Button
  //         variant="outlined"
  //         onClick={() => {
  //             let GET_USERDATA_URL = //'https://cors-anywhere.herokuapp.com/https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/entries'
  //             'https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/entries'
  //             // 'https://wn0wfce7a3.execute-api.us-east-1.amazonaws.com/dev/DynamoDB_read'
  //             // fetch(GET_USERDATA_URL)
  //             var x =[[]];
  //             var i;
  //             fetch(GET_USERDATA_URL)
  //             .then((response) => response.json())
  //             .then((data) => {
  //               // for (i in data.Items) {
  //               //   x.push(data.Items[i])
  //               // }
  //               console.log(data)
  //               console.log(data.length)
  //               console.log(data[6])
  //               // console.log(data.Items[6].AccountType)
  //               // console.log(data.Items[6].Email_id)
  //               // console.log(data.Items[6].FirstName)
  //               // console.log(data.Items[6].LastName)
  //               // if (!data.Items[5].TotalPoints)
  //               // {
  //               //   console.log(0)

  //               // }else{
  //               //   console.log(data.Items[5].TotalPoints)
  //               // }

  //               // verify that account was successfully created
  //                 })
  //               }
  //             }
  //             >
  //           test
  //         </Button>
  //     </Grid>
  //   </Grid>

  //   </div>
  // )
}

export default AdminUserModPage
