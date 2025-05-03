import { useState } from "react"
import { useNavigate } from "react-router-dom";

/* TODO - add your code to create a functional React component that renders a registration form (sign Up)*/
function Register ({setToken}){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [successMessage, setSuccessMessage] = useState(null)
    const navigate = useNavigate();
   

    async function handleSubmit (event) {
        event.preventDefault();

        try{
            const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", 
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"} ,
                    body: JSON.stringify({
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        password: password
                    })
                }
            );
            const result = await response.json()
            console.log(result)
            setToken(result.token)
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            localStorage.setItem("token", result.token)
            setSuccessMessage("Your in")
            alert("User Created! Now please Sign-In")

            navigate("/users/login")
            window.location.reload();
         

        }catch (error){
            console.log(error)
            setError(error.response?.data?.message || "Please try again.");
        }
    }

    return (
        <>
        <div>{error && <p>{error}</p>}</div>

        <form onSubmit={handleSubmit}>
        
        <br/>
            <label>
                First Name: 
                <input
                name= "text"
                value = {firstName}
                onChange={(event)=> setFirstName(event.target.value)}
                
                />
            </label>
            <br />

            <label>
                Last Name: 
                <input
                name= "text"
                value = {lastName}
                onChange={(event)=> setLastName(event.target.value)}
                
                />
            </label>

            <br />

            <label>
                Email: 
                <input
                name= "email"
                required
                value = {email}
                onChange={(event)=> setEmail(event.target.value)}
                
                />
            </label>
            <br />

            <label>
           Create Password:
            <input
             name="password" 
             required
             value={password}
            onChange={(event)=> setPassword(event.target.value)}/>
        </label>

        {
                (password && password.length <= 6) && 
                <p><strong>Password must be longer than 6 characters.</strong></p>
            }
            <br/>
        <br />
        <button>Sign Up</button>
        
        </form>
        {
            successMessage && <p>{successMessage}</p>
        }
        
        </>
        
    )
}

export default Register