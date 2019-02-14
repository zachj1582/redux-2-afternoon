import React, { Component } from 'react';
import "./Budget.css"

class Nav extends Component {
  render() {
    const { firstName, lastName } = this.props;

    return (
      <div className="top">
        <div className="title">budgetty</div>
        <div className="user-info">
          {firstName} {lastName}
          <span>-</span>
          logout
              <img src="./peterquill.jpg" alt="" className='photo' />
        </div>
      </div>
    )
  }
}

export default Nav