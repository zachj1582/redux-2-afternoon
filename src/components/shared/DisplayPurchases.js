import React, { Component } from 'react';

class DisplayPurchases extends Component {
  render() {
    return (
      <div className='display-purchases'>
        {
          this.props.purchases.map(purchase => {
            return (
              <div className="card mb-2" key={purchase.id}>
                <div className="card-body">
                  ${purchase.price} at {purchase.business} <strong>({purchase.category})</strong>
                  <button onClick={() => this.props.removePurchase(purchase.id)} className='btn btn-sm btn-danger' id='delete-btn'>X</button>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}

export default DisplayPurchases