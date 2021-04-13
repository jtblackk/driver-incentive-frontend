/* eslint-disable*/

import './App.css'
import Amplify from 'aws-amplify'
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
import OrganizationSetupPage from './pages/OrganizationSetupPage'
import OrganizationPage from './pages/OrganizationPage'
import OrderReviewPage from './pages/OrderReviewPage'
import UserManagementPage from './pages/UserManagementPage'
import SponsorshipManagementPage from './pages/SponsorshipManagementPage'
import SponsorInvoicePage from './pages/SponsorInvoicePage'

Amplify.configure(awsconfig)

function App() {
  // get user data, store it in state (to be used in context/global state)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [activeProfile, setActiveProfile] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    ;(async () => {
      let profile_details = await getUserDetails(user ? user.Username : null)
      setUser(profile_details)
    })().then(() => {
      setIsLoading(false)
    })
  }, [])

  if (!isLoading) {
    return (
      <div>
        <BrowserRouter>
          <UserContext.Provider
            value={{ user, setUser, activeProfile, setActiveProfile }}
          >
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
              <Route
                exact
                path="/organization-setup"
                component={OrganizationSetupPage}
              />
              <Route exact path="/organization" component={OrganizationPage} />
              <Route exact path="/orders" component={OrderReviewPage} />
              <Route
                exact
                path="/user-management"
                component={UserManagementPage}
              />
              <Route
                exact
                path="/sponsorship-management"
                component={SponsorshipManagementPage}
              />
              <Route
                exact
                path="/sponsor-invoice"
                component={SponsorInvoicePage}
              />

              <Route component={PageNotFoundPage} />
            </Switch>
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    )
  } else {
    return null
  }
}

// export default App
export default withAuthenticator(App, {
  usernameAttributes: 'email',
  signUpConfig: {
    hiddenDefaults: ['phone_number'],
  },
})
