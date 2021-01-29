import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import IndexPage from './pages/IndexPage'
import SignupPage from './pages/SignupPage'
import PageNotFoundPage from './pages/PageNotFoundPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route component={PageNotFoundPage} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
