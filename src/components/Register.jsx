import { useState } from "react"

/* TODO - add your code to create a functional React component that renders a registration form */
function Register (){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState(null)
    console.log(successMessage)
    console.log(password)

    async function handleSubmit (event) {
        event.preventDefault();

        try{
            const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register", 
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"} ,
                    body: JSON.stringify({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password
                    })
                }
            );
            const result = await response.json()
            console.log(result)
            localStorage.setItem("token", result.token)
            setSuccessMessage("User Authenticated!")

        }catch (error){
            console.log(error)
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>
                First Name: 
                <input
                name= "firstName"
                value = {firstName}
                onChange={(event)=> setFirstName(event.target.value)}
                
                />
            </label>
            <br />

            <label>
                Last Name: 
                <input
                name= "lastName"
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

        </form>
        {
            successMessage && <p>{successMessage}</p>
        }
        </>
    )
}

export default Register