import React from 'react'
import './App.css'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"

import Home from './screens/Home'

export const backendAddr: string = 'http://127.0.0.1:3000/api/v1/ping'

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
