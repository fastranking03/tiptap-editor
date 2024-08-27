import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FontSizeProvider } from './FontSizeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <FontSizeProvider>
        <App />
     </FontSizeProvider>

  </React.StrictMode>,
)
