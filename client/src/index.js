import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {VideoProvider} from "./VideoContext"
ReactDOM.render(
  <React.StrictMode>
    <VideoProvider>
      <App/>
   </VideoProvider>
    </React.StrictMode>,
  document.getElementById('root')
)
