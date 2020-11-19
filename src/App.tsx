import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'
import DashboardTables from "./screens/dashboard/DashboardTables";
function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/dashboard/tables" component={DashboardTables}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App
