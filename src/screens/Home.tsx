import axios from "axios"
import logo from "../logo.svg"
import React from "react"
import {backendAddr} from "../constants/apiConstants"
import {useState} from 'react'

export default function Home() {
    const [result, setResult] = useState("")
    const clickHandler = () => {
        axios.get(backendAddr + "/api/v1/ping").then(res => {
            setResult(res.data['message'])
        })
    }
    if (localStorage.getItem("jwt")) {
        console.log('hi');
    }
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <button onClick={clickHandler}>Ping</button>
                <div id="result">{result}</div>
            </header>
        </div>
    )
}