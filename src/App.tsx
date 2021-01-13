import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'
import DashboardT from "./screens/Boards"
import Login from './screens/Login'
import Logout from './screens/Logout'
import NavBar from "./components/NavBar"
import TableCheckOut from "./screens/dashboard/TableCheckOut";
import Register from "./screens/Register";

function App() {
    return (
        <Router>
            <NavBar/>
            <Switch>
                <Route exact path="/dashboard/tables" component={DashboardT}/>
                <Route path="/dashboard/TableCheckOut">
                    <TableCheckOut/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/register">
                    <Register/>
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
