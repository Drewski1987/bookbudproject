/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import {useState, useEffect} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"



function SingleBook ({token, setToken, book, setBook}) {
    const {id} = useParams()
    // const token = localStorage.getItem("token")
    const [reserved, setReserved] = useState([])
    
  

    useEffect(()=>{
        const getBook = async ()=>{
            const res = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`)
            const data = await res.json()
            console.log(res)
            setBook(data)
        }
        getBook();
        console.log(book)
    },[])

    const navigate = useNavigate
    navigate("/")
    
    const handleReserve = async () => {
        if (!token){
            alert("To reserve a book please sign in!")
        }
        try{
            const response = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", 
                {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: ` Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bookId: "bookId"
                    })
                }
            )
            const result = await response.json()
            setReserved(result)
            alert("Your book is reserved!") 

        }catch (error){
            console.log(error)
        }
        
    } 

    return(
        <div>
        {
            book && (
        <div id="singleBook" key={book.id}>

        <h1>{book.title}</h1>
        <p>Author: {book.author}</p>
        
        
        <p>Description:{book.description}</p>
        <img src={book?.coverimage} style={{height:"200px"}}/>
        <p>Availability:{book.available? "Available" : "Checked Out"}</p>
        <br />

        
        <button onClick={handleReserve}>Reserve</button>
        <br />
        <button onClick={() => navigate(`/books`)}>Back</button>
        <br/>
        <Link to="/">back to books library</Link>

        {token && (
                    <>
                        <button onClick={()=>handleReserve(book.id)}>Check out or Reserve this Book</button>
                    </>
                        )}

                        <button onClick={()=>navigate(`/books`)}>Go Back</button>
        </div> 
        )}

       
    
                    </div>
            )}
     
    
    


export default SingleBook