import React from 'react';
import ReactDOM from 'react-dom/client';
import Portfolio from './Portfolio.jsx';
import { Toaster } from 'sonner';
import './index.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Portfolio />
    <Toaster theme="dark" position="bottom-right" richColors />
  </React.StrictMode>
);
