import React from 'react'
import Navbar from './component/Navbar/Navbar'
import Sidebar from './component/Sidebar/Sidebar'
import List from './pages/List/List'
import Order from './pages/Order/Order'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import { ToastContainer, toast } from 'react-toastify';



const App = () => {

  const url = "https://food-delivery-website-in-mern-stack-production.up.railway.app"


  return (
    <div>
      <ToastContainer />
      <Navbar/>
      <hr />
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path ="/add" element={<Add url={url}/>}/>
          <Route path ="/list" element={<List url={url}/>}/>
          <Route path ="/order" element={<Order url={url}/>}/>
        </Routes>
        
      </div>
    </div>
  )
}

export default App