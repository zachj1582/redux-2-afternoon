import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Nav from './Nav';
import { requestUserData } from './../../ducks/userReducer';
import { requestBudgetData, addPurchase, removePurchase } from './../../ducks/budgetReducer';
import { connect } from 'react-redux';
import './Budget.css';


class Budget extends Component {
  componentDidMount() {
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    const { firstName, lastName } = this.props.user;
    const { purchases, budgetLimit } = this.props.budget;
    return (
      <Background>
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 budgetLimit={budgetLimit} purchases={purchases} />
              <Chart2 purchases={purchases} />
            </div>
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

export default connect(mapStateToProps, { requestUserData, requestBudgetData, addPurchase, removePurchase })(Budget);