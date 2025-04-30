import { Routes, Route, } from "react-router-dom"
import Home from "./Home"
import Login from "./Login"





function MainArea (){


    return(
        <div id="mainArea">
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/Login" element={<Login />}/>
                



            </Routes>
        
        </div>
    )
}

export default MainArea