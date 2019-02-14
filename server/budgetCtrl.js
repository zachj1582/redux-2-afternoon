const budgetData = require('./budgetData');

module.exports = {
  budgetData(req, res) {
    res.send(budgetData);
  }
}