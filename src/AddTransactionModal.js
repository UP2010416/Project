/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

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
