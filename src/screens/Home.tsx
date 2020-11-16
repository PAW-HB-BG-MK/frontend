import axios from "axios"
import logo from "../logo.svg"
import React from "react"
import {backendAddr} from "../App"
import {useState} from 'react'

export default function Home() {
    const [result, setResult] = useState("")
    const clickHandler = () => {
        axios.get(backendAddr).then(res => {
            setResult(res.data['message'])
        })
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