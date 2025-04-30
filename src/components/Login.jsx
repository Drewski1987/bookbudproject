/* TODO - add your code to create a functional React component that renders a login form */

import { useState, useEffect } from "react"
import {Routes, Route, Link} from "react-router-dom"
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Auth from "./Auth";



function Login (){
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const token = localStorage.getItem("token")
    const navigate = useNavigate;


    useEffect(()=>{
        async function getEmail () {
            event.preventDefault();

            try{
                console.log("Hello")
                const response = fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const res = (await response).json()
                console.log(res.email.password)
                setEmail(res.email)
                setPassword(res.password)

            }catch(error){
                console.log(error)
            }
        }
        if (token) {
            getEmail()
           
        }
    }, [token])

    function logOut () {
        localStorage.removeItem("token")
        navigate("/users/login")
    }

    if (!token) {
        return (
            <div>
               
                <br />
                <h1>Already Registered? Sign In Here!</h1>
                <Auth  />
            </div>
        )
    }

    return(



        <div>
            <p>You are Logged in! </p>
            <button onClick={logOut} >Log Out</button>
        </div>
    )
}

export default Login