import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';


function ProductsTable() {
  axios.defaults.withCredentials = true;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('login').then((response) => {
      console.log(response);
    });
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

  const link1 = '<a href="update">Update</a>';
  const link2 = '<a href="delete">Delete</a>';

  return (
    <div id="product-table">
      <header>
        <h1 className="title">Product Details</h1>
      </header>
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
          {data.map((item, index) => {
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

// async function getProductsTable() {
//   try {
//     const response = await fetch('getProducts');
//     const table = document.querySelector('.table');
//     let obj;
//     if (response.ok) {
//       obj = await response.json();
//       const link1 = '<a href="update">Update</a>';
//       const link2 = '<a href="delete">Delete</a>';
//       for (let i = 0; i < obj.length; i++) {
//         const record = Object.entries(obj[i]);
//         const newRow = table.insertRow(-1);
//         for (let j = 0; j < record.length; j++) {
//           const newCell = newRow.insertCell(j);
//           const newText = document.createTextNode(record[j][1]);
//           newCell.appendChild(newText);
//         }
//         const actionCell = newRow.insertCell(-1);
//         actionCell.innerHTML = link1 + ' ' + link2;
//       }

//       console.log(obj);
//       console.log(Object.entries(obj[0]));
//       console.log(obj[1]);
//     } else {
//       obj = [{ msg: 'failed to load table' }];
//       console.log(obj);
//     }
//   } catch (error) {
//     console.log('Error fetching data:', error);
//   }
// }

// function ProductsTable() {
//   return (
//     <div id="product-table">
//           <header>
//             <h1 className="title">Product Details</h1>
//           </header>
//           <table className="table">
//               <thead>
//                   <tr>
//                       <th>ID</th>
//                       <th>Name</th>
//                       <th>Colour</th>
//                       <th>Type</th>
//                       <th>Quantity</th>
//                       <th>Price</th>
//                       <th>Size</th>
//                       <th>Action</th>
//                   </tr>
//               </thead>
//           </table>
//       </div>
//   );
// }
