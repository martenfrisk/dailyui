import React from 'react'
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Calculator from './apps/calculator'
import Home from './Home'

function App() {
  return (
    <>
    
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/calculator">Calculator</Link>


      <Switch>
        <Route path="/calculator">
          <Calculator />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
    </>
  )
}

export default App
