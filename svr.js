import express from 'express';
import * as db from './productdetails.js';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { spawn } from 'child_process';

const app = express();
const port = process.env.PORT || 5000; // port 5000 (localhost:5000)
app.use(express.static('client', { extensions: ['html'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true } ));
app.listen(port, () => console.log(`listening on port ${port}`));

// cookie creation for storing login sessions, expiration of 1 day (24 hours)
app.use(cookieParser());
app.use(session({
  key: "userID",
  secret: "mysecret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60 * 60 * 24 * 1000,
  },
}));

// get products table from database
async function getProducts(req, res) {
  res.json(await db.getProductsTable());
}

async function getTransactions(req, res){
  res.json(await db.getTransactionsTable());
}

// checks plaintext password against hashed password and checks if username is valid
async function checkLoginDetails(req, res) {
  const { username, password } = req.body;
  try {
    const result = await db.findStoredHash(username);
    if (!result){
      res.json(false);
      return;
    }
    const storedHash = result.user_passwordhash;
    const isPasswordMatching = await bcrypt.compare(password, storedHash);
    if (isPasswordMatching){
      req.session.user = result.user_id;
      console.log(req.session.user);
    }
    res.json(isPasswordMatching);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error'});
  }
}

// checks if a user is currently logged in or not (using a cookie)
async function checkLogin(req, res){
  if (req.session.user){
    res.send({ loggedIn: true, user: req.session.user })
  } else {
    res.send({ loggedIn: false });
  }
}

async function destroySession(req, res){
  req.session.destroy(function(err) {
    if(err){
      console.log(err);
      res.status(500).send({ message: 'There was an error logging out, try again' });
    } else {
      res.status(200).send({ message: 'Successfully Logged Out' });
    }
  });
}

async function addNewProduct(req, res){
  const product = req.body;
  console.log(product);
  res.json(await db.addProduct(product));
}

async function addNewTransaction(req, res){
  const transaction = req.body;
  transaction.user_id = req.session.user
  console.log(transaction);
  res.json(await db.addTransaction(transaction));
}

async function deleteProduct(req, res){
  console.log(req.body.id);
  res.json(await db.deleteProduct(req.body.id));
}

async function runPython(req, res){
  const data = await db.prepareForecastData();
  console.log(data);
  let payload = '';
  const python = spawn('python', ['./prophet/forecastmodel.py']);

  python.stdin.write(JSON.stringify(data));
  python.stdin.end();

  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    payload += data.toString();
    console.log(payload);
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  })

  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    try {
        res.send(JSON.parse(payload));
    } catch (error) {
        console.error('Failed to parse JSON', error);
    }
  });
}

// async function wrapper for error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

// api routes
app.get('/getProducts', asyncWrap(getProducts));
app.get('/getTransactions', asyncWrap(getTransactions));
app.post('/login', asyncWrap(checkLoginDetails));
app.get('/login', asyncWrap(checkLogin));
app.post('/logout', asyncWrap(destroySession));
app.post('/addNewProduct', asyncWrap(addNewProduct));
app.post('/deleteProduct', asyncWrap(deleteProduct));
app.get('/createForecast', asyncWrap(runPython));
app.post('/addNewTransaction', asyncWrap(addNewTransaction));