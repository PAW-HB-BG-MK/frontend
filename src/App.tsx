import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'
import DashboardT from "./screens/dashboard/DashboardT";
function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/dashboard/tables" component={DashboardT}/>
                </Switch>
            </div>
        </Router>
    )
}

export default App
