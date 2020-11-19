import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'
import DashboardT from "./screens/dashboard/DashboardT";
import Login from './screens/Login'
import Logout from './screens/Logout'

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/dashboard/tables" component={DashboardT}/>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/logout">
                        <Logout/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
