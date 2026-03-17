import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup"; 
function App() {

  const [showLogin, setshowLogin] = useState(false);
  return (
    <>
    {showLogin ? <LoginPopup setshowLogin={setshowLogin}/> : <></>}

      <div className="App">
        <Navbar setshowLogin={setshowLogin} />
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer/>
      </div>
    </>
  );
}

export default App;
