const budgetData = require('./budgetData');
let id = 4;
module.exports = {
  budgetData(req, res) {
    res.send(budgetData);
  },
  purchase(req, res) {
    const { business, price, category } = req.body;
    if (business && price && category) {
      id++;
      budgetData.purchases.push({
        id,
        business,
        price,
        category
      })
      setTimeout(() => res.send(budgetData.purchases.reverse()), 1500);
    } else {
      res.status(400).json(`Missing info: you send business: ${business}, price: ${price}, category: ${category}`);
    }
  },
  remove(req, res) {
    const { id } = req.params;
    budgetData.purchases = budgetData.purchases.filter(purchase => purchase.id !== parseInt(id))
    res.send(budgetData.purchases)
  }
}