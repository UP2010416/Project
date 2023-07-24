import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider.js';
import PrivateRoute from './PrivateRoute.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LoginPage from './login.js';
import Products from './Products.js';
import TopBar from './TopBar.js';
import Transactions from './Transactions.js';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element = {<LoginPage />} />
          <Route path="/products" element = {<PrivateRoute><TopBar/><Products /></PrivateRoute>} />
          <Route path="*" element = {<p>Error 404: This doesn&apos;t exist!</p>} />
          <Route path="/transactions" element = {<PrivateRoute><TopBar/><Transactions /></PrivateRoute>} />
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
