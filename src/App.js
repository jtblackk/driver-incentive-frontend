import './App.css'
import Amplify, { Auth } from 'aws-amplify'
import awsconfig from './aws-exports'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { withAuthenticator } from 'aws-amplify-react'
import PageNotFoundPage from './pages/PageNotFoundPage'
import AccountSetupPage from './pages/AccountSetupPage'
import ProfilePage from './pages/ProfilePage'
import IndexPage from './pages/IndexPage'
import ApplicationPage from './pages/ApplicationPage'
import '@aws-amplify/ui/dist/style.css'
import ApplicantManagementPage from './pages/ApplicantManagementPage'
import ProductCatalogManagementPage from './pages/ProductCatalogManagementPage'
import ProductCatalogBrowsingPage from './pages/ProductCatalogBrowsingPage'
import DriverManagementPage from './pages/DriverManagementPage'
import AuditLogPage from './pages/AuditLogPage'
import { UserContext } from './Helpers/UserContext'
import { useEffect, useState } from 'react'
import LoadingIcon from './Components/LoadingIcon'

Amplify.configure(awsconfig)

function App() {
  // get user data, store it in state (to be used in context/global state)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      const user = await Auth.currentAuthenticatedUser()
      let user_email = user.attributes.email

      // get user's data
      let GET_USERDATA_URL = `https://esqgp2f0t8.execute-api.us-east-1.amazonaws.com/dev/getuserdetails?Email_id=${user_email}`
      const response = await fetch(GET_USERDATA_URL)
      const data = await response.json()
      let profile_details = {
        Email_ID: data.Item.Email_id,
        FirstName: data.Item.FirstName,
        LastName: data.Item.LastName,
        UserBio: data.Item.UserBio,
        AccountType: data.Item.AccountType,
        SponsorEmailID: data.Item.SponsorEmailID,
        TotalPoints: data.Item.TotalPoints,
        ProfilePicture: data.Item.ProfilePicture,
      }
      setUser(profile_details)
    })().then(() => {
      setIsLoading(false)
    })
  }, [])

  if (!isLoading) {
    return (
      <div>
        <BrowserRouter>
          <UserContext.Provider value={{ user, setUser }}>
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/account-setup" component={AccountSetupPage} />
              <Route exact path="/application" component={ApplicationPage} />
              <Route
                exact
                path="/applicants"
                component={ApplicantManagementPage}
              />
              <Route
                exact
                path="/manage-catalog"
                component={ProductCatalogManagementPage}
              />
              <Route
                exact
                path="/browse-catalog"
                component={ProductCatalogBrowsingPage}
              />
              <Route exact path="/drivers" component={DriverManagementPage} />
              <Route exact path="/logs" component={AuditLogPage} />

              <Route component={PageNotFoundPage} />
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    )
  } else {
    return <LoadingIcon></LoadingIcon>
  }
}

// export default App
export default withAuthenticator(App, {
  usernameAttributes: 'email',
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
  },
})
