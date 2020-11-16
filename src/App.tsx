import React from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const backendAddr = 'http://127.0.0.1:3000/api/v1/ping'

function onClick() {
    axios.get(backendAddr).then(res => {
        console.log(res)
        let resultDiv = document.getElementById("result")
        if (resultDiv) {
            resultDiv.innerText += res.data['message']
        }
    })
}

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

function Home() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <button onClick={onClick}>Ping</button>
                <div id="result"/>
            </header>
        </div>
    )
}

export default App
