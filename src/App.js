import './App.css'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

import { BrowserRouter, Route, Switch } from 'react-router-dom'
//import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { withAuthenticator } from 'aws-amplify-react'

import IndexPage from './pages/IndexPage'
import SignupPage from './pages/SignupPage'
import AdminHomePage from './pages/AdminHomePage'
import SponsorHomePage from './pages/SponsorHomePage'
import DriverHomePage from './pages/DriverHomePage'
import PageNotFoundPage from './pages/PageNotFoundPage'
import AccountSetupPage from './pages/AccountSetupPage'
import ProfilePage from './pages/ProfilePage'

import '@aws-amplify/ui/dist/style.css'
Amplify.configure(awsconfig)

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/driver" component={DriverHomePage} />
          <Route exact path="/sponsor" component={SponsorHomePage} />
          <Route exact path="/admin" component={AdminHomePage} />
          <Route exact path="/account-setup" component={AccountSetupPage} />
          <Route component={PageNotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

// export default App
export default withAuthenticator(App)
