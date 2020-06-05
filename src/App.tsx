import React from 'react'
import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import Calculator from './apps/calculator'
import UserProfile from './apps/userprofile'
import Home from './Home'

function App() {
  return (
    <>
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/dailyui/calculator">Calculator</Link>
      <Link to="/dailyui/userprofile">User Profile</Link>


      <Switch>
        <Route path="/dailyui/calculator">
          <Calculator />
        </Route>
        <Route path="/dailyui/userprofile">
          <UserProfile />
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
