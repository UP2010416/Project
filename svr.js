import express from 'express';
import * as db from './productdetails.js';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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
async function getTable(req, res) {
  res.json(await db.getProductsTable());
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
      req.session.user = result.user_username;
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

// async function wrapper for error handling
function asyncWrap(f) {
  return (req, res, next) => {
    Promise.resolve(f(req, res, next))
      .catch((e) => next(e || new Error()));
  };
}

// api routes
app.get('/express_backend', (req, res) => {
  res.send({ express: 'EXPRESS BACKEND CONNECTED TO REACT'});
})
app.get('/getProducts', asyncWrap(getTable));
app.post('/login', asyncWrap(checkLoginDetails));
app.get('/login', asyncWrap(checkLogin));