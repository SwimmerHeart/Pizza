import React from "react";
import './scss/app.scss'
import {Header} from "./components/Header";
import Home from "./components/Pages/Home";
import {Route, Routes} from "react-router-dom";
import Errors from "./components/Pages/Errors";
import Cart from "./components/Pages/Cart";
import {useState} from "react";


export const SearchContext = React.createContext()

function App() {
   const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
            <SearchContext.Provider value={{searchValue, setSearchValue}}>
            <Header />
            <div className="content">
                <Routes>
                        <Route path={'/'} element={<Home />}/>
                        <Route path={'cart'} element={<Cart />}/>
                        <Route path={'*'} element={<Errors />}/>
                </Routes>
            </div>
                </SearchContext.Provider>
        </div>
    );
}

export default App;
