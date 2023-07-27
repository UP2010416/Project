/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

// Similar to the AddProductModal, this lets a user add a new transaction in Transactions.js
// 'mb-3' - bootstrap class which formats each form to have 1 rem of space below each Form.Group
// Like AddProductModal, this modal also takes several props including a list of products
export function AddTransactionModal({ show, handleClose, handleAddTransaction, handleInputChange, products }) {
  const transactionTypes = ['Sale', 'Refund', 'Restock'];
  console.log(products);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Product</Form.Label>
            <Form.Control as="select" name="product_id" onChange={handleInputChange}>
                {products.map((product) =>
                    <option key={product.product_id} value={product.product_id}>{product.product_name}</option>,
                )}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Quantity Change</Form.Label>
            <Form.Control type="number" name="quantity_change" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Control as="select" name="transaction_type" onChange={handleInputChange}>
              {transactionTypes.map((type) =>
                <option key={type} value={type}>{type}</option>,
              )}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddTransaction}>
          Add Transaction
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTransactionModal;
