import config from './config.js';
import Postgres from 'pg';
import bcrypt from 'bcrypt';

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

export async function findLoginDetails(username, hash) {
  try {
    const q = 'SELECT * FROM UserData WHERE user_username = $1;';
    const user = await sql.query(q, [username]);
    if (!user) {
      return false;
    }

    const storedHash = user.user_passwordhash;
    const isPasswordMatching = await bcrypt.compare(hash, storedHash);
    return isPasswordMatching;
  } catch (error) {
    console.error('Error checking login credentials: ', error);
    return false;
  }
}
