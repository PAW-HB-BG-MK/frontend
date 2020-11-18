import React from "react"
import {useState} from 'react'
import axios from "axios"
import {backendAddr} from "../constants/apiConstants"
import {useHistory} from "react-router-dom"

export default function Home() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    let history = useHistory()

    const loginChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.currentTarget.value)
    }
    const passwordChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }
    const submitHandler = (event: React.MouseEvent) => {
        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        axios.post(backendAddr + "auth/sign_in", {
            "auth": {
                "email": login,
                "password": password
            }
        }, config).then((res) => {
            if (res.status !== 201) {
                setLogin("")
                setPassword("")
                return
            }
            localStorage.setItem("jwt", res.data['jwt'])
            history.push("/tables")
        }).catch((err) => {
            // TODO: proper exception handling
            console.log(err)
        })
    }

    return (
        <form>
            <label>
                Login:
                <input type="text" value={login} onChange={loginChangeHandler}/>
            </label>
            <br/>
            <label>
                Password:
                <input type="password" value={password} onChange={passwordChangeHandler}/>
            </label>
            <button onClick={submitHandler} type="button">Log in</button>
        </form>
    )
}