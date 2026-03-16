import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

function Footer() {
  return (
    <div className='footer' id='footer'>
    <div className='footer-content'>
        <div className='footer-content-left'>
            <img src={assets.logo} alt="Logo" />
            
             <div className='footer-socials-icons'>
                <img src={assets.facebook_icon} alt="Facebook" />
                <img src={assets.twitter_icon} alt="Twitter" />
                <img src={assets.linkedin_icon} alt="LinkedIn" />

             </div>
        </div>

        <div className='footer-content-center'>
            <h3>Contact Us</h3>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>

        <div className='footer-content-right'>
            <h3>Get in Touch</h3>
            <ul>
                <li>+919552607565</li>
                <li>contact@foodorderapp.com</li>
            </ul>
        </div>
        
    </div>
    <hr/>
        <p className='footer-copyright'>Copyright © 2024 Food Order App. All rights reserved.</p>
    </div>

  )

}

export default Footer