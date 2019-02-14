import React, { Component } from 'react';
import Background from './../Background/Background'
import Chart1 from './Chart1';
import Nav from './Nav';
import { requestUserData } from './../../ducks/userReducer';
import { requestBudgetData } from './../../ducks/budgetReducer';
import { connect } from 'react-redux';
import './Budget.css';


class Budget extends Component {
  componentDidMount() {
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    console.log(this.props)
    const { firstName, lastName } = this.props.user;
    return (
      <Background>
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className="purchases-container">
            <div className='add-purchase'>
              <div className="form-group">
                <label>Where did you buy?</label>
                <input type="text" className="form-control" placeholder="Name of business/location/place" />
                <label className='mt-3'>Category</label>
                <input type="text" className="form-control" placeholder="Select category" />
                <section>
                  <div className="input-group mb-3 mt-4">
                    <div className="input-group-prepend">
                      <span className="input-group-text">$</span>
                    </div>
                    <input type="text" className="form-control col-2" />
                    <div className="input-group-append">
                      <span className="input-group-text">.00</span>
                    </div>
                  </div>
                  <button className='btn btn-success btn-lg'>Add</button>
                </section>
              </div>
            </div>

            <div className='display-purchases'>
              {
                this.props.budget.purchases.map(purchase => {
                  return (
                    <div className="card mb-2" key={purchase.id}>
                      <div className="card-body">
                        ${purchase.price} at {purchase.business} <strong>({purchase.category})</strong>
                        <button className='btn btn-sm btn-danger' id='delete-btn'>X</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div className='chart-container'>
            <Chart1 />
          </div>
        </div>
      </Background>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    budget: state.budget
  }
}

export default connect(mapStateToProps, { requestUserData, requestBudgetData })(Budget);