import React, { useContext } from "react";
import "./LoginPopup.css";
import { useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

function LoginPopup({ setshowLogin }) {
  const [currstate, setCurrstate] = useState("Login");

  const{url,setToken} = useContext(StoreContext)

  const [data, setData] = useState({
    name:"",
    email:"",
    password:""
  });

  const onChangeHandler =(event)=>{
    const name =event.target.name;
    const value =event.target.value
    setData (data=>({...data, [name]:value}))
  
  }

 const onLogin=async(event)=>{
  event.preventDefault()
  let newUrl =url;
  if (currstate==="Login") {
    newUrl +="/api/user/login"
  } else {
    newUrl +="/api/user/register"
  }

  const response = await axios.post(newUrl,data);
  if(response.data.success){
     setToken(response.data.token)
     localStorage.setItem("token", response.data.token);
     setshowLogin(false);
  }else{
    alert(response.data.message);
  }
 }

  return (
    <div className="login-popup" id="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
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
          {currstate === "Login" ? <></>: <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="YourName" required /> }
            <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="your Email" required />
            <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Password" required />
        </div>
        <button type="submit">{currstate === "Sign Up" ? "Create Account" : "Login"}</button>
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
