/* TODO - add your code to create a functional React component that renders account details for a logged in user. Fetch the account data from the provided API. You may consider conditionally rendering a message for other users that prompts them to log in or create an account.  */
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Account (){
    const email = localStorage.getItem("email");
    const password = localStorage.getItem("password");
    const token = localStorage.getItem("token");
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        if (!token) {
            navigate("/login")

        } else {

        const fetchUserInfo = async () => {
            try {
                const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await res.json();
                setUserInfo(data);

            } catch (err) {
                
            }
        };
        fetchUserInfo();
    }
    }, [token, navigate]);

    const handleReturn = async (bookId) => {
        try {
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const updatedUserInfo = { ...userInfo };
            updatedUserInfo.reservations = updatedUserInfo.reservations.filter((book) => book.id !== bookId);
            setUserInfo(updatedUserInfo);

        } catch (err) {
            
            alert("Cannot return this book!!!");
        }

    };

  const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            localStorage.removeItem("password");

            navigate("/");

            window.location.reload();
        };

    return (
        <div>
            <h1> Account Profile Page! </h1>
            <h2>Your Account Details:</h2>
            <h4>Email: {email}</h4>
            <h4>Password: {password}</h4>

            {userInfo && (
                <>
            <h2>Books you reserved:</h2>
        <div>
            {userInfo.reservations?.map(book => (
        <div key={book.id}>
            <h3>{book.title}</h3>
            <h3>{book.author}</h3>
            <img style={{ height: "400px" }} src={book.coverimage} alt={book.title} />
            <br />
            <button onClick={() => handleReturn(book.id)}>Return this Book</button>
            <br />
            <br />
        </div>
             )
         )
    }
        </div>
                </>
            )}

        <button onClick={handleLogout}>Logout</button>

        </div>
    );
}

export default Account