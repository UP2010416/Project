// psql database CRUD operations/functions

import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
});

// gets all product data
export async function getProductsTable() {
  const q = 'SELECT * FROM Products;';
  const result = await sql.query(q);
  return result.rows;
}

// gets all transaction data
export async function getTransactionsTable() {
  const q = `
    SELECT InventoryTransaction.transaction_id, Products.product_name, InventoryTransaction.user_id, InventoryTransaction.transaction_date, InventoryTransaction.quantity_change, InventoryTransaction.transaction_type
    FROM InventoryTransaction
    INNER JOIN Products ON InventoryTransaction.product_id = Products.product_id
    ORDER BY transaction_date DESC
  `;
  const result = await sql.query(q);
  return result.rows;
}

// gets the data for one user and returns the data as an object
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

// adds a new product to the product table, id is SERIAL PRIMARY so id can be sent as a null value
export async function addProduct(product) {
  try {
    const q = 'INSERT INTO Products (product_name, product_colour, product_type, product_quantity, product_price, product_size) VALUES ($1, $2, $3, $4, $5, $6)';
    const result = await sql.query(q, [product.product_name, product.product_colour, product.product_type, 0, product.product_price, product.product_size]);
    return result;
  } catch (error) {
    console.error('Error adding new product: ', error);
  }
}

// adds a new transaction to the transaction table, id is SERIAL PRIMARY so id can be sent as a null value
export async function addTransaction(transaction) {
  try {
    const q = 'INSERT INTO InventoryTransaction (product_id, user_id, transaction_date, quantity_change, transaction_type) VALUES ($1, $2, $3, $4, $5)';
    const result = await sql.query(q, [transaction.product_id, transaction.user_id, transaction.transaction_date, transaction.quantity_change, transaction.transaction_type]);
    return result;
  } catch (error) {
    console.error('Error adding new transaction', error);
  }
}

// deletes a product dependent on id
export async function deleteProduct(id) {
  const q = 'DELETE FROM Products WHERE product_id = $1';
  const result = await sql.query(q, [id]);
  return result;
}

// gets the date and number of sales from each transaction with transaction_type 'Sale'
export async function prepareForecastData() {
  const q = `SELECT TO_CHAR(transaction_date, 'YYYY-MM-DD') AS date, ABS(quantity_change) as sales
             FROM InventoryTransaction
             WHERE transaction_type = 'Sale'
             ORDER BY date;`;
  const result = await sql.query(q);
  return result.rows;
}
