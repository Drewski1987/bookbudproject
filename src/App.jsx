import { useState } from 'react'
import Navigations from './components/Navigations'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  const [token, setToken] = useState(null)

  return (
    <div id='container'>
      <Register token= {token} setToken={setToken}/>
      <Navigations />
      {/* <Login token= {token} setToken={setToken} /> */}
      
    </div>
  )
}

export default App
