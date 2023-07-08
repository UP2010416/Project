import express from 'express';
import * as db from './productdetails.js';

const app = express();

app.use(express.static('client', { extensions: ['html']}));

async function getTable(req, res){
    res.json(await db.getProductsTable());
}

function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}
app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
app.get('/getProducts', asyncWrap(getTable));

app.listen(8080);