import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthProvider.js';
import PrivateRoute from './PrivateRoute.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import LoginPage from './Login.js';
import Products from './Products.js';
import TopBar from './TopBar.js';
import Transactions from './Transactions.js';
import Forecasting from './Forecasting.js';

// App makes use of react-router routes to navigate between pages
// All Routes/Components wrapped with 'AuthProvider'
// Private Routes rendered depending on AuthContext, i.e. logged in or not, no unauthorised access
// AuthContext is defined in AuthProvider.js

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element = {<LoginPage />} />
          <Route path="/products" element = {<PrivateRoute><TopBar /><Products /></PrivateRoute>} />
          <Route path="*" element = {<p>Error 404: This doesn&apos;t exist!</p>} />
          <Route path="/transactions" element = {<PrivateRoute><TopBar /><Transactions /></PrivateRoute>} />
          <Route path="/forecasting" element = {<PrivateRoute><TopBar /><Forecasting /></PrivateRoute>} />
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
