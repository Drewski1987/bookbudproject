/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { Routes, Route, Link } from "react-router-dom"

const Navigations =({logout, token})=>{

    return(
        <nav >
          <div className="navigations">
            <Link to="/">Home</Link>

            <br />

            {token ? (
                <>
                <link to="/users/me" > Account</link>
                <button onClick={logout}>Logout</button>
                </>
            ):( 
                <>
                <Link to="/users/Login">Sign In</Link>    
                <Link to="/users/register"></Link>
                </>
            )}
                 
        </div>
        </nav>
    );
};

export default Navigations