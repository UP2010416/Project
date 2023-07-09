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
