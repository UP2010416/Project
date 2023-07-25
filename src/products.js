import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';
import { Pagination, Button } from 'react-bootstrap';
import { AddProductModal } from './AddProductModal.js';

function ProductsTable() {
  console.log('Rendering Products');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [modalShow, setModalShow] = useState(false);
  const [newProduct, setNewProduct] = useState({
    product_name: '',
    product_colour: '',
    product_type: '',
    product_price: '',
    product_size: '',
  });

  const handleInputChange = (event) => {
    let { name, value } = event.target;
    if (name === 'product_price') {
      const parsedValue = parseFloat(value);
      value = isNaN(parsedValue) ? '' : parsedValue.toFixed(2);
    }
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post('addNewProduct', newProduct);
      if (response.status === 200) {
        console.log('Product added');
        setModalShow(false);
        const response = await axios.get('getProducts');
        if (response.status === 200) {
          const obj = await response.data;
          setData(obj);
        } else {
          setData([{ msg: 'failed to load table' }]);
        }
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post('deleteProduct', { id });
      if (response.status === 200) {
        console.log('Product Deleted');
        const response = await axios.get('getProducts');
        if (response.status === 200) {
          const obj = await response.data;
          setData(obj);
        } else {
          setData([{ msg: 'failed to load table' }]);
        }
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

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

  return (
    <div id="product-table" className="table table-bordered table-striped">
      <AddProductModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleAddProduct={handleAddProduct}
        handleInputChange={handleInputChange}
      />
      <div className="table-header">
        <h2 className="table-heading">Products</h2>
        <Button variant = "primary" onClick = {() => setModalShow(true)}>Add Product</Button>
      </div>
      <table className="table">
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
                <td>£{parseFloat(item.product_price).toFixed(2)}</td>
                <td>{item.product_size}</td>
                <td>
                  <button onClick={() => handleDelete(item.product_id)}>Delete</button>
                </td>
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
