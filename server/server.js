require('dotenv').config();
const express = require('express');
const session = require('express-session');
const user = require('./userCtrl');
const budget = require('./budgetCtrl');

const { SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.post('/auth/login', user.login)
app.get('/auth/logout', user.logout)

app.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`)
})
