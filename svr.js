import express from 'express';
import * as db from './productdetails.js';

const app = express();

app.use(express.static('client', { extensions: ['html'] }));

async function getTable(req, res) {
  res.json(await db.getProductsTable());
}

async function checkLoginDetails(req, res) {
  const { username, hash } = req.body;
  const result = await db.findLoginDetails(username, hash);
  res.json(result);
}
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/getProducts', asyncWrap(getTable));
app.post('/login', asyncWrap(checkLoginDetails));

app.listen(8080);
