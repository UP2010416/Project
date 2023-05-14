import express from 'express';
import * as db from './database.js';

async function getTable(req, res){
    res.json(await db.)
}

const app = express();
app.use(express.static('client'));
app.listen(8080);

