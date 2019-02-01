const creds = require('./credentials');
const { userData } = require('./data');
module.exports = {
  login(req, res) {
    const { username, password } = req.body;
    if (username === creds.username && password === creds.password) {
      res.status(200).send({ loggedIn: true, userData })
    } else {
      res.status(401).send({ loggedIn: false, userData: null })
    }
  },
  logout(req, res) {
    req.session.destroy();
    res.status(200).send({ loggedIn: false, userData: null })
  }
}