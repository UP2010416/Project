import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { callBackendAPI } from './api/api.js';

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
          <ProductsTable/>
        </div>
      );
    }
  }

  export default Transactions;