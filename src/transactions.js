import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';
import { Pagination } from 'react-bootstrap';

function TransactionsTable() {
  console.log('Rendering Transactions');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentPageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div id="transactions-table" className="table table-bordered table-striped">
      <table className="table">
        <caption>Transactions</caption>
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
                <td>{item.product_id}</td>
                <td>{item.user_id}</td>
                <td>{formattedDate}</td>
                <td>{absoluteQuantityChange}</td>
                <td>{item.transaction_type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Pagination>
        {[...Array(totalPages).keys()].map(page =>
          <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => handleClick(page + 1)}>
            {page + 1}
          </Pagination.Item>,
        )}
      </Pagination>
    </div>
  );
}

class Transactions extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    try {
      const res = await callBackendAPI();
      this.setState({ data: res.express });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <div id="container">
          <TransactionsTable />
        </div>
    );
  }
}

export default Transactions;
