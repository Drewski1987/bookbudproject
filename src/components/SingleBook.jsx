/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import {useState, useEffect} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"



function SingleBook ({token, setToken, book, setBook}) {
    const {id} = useParams()
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
    
    const handleReserve = async (bookId) => {
        if (!book.available){
            alert("This book has been checked out!");
            return;
        }
        try{
            const res = await fetch("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations", 
                {
                    method: "Post",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: ` Bearer ${token}`
                    },
                    body: JSON.stringify({
                        bookId
                    })
                }
            )
            if (book.available){
                alert ("Book successfully checked out! Enjoy!");
                return;
            }
            const checkedOut = JSON.parse(localStorage.getItem("checkedOutBooks"));
            const updated = [...checkedOut, {id: book.id, title: book.title, author: book.author}];
            localStorage.setItem("checkedOutBooks", JSON.stringify(updated));

            setBook ({...book, available: false})

            
        }catch (error){
            console.error(error)
            alert("Reservation is not available at this time!")
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
        
        {token && (
                    <>
                        <button onClick={()=>handleReserve(book.id)}>Reserve this Book</button>
                    </>
                        )}
                         
                        
        </div> 
        )}

       
        <Link to="/">back to books Catalog</Link>
        </div>
                    
        )}
     
    
    


export default SingleBook