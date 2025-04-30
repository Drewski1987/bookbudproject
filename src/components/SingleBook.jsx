/* TODO - add your code to create a functional React component that renders details for a single book. Fetch the book data from the provided API. You may consider conditionally rendering a 'Checkout' button for logged in users. */

import {useState, useEffect} from "react"
import { useParams, Link, useNavigate } from "react-router-dom"



function SingleBook ({}) {
    const {id} = useParams()
    const [book, setBook] = useState("")
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

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

    return(
        <>
        <div>

        <h1>{book.title}</h1>
        <p>Author: {book.author}</p>
        
        
        <p>Description:{book.description}</p>
        <img src={book?.coverimage} style={{height:"200px"}}/>
        <p>Availability:{book.available}</p>
        <Link to="/">back to books library</Link>
        </div>
        </>
    )
    
}

export default SingleBook