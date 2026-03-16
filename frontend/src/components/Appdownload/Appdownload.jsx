import React from 'react'
import './Appdownload.css'
import { assets } from '../../assets/frontend_assets/assets'

function Appdownload() {
  return (
    <div className='appdownload' id='appdownload'>
      <p>For the best experience, download our app<br /></p>
      <div className='app-download-platform'>
        <img src={assets.play_store} alt="Play Store" />
        <img src={assets.app_store} alt="App Store" />
      </div>
    </div>
  )
}

export default Appdownload