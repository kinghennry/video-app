import React from 'react'
import "./index.css"
import VideoPlayer from "./components/VideoPlayer"
import Notifications from "./components/Notifications"
import Options from "./components/Options"
import Navbar from "./components/Navbar"
// GiMonkey
function App() {
  
  return (
    <>
        <Navbar/>
            <VideoPlayer />
            <Options>
              <Notifications/>
            </Options>
   </>   
  )
}

export default App
