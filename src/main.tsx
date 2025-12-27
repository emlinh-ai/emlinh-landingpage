import React from 'react'
import ReactDOM from 'react-dom/client'
import AppCinematic from './App-Cinematic.tsx'
import './index.css'
import './i18n'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppCinematic />
  </React.StrictMode>,
)
