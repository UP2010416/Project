import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';
import { Pagination } from 'react-bootstrap';

function ProductsTable() {
  console.log('Rendering Products');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('getProducts');
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

  const link1 = '<a href="update">Update</a>';
  const link2 = '<a href="delete">Delete</a>';

  return (
    <div id="product-table" className="table table-bordered table-striped">
      <table className="table">
        <caption>Products</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Colour</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Size</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.product_id}</td>
                <td>{item.product_name}</td>
                <td>{item.product_colour}</td>
                <td>{item.product_type}</td>
                <td>{item.product_quantity}</td>
                <td>{item.product_price}</td>
                <td>{item.product_size}</td>
                <td dangerouslySetInnerHTML={{ __html: link1 + ' ' + link2 }}></td>
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

class Products extends Component {
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
        <ProductsTable/>
      </div>
    );
  }
}

export default Products;
