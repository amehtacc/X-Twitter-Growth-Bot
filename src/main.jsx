// Import StrictMode for highlighting potential problems in React components
import { StrictMode } from 'react';

// Import createRoot for rendering the app in React 18+
import { createRoot } from 'react-dom/client';

// Import global styles
import './index.css';

// Import the main popup component (acts as the app's UI)
import Popup from './popup/Popup.jsx';

// Import ToastContainer to display toast notifications
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Required toast styles

// Mount the React application into the HTML element with id 'root'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Display toast notifications at the top center of the screen */}
    <ToastContainer position="top-center" />

    {/* Main popup component that drives the UI */}
    <Popup />
  </StrictMode>,
);
