import React from 'react'
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import Calculator from './apps/calculator'
import UserProfile from './apps/userprofile'
import Home from './Home'

function App() {
  return (
    <>
    <HashRouter>
      <div className="text-lg mx-auto my-8 text-center">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/calculator" className="mr-4">Calculator</Link>
        <Link to="/userprofile">User Profile</Link>

      </div>


      <Switch>
        <Route path="/calculator">
          <Calculator />
        </Route>
        <Route path="/userprofile">
          <UserProfile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </HashRouter>
    </>
  )
}

export default App
