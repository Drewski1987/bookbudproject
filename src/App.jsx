import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Navigations from './components/Navigations'
import Register from './components/Register'
import Login from './components/Login'
import Books from './components/Books'
import SingleBook from './components/SingleBook'
import Account from './components/Account'

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null)
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
      
      <Link to="/users/register">Register</Link>
      <br />
      <Link to="/users/login">Log In</Link>
      <br />
      {token? <Link to="/users/me">Account</Link>: null}

    </div>
    <h1><strong>Welcome to BookBuddy portal!</strong></h1>
    <p>You can reserve books when you register/sign in  into your account!</p>

    <div id='container'>
      
     <Routes>
      <Route path="/" element={<Books books={books} setBooks={setBooks} />} />
      <Route path="/books/:id" element={<SingleBook  book={book} setBook={setBook} books={books} setBooks={setBooks}/> } />
      <Route path="/users/register" element={<Register token={token} setToken={setToken} />}/>
      <Route path="/users/login" element={<Login token={token} setToken={setToken} />}/>
      <Route path='users/me' element={<Account/>} />
      <Route path="/Navigations" element={<Navigations />}/>
    </Routes>
      
    </div>
    </>
  )
}

export default App
