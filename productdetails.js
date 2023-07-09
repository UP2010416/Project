import config from './config.js';
import Postgres from 'pg';

const sql = new Postgres.Client(config);
sql.connect();

sql.on('error', (err) => {
  console.error('SQL Fail', err);
  sql.end();
})

export async function getProductsTable(){
    const db = await dbConn;
    return db.all('SELECT * FROM Products');
}

export async function listMessages() {
  const db = await dbConn;
  return db.all('SELECT * FROM Messages ORDER BY time DESC LIMIT 10');
}