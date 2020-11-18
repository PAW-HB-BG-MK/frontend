import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'
import Login from './screens/Login'

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <Login/>
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
