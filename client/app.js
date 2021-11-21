import React from "react"
import ReactDOM from "react-dom"

import Main from "./components/Main";
import Overview from "./components/Overview";
import Delivery from "./components/Delivery";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.render(
    <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Main />}></Route>
                    <Route path="/overview" exact element={<Overview />}> </Route>
                    <Route path="/delivery" exact element={<Delivery />}></Route>
                </Routes>
            </BrowserRouter>  
        </div>,
    document.getElementById("root"))