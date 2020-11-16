import axios from "axios"
import logo from "../logo.svg"
import React from "react"
import {backendAddr} from "../App"

export default function Home() {
    const clickHandler = () => {
        axios.get(backendAddr).then(res => {
            let resultDiv = document.getElementById("result")
            if (resultDiv) {
                resultDiv.innerText += res.data['message']
            }
        })
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <button onClick={clickHandler}>Ping</button>
                <div id="result"/>
            </header>
        </div>
    )
}