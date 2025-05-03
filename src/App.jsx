import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Account from './components/Account'


function App() {
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({})

  useEffect(()=> {
    const storedToken = localStorage.getItem("token")
      if (storedToken) {
        setToken(storedToken);
      }
  }, [])

  return (
    <>
    

    <div className='navBar'>
      <Link to="/">Home/Book Catalog</Link>
      <br />
      
      {!token && <Link to="/users/register">Register</Link>}
      <br />
      {!token && <Link to="/users/login">Log In</Link>}
      <br />
      {token? <Link to="/users/me">Account</Link>: null}
      <h>Welcome to BookBuddy portal!</h>
    </div>
    
    <p1>You can reserve books when you register/sign in  into your account!</p1>

    <div id='container'>
      
     <Routes>
      <Route path="/" element={<Books books={books} setBooks={setBooks} />} />
      <Route path="/books/:id" element={<SingleBook token={token} setToken={setToken} book={book} setBook={setBook} books={books} setBooks={setBooks}/> } />
      <Route path="/users/register" element={<Register token={token} setToken={setToken} />}/>
      <Route path="/users/login" element={<Login token={token} setToken={setToken} />}/>
      <Route path="/users/me" element={<Account/>} />
     
    </Routes>
      
    </div>
    </>
  )
}

export default App
