import React from "react";
import StartPage from "./pages/StartPage/StartPage";
import MainPage from "./pages/MainPage/MainPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import { Route, Routes } from "react-router-dom";
import "./App.css";


function App() {
//  let ak;
  return (
    <div className="App">
      <Routes> 
        <Route path="/" element={<StartPage />} /> 
  
        <Route path="/main" element={<MainPage />} />
        <Route path='/product' element={<ProductPage />} />
        <Route path="/orders" element={<OrderPage />} /> 

       </Routes>
    </div>
  );
}

export default App;
