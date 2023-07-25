// psql database CRUD operations

import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

export async function getProductsTable() {
  const q = 'SELECT * FROM Products;';
  const result = await sql.query(q);
  return result.rows;
}

export async function getTransactionsTable(){
  const q = `
    SELECT InventoryTransaction.transaction_id, Products.product_name, InventoryTransaction.user_id, InventoryTransaction.transaction_date, InventoryTransaction.quantity_change, InventoryTransaction.transaction_type
    FROM InventoryTransaction
    INNER JOIN Products ON InventoryTransaction.product_id = Products.product_id
    ORDER BY transaction_date DESC
  `;
  const result = await sql.query(q);
  return result.rows;
}

export async function findStoredHash(username) {
  try {
    const q = 'SELECT * FROM UserData WHERE user_username = $1;';
    const result = await sql.query(q, [username]);
    if (!result) {
      return false;
    }
    return result.rows[0];
  } catch (error) {
    console.error('Error checking login credentials: ', error);
    return false;
  }
}

export async function addProduct(product){
  try {
    const q = 'INSERT INTO Products (product_name, product_colour, product_type, product_quantity, product_price, product_size) VALUES ($1, $2, $3, $4, $5, $6)';
    const result = await sql.query(q, [product.product_name, product.product_colour, product.product_type, 0, product.product_price, product.product_size]);
    return result;
  } catch (error) {
    console.error('Error adding new product: ', error);
  }

}

export async function deleteProduct(id){
  const q = 'DELETE FROM Products WHERE product_id = $1'
  const result = await sql.query(q, [id])
  return result;
}