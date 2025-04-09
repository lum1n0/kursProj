import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import AppRoutes from './routs/AppRoutes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes /> {/*  Use AppRoutes here */}
  </React.StrictMode>,
)

