import React, { Component } from 'react';

class AddPurchase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: 'other',
      business: '',
      price: ''
    }
  }

  backup() {
    alert('Missing prop "addPurchase" in Chart2 component')
  }

  add() {
    let { price, category, business } = this.state;
    let { addPurchase } = this.props;
    let num = parseInt(price);
    if (!Number.isNaN(num) && typeof num === 'number') {
      if (num && category && business) {
        if (!addPurchase) return this.backup();
        this.setState({
          category: 'other',
          business: '',
          price: ''
        })
      } else alert('missing some info')
    } else alert('Fix the input for price.')
  }

  render() {
    const { price, category, business } = this.state;
    return (
      <div className='add-purchase'>
        <div className="form-group">
          <label>Where did you buy?</label>
          <input
            value={business}
            onChange={(e) => this.setState({ business: e.target.value })}
            type="text"
            className="form-control"
            placeholder="Name of business/location/place" />
          <label className='mt-3'>Category</label>
          <select
            value={category}
            className="custom-select"
            onChange={(e) => this.setState({ category: e.target.value })}>
            <option defaultValue value="other">Other</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="gas">Gas</option>
          </select>
          <section>
            <div className="input-group mb-3 mt-4">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                value={price}
                type="number"
                className="form-control col-2"
                onChange={(e) => this.setState({ price: e.target.value })} />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
            <button
              className='btn btn-success btn-lg'
              onClick={() => this.add()}>Add</button>
          </section>
        </div>
      </div>
    )
  }
}

export default AddPurchase