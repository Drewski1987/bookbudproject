/* TODO - add your code to create a functional React component that displays all of the available books in the library's catalog. Fetch the book data from the provided API. Users should be able to click on an individual book to navigate to the SingleBook component and view its details. */

import { useNavigate, Link } from "react-router-dom"
import {useEffect, useState} from "react"






function Books ({books, setBooks}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])

    useEffect(()=>{
        const getBooks = async () => {
            const res = await fetch ("https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books")
            const data = await res.json()

           setBooks(data) 
        }
           getBooks();
    },[])

        const navigate = useNavigate
        const handleClick = (book) => {
            navigate(`/books/${book.id}`);
        };

        const handleSearch = (event) => {
            const SearchTerm = event.target.value
            setSearchTerm(SearchTerm);

        const filteredResults = books.filter(item => 
            Object.values(item).some(value => 
                typeof value === "string" && value.toLowerCase().includes(SearchTerm.toLowerCase())
            )
        );
            setSearchResults(filteredResults);
    };
        const handleClear = () => {
            setSearchTerm("")
            setSearchResults([])
        }

        return (
            <>
            <div>
                <h1><strong>Welcome BookBuddy</strong></h1>
                <p><strong>Book Catalog</strong></p>
            <div>
                <input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
                />
            <button onClick={handleClear}>Clear</button> 

            </div>
            <div>
            <ul>
                {searchResults.map(item => (
            <li key={item.id}>{}
                {Object.entries(item).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
            ))}
          </li>
         ))}
        </ul>
            </div>

            </div>
            {
                books.map((book)=>
                <div key= {book.id}>
                <h2>{book.title}</h2>
                <img src={book?.coverimage} style={{height:"200px"}}/>
                <div>
                    <button onClick={()=> handleClick(book)}>Details</button>
                    <Link to="/books/:id">Details</Link>
                </div>
                </div>
                )
            }
            </>
        )
        }

        export default Books