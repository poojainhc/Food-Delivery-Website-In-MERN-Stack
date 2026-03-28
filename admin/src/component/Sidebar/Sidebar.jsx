import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div className="Sidebar-options">
        <NavLink to="/add"className="Sidebar-option">
          <img src={assets.add_icon_white} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to="/list" className="Sidebar-option">
          <img src={assets.bag_icon} alt="" />
          <p>List Item</p>
        </NavLink>
        <NavLink to="/order" className="Sidebar-option">
          <img src={assets.bag_icon} alt="" />
          <p>Oreder</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
