import React from "react";
import "./navbar.css";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import { assets } from "../../assets/frontend_assets/assets";

const Navbar = ({ setshowLogin }  ) => {
  const [menu, setMenu] = useState("menu");
  const {getTotalCartAmount,token, setToken} = useContext(StoreContext);
 
 const navigate =useNavigate();

const logOut=()=>{
 localStorage.removeItem("token")
 setToken("");
 navigate("/")
}

  return (
    <div className="navbar">
     <Link to="/"><img src="/logo.png" alt="Logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu==="home" ? 'active' : ''}>Home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu==="menu" ? 'active' : ''}>Menu</a>
        <a href="#appdownload" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app" ? 'active' : ''}>Mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact")} className={menu==="contact" ? 'active' : ''}>Contact</a>
      </ul>

      <div className="navbar-right">
        <img src="/search_icon.png" alt="Search" className="navbar-search-icon" />
        <div className="navbar-basket-icon">
          <Link to="/cart">
            <img src="/basket_icon.png" alt="Basket" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>
       {!token?<button onClick={() => setshowLogin(true)} className="login-button">Sign In</button>:
       <div className="navbar-profile">
        <img src={assets.profile_icon} alt=""/>
        <ul className="navbar-profile-dropdown">
          <li onClick={()=>navigate('/myOrders')}><img src={assets.bag_icon} alt=""/><p>Orders</p></li>
          <hr />
          <li onClick={logOut}><img src={assets.logout_icon} alt=""/><p>LogOut</p></li>
        </ul>

       </div>
       }
        
      </div>
    </div>
  );
};

export default Navbar;
