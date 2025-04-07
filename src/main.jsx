import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Popup from './popup/Popup.jsx'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer position="top-center" />
    <Popup />
  </StrictMode>,
)
