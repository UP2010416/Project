import React, { Component } from 'react';

async function getProductsTable() {
  try {
    const response = await fetch('getProducts');
    const table = document.querySelector('.table');
    let obj;
    if (response.ok) {
      obj = await response.json();
      const link1 = '<a href="update">Update</a>';
      const link2 = '<a href="delete">Delete</a>';
      for (let i = 0; i < obj.length; i++) {
        const record = Object.entries(obj[i]);
        const newRow = table.insertRow(-1);
        for (let j = 0; j < record.length; j++) {
          const newCell = newRow.insertCell(j);
          const newText = document.createTextNode(record[j][1]);
          newCell.appendChild(newText);
        }
        const actionCell = newRow.insertCell(-1);
        actionCell.innerHTML = link1 + ' ' + link2;
      }

      console.log(obj);
      console.log(Object.entries(obj[0]));
      console.log(obj[1]);
    } else {
      obj = [{ msg: 'failed to load table' }];
      console.log(obj);
    }
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

class App extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    try {
      const res = await this.callBackendAPI();
      this.setState({ data: res.express });
    } catch (error) {
      console.log(error);
    }
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  render() {
    return (
      <div id="container">
        <header>
            <h1 className="title">Product Details</h1>
        </header>
        <div id="product-table">
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
            </table>
        </div>
      </div>
    );
  }
}

getProductsTable();

export default App;
