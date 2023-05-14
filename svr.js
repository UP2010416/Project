import express from 'express';
import * as db from './database.js';

const app = express();

app.use(express.static('client', { extensions: ['htm;']}));

async function getTable(req, res){
    res.json(await db.getProductsTable);
}

function asyncWrap(f) {
    return (req, res, next) => {
        Promise.resolve(f(req,res,next))
        .catch((e) => next(e || new Error()));
    }
}

app.get('/getProductsTable', asyncWrap(getTable));

app.listen(8080);