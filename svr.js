import express from 'express';
import * as db from './productdetails.js';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static('client', { extensions: ['html'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true } ));
app.listen(port, () => console.log(`listening on port ${port}`));

async function getTable(req, res) {
  res.json(await db.getProductsTable());
}

async function checkLoginDetails(req, res) {
  const { username, password } = req.body;
  try {
    const result = await db.findStoredHash(username);
    const storedHash = result.user_passwordhash;
    const isPasswordMatching = await bcrypt.compare(password, storedHash);
    res.json(isPasswordMatching);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error'});
  }
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

app.get('/express_backend', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND CONNECTED TO REACT'});
})
app.get('/getProducts', asyncWrap(getTable));
app.post('/login', asyncWrap(checkLoginDetails));