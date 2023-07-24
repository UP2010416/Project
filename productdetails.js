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
