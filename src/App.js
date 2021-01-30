import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import IndexPage from './pages/IndexPage'
import SignupPage from './pages/SignupPage'
import AdminHomePage from './pages/AdminHomePage'
import SponsorHomePage from './pages/SponsorHomePage'
import DriverHomePage from './pages/DriverHomePage'
import PageNotFoundPage from './pages/PageNotFoundPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/driver" component={DriverHomePage} />
          <Route exact path="/sponsor" component={SponsorHomePage} />
          <Route exact path="/admin" component={AdminHomePage} />
          <Route component={PageNotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
