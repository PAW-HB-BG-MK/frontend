import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'
import DashboardT from "./screens/dashboard/DashboardT"
import Login from './screens/Login'
import Logout from './screens/Logout'
import NavBar from "./components/NavBar"
import AddTable from "./screens/dashboard/AddTable";
function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/dashboard/tables" component={DashboardT}/>
                <Route path="/dashboard/addtable">
                    <AddTable/>
                </Route>
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

        </Router>
    )
}

export default App
