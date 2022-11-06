import React from "react";
import './scss/app.scss'
import {Header} from "./components/Header";
import Home from "./components/Pages/Home";
import {Route, Routes} from "react-router-dom";
import Errors from "./components/Pages/Errors";
import Cart from "./components/Pages/Cart";
import FullPizza from "./components/Pages/FullPizza";

function App() {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'cart'} element={<Cart/>}/>
                    <Route path={'pizza/:id'} element={<FullPizza/>}/>
                    <Route path={'*'} element={<Errors/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
