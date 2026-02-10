import { NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src="/src/assets/frontend_assets/logo.png" alt="Logo" className="logo" />

      <ul className="nav-links">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/menu">Menu</NavLink></li>
        <li><NavLink to="/orders">Orders</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
      </ul>

      <div className="navbar-right">
        <img src="/src/assets/frontend_assets/search_icon.png" alt="Search" className="navbar-search-icon" />
        <div className="navbar-basket-icon">
          <img src="/src/assets/frontend_assets/basket_icon.png" alt="Basket"  />
          <div className="dot"></div>
        </div>
      
        <button className="login-button">Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
