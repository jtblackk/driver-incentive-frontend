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
import getUserDetails from './Helpers/CommonFunctions'
import ViewSponsorsPage from './pages/ViewSponsorsPage'

Amplify.configure(awsconfig)

function App() {
  // get user data, store it in state (to be used in context/global state)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      let profile_details = await getUserDetails()
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
              <Route exact path="/sponsors" component={ViewSponsorsPage} />
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
