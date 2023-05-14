import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbConn = init();

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

export async function getProductsTable(){
    const db = await dbConn;
    return db.all('SELECT * FROM Products')
}
