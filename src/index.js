import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider.js';
import PrivateRoute from './PrivateRoute.js';
import './index.css';
import LoginPage from './login.js';
import Products from './products.js';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element = {<LoginPage />} />
          <Route path="/products" element = {<PrivateRoute><Products /></PrivateRoute>} />
          <Route path="*" element = {<p>Error 404: This doesn&apos;t exist!</p>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
