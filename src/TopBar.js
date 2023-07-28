import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TopBar() {
  const navigate = useNavigate();

  // logout request sent to server, destroys user session and refreshes the page
  // With the AuthProvider implementation, this guarantees the user is redirected to the login page on logout
  async function handleLogout() {
    try {
      const response = await axios.post('/logout');
      if (response.status === 200) {
        window.location.reload();
      } else {
        console.error(response.status);
      }
    } catch (err) {
      console.error('Logout error', err);
    }
  }

  return (
    <div className = "navigation-bar">
        <h1 id="nav-bar-title">Stock Management App</h1>
        <Dropdown id = "custom-dropdown">
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
            Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
            <Dropdown.Item onClick = {() => navigate('/products')}>Products</Dropdown.Item>
            <Dropdown.Item onClick = {() => navigate('/transactions')}>Transactions</Dropdown.Item>
            <Dropdown.Item onClick = {() => navigate('/forecasting')}>Forecasting</Dropdown.Item>
            <Dropdown.Item onClick = { handleLogout }>Logout</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  );
}

export default TopBar;
