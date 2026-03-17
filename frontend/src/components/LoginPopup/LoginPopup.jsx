import React from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
function LoginPopup({ setshowLogin }) {
  const [currstate, setCurrstate] = useState("Login");
  return (
    <div className="login-popup" id="login-popup">
      <form action="" className="login-popup-container">
        <div className="login-popup-title">
          <h2>
           {currstate}
          </h2>
          <img
            src={assets.cross_icon}
            alt="Close"
            className="close-icon"
            onClick={() => setshowLogin(false)}
          />
        </div>
        <div className="login-popup-inputs">
          {currstate === "Login" ? <></>: <input type="text" placeholder="YourName" required /> }
            <input type="email" placeholder="your Email" required />
            <input type="password" placeholder="Password" required />
        </div>
        <button>{currstate === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the terms & conditions</p>
        </div>
        {currstate === "Login" ? 
        <p>Create a new account? <span onClick={() => setCurrstate("Sign Up")}>Click here</span></p>
         :  
        <p>Already have an account? <span onClick={() => setCurrstate("Login")}>Login in</span></p>
        }
      </form>
    </div>
  );
}

export default LoginPopup;
