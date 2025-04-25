/* TODO - add your code to create a functional React component that renders a login form */

import { useState, useEffect } from "react"
import Register from "./Register";
import { useNavigate } from "react-router-dom";

function Login (){
    const [username, setUsername] = useState("")
    const token = localStorage.getItem("token")
    const navigate = useNavigate;


    useEffect(()=>{
        async function getUsername () {
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
                console.log(res)
                setUsername(res.username)

            }catch(error){
                console.log(error)
            }
        }
        if (token) {
            getUsername()
        }
    }, [token])

    function logOut () {
        localStorage.removeItem("token")
        navigate("/Login")
    }

    if (!token) {
        return (
            <div>
                <h1>Sign Up to Reserve Books From The Library</h1>
                
                <br />
                <h1>Already Registered? Sign In Here!</h1>
                <Register />
            </div>
        )
    }

    return(
        <div>
            <p>Logged in as {username}</p>
            <button onClick={logOut} >Log Out</button>
        </div>
    )
}

export default Login