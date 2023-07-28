/* eslint-disable react/prop-types */

// This is a Modal which allows a user to add products in Products.js
import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';


// 'mb-3' - bootstrap class which formats each form to have 1 rem of space below each Form.Group
// Modal takes several props passed down from a parent function/class
export function AddProductModal({ show, handleClose, handleAddProduct, handleInputChange }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="product_name" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Colour</Form.Label>
            <Form.Control type="text" name="product_colour" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control type="text" name="product_type" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" step="0.01" name="product_price" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Size</Form.Label>
            <Form.Control type="text" name="product_size" onChange={handleInputChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAddProduct}>
          Add Product
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddProductModal;
