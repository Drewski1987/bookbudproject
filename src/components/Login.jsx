import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login ({setToken}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    async function handlelogin (event) {
        event.preventDefault()
        setError(null);
    
       

        try{
            const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const result = await response.json()
            
            localStorage.setItem("token", result.token)
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            setSuccessMessage("Welcome!")
            setToken(result.token)
            setEmail("");
            setPassword("");
            navigate("/")
            window.location.reload();
            

        }catch (error) {
            
        }
    }
            

    return(

        <>
        <form className="loginForm" onSubmit={handlelogin}>
        <label>
                Email 
                <input 
                name="email" 
                required
                onChange={(event)=> setEmail(event.target.value)} 
                value = {email}
                />
            </label>
            <br/>
            <label>
                Password 
                <input name="password" 
                required
                onChange={(event) => setPassword(event.target.value)}
                value = {password}
                />
            </label>
            {
                (password && password.length <= 6) && 
                <p><strong>Password must be longer than 6 characters.</strong></p>
            }
            <br/>
            <button onClick={handlelogin}>Log In</button>

           
        </form>
        {
            successMessage && <p>{successMessage}</p>
        }
       
        </>
    )
}

export default Login 