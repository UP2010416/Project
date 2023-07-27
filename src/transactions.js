import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination, Button } from 'react-bootstrap';
import { AddTransactionModal } from './AddTransactionModal.js';

// This component is similar to Products.js

function Transactions() {
  console.log('Rendering Transactions');

  // states
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([]);

  // transaction types for the AddTransactionModal
  const [newTransaction, setNewTransaction] = useState({
    quantity_change: '',
    transaction_type: 'Sale',
    product_id: 1,
  });

  // handles input changes on the AddTransactionModal
  const handleInputChange = (event) => {
    setNewTransaction({
      ...newTransaction,
      [event.target.name]: event.target.value,
    });
  };

  // when new transactions are added, request is sent to the server and the transaction is created in the database
  const handleAddTransaction = async () => {
    console.log(newTransaction);
    const transactionDate = {
      ...newTransaction,
      transaction_date: new Date().toISOString(),
    };
    try {
      const response = await axios.post('addNewTransaction', transactionDate);
      if (response.status === 200) {
        console.log('Transaction added');
        setModalShow(false);
        const response = await axios.get('getTransactions');
        if (response.status === 200) {
          const obj = await response.data;
          setData(obj);
        } else {
          setData([{ msg: 'failed to load table ' }]);
        }
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  // on page load, transactions and products are fetched
  // products are fetched so that they can be passed into the addTransactionModal
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('getTransactions');
        if (response.status === 200) {
          const obj = await response.data;
          setData(obj);
        } else {
          setData([{ msg: 'failed to load table' }]);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('getProducts');
        if (response.status === 200) {
          setProducts(response.data);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchTransactions();
    fetchProducts();
  }, []);

  // Pagination logic, rounds up length of data divided by 10 to get total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentPageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // number of transactions for one page

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div id="transactions-table" className="table table-bordered table-striped">
      <AddTransactionModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleAddTransaction={handleAddTransaction}
        handleInputChange={handleInputChange}
        products={products}
      />
      <div className="table-header">
        <h2 className="table-heading">Transactions</h2>
        <Button variant = "primary" onClick = {() => setModalShow(true)}>Add Transaction</Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>User</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => {
            const date = new Date(item.transaction_date);
            const formattedDate = date.toLocaleDateString();
            const absoluteQuantityChange = Math.abs(item.quantity_change);
            return (
              <tr key={index}>
                <td>{item.transaction_id}</td>
                <td>{item.product_name}</td>
                <td>{item.user_id}</td>
                <td>{formattedDate}</td>
                <td>{absoluteQuantityChange}</td>
                <td>{item.transaction_type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination className = "pagination">
        {[...Array(totalPages).keys()].map(page =>
          <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => handleClick(page + 1)}>
            {page + 1}
          </Pagination.Item>,
        )}
      </Pagination>
    </div>
  );
}

export default Transactions;
