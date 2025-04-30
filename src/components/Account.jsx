/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */

function Account (){
    const [error, setError]= useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [responseUsername, setResponseUsername] = useState("")

    async function handleClick (event){
        event.preventDefault()
        try{
            const response = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            const result = await response.json()
            console.log(result)
            setSuccessMessage(result.message)
            setResponseUsername(result.data.username.username)

        }catch (error) {
            setError(error.message)
        }
    }


    return(
<>
            <h2><strong>Authenticate</strong></h2>
            {successMessage && 
                <div>
                    <p>{successMessage}</p>
                    <p>Username: {responseUsername}</p>
                </div>
            }
            {error && <p>{error}</p>}
            <button className="button" onClick={handleClick}>Authenticate Token</button>
        </>
    )
}

export default Account