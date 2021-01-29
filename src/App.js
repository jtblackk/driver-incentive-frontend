import './App.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Index from './pages/Index'
import Signup from './pages/Signup'
import PageNotFound from './pages/PageNotFound'
import TopAppBar from './Components/TopAppBar'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/signup" component={Signup} />
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
