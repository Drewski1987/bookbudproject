import { useState } from 'react'
import './App.css'
import Navigations from './components/Navigations'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [token, setToken] = useState(null)

  return (
    <div id='container'>
      <Register/>
      <Login/>
      
    </div>
  )
}

export default App
