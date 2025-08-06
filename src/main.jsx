import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
import { CarritoProvider } from './context/CarritoContext';
import { HashRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CarritoProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </CarritoProvider>
  </React.StrictMode>
);