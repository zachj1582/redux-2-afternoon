<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250" align="right">

# Project Summary

In this project, we'll be adding redux to a budget app. Instead of just using redux alone, we'll use `react-redux`, `redux-promise-middleware`, and `combineReducers`.

## Step 1

## Summary

In this step, we'll get the project set up.

## Instructions

* Fork and clone this repo.
* Run `npm install`. If you look at the package.json file, you'll notice that `redux`, `react-redux`, and `redux-promise-middleware` are listed as dependecies and will get installed.
* Create a `.env` file in the root of the project with a `SERVER_PORT` of `4000` and a `SESSION_SECRET` of any value you want.
* Run `nodemon`.
* Run `npm start` in a separate terminal instance.

In the browser, you should see a log in page for the project.

* Log in using the email **`peterquill@gmail.com`**. The password is **`starlord`**.

When you get to the `my-budget` route, you'll see a loading animation. This loading animation will not go away until we set up redux.

## Step 2

### Summary

In this step, we'll set up a redux store and add in some middleware so that we can have asychronous code in our action creators.

### Instructions

* In the `src` folder, add a folder and name it `ducks`.
* Add a file in the ducks folder and name it `budgetReducer.js`

In budgetReducer.js:
* Create an `initialState` variable. Initial state for the store:

  ```
  {
    purchases: [],
    budgetLimit: null,
    loading: false
  }
  ```
* Create a function that have `state` and `action` parameters. Return state.
* `initialState` should be the default value for the state parameter.
* `export default` the reducer function.

Now we'll create the store.

* In `src`, create a file named `store.js`
* import `createStore`, `combineReducers` and `applyMiddleware` from redux
* import redux-promise-middleware as `promiseMiddleware`
* import the reducer from `budgetReducer.js`
* Create a variable called `rootReducer`. It's value will be the result of calling `combineReducers`.

  ```
  const rootReducer = combineReducers({
    budget: budgetReducer
  })
  ```
* export the created store using `createStore`. This first arg to createStore should be `rootReducer`. The second arg is `applyMiddleware(promiseMiddlware)`


Now we can go connect the redux part of our app to the react part.

In index.js
* Import `Provider` from 'react-redux'.
* Import the `store` from './store.js'
* Wrap the app component in the `Provider` component.
* Give the `Provider` component a `store` prop. The value of the store prop should be the imported store.

You should not see any errors in your app at this point.

### Solution

<details>
<summary> <code> budgetReducer.js </code> </summary>

```
const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
}

export default function reducer(state = initialState, action) {
  return state;
}
```
</details>

<details>
<summary> <code> store.js </code> </summary>

```
import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './ducks/budgetReducer';

const rootReducer = combineReducers({
  budget: budgetReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
```
</details>

<details>
<summary> <code>index.js </code> </summary>

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

```
</details>

## Step 3

### Summary

In this step, we'll make the loading animation dependent on the redux store's `loading` property.

### Instructions

In Budget.js:
* Import connect from react-redux;
* Connect the Budget component.
* In the mapStateToProps function, return an object with a budget property and value of the budget slice of state from the redux store.

All redux store state values managed by the `budgetReducer` are now on `this.props`, including the `loading` property in the redux store.

* Towards the top of the jsx, locate the ternary that is conditionally rendering the loading animation. Update this code to use the `loading` property from `this.props`.

<details>
<summary> <code>Budget.js </code> </summary>

```
import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'


class Budget extends Component {

  render() {
    const { loading } = this.props.budget;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase />
              <DisplayPurchases />
            </div>
            <div className='chart-container'>
              <Chart1 />
              <Chart2 />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget
  }
}

export default connect(mapStateToProps)(Budget);

```
</details>

## Step 4

### Summary

In this step, we'll create a second reducer to manage the logged in user's data.

### Instructions

* Create a new file named `userReducer.js` in the `ducks` folder

In userReducer.js:
* initialState: `{ email: null, firstName: null, lastName: null }`
* `export default` the reducer function. This function will take in `state` and `action` a paramenters. `initialState` will be the default value for state parameter.
* Return `state` in reducer function.

In store.js:

* Import the user reducer function.
* Add it to the combine reducer object with a property of `user`

### Solution

<details>
<summary> <code>userReducer.js </code> </summary>

```
const initialState = {
  email: null,
  firstName: null,
  lastName: null
};

export default function reducer(state = initialState, action) {
  return state;
}
```
</details>
<details>
<summary> <code>store.js </code> </summary>

```
import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './ducks/budgetReducer';
import userReducer from './ducks/userReducer';

const rootReducer = combineReducers({
  budget: budgetReducer,
  user: userReducer
})

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
```
</details>

## Step 5

### Summary

In this step, we'll go get the logged in user's data from the server, store that info in the redux store, and display the user's first and last name in the nav bar.

### Instructions

In userReducer.js:
* Import axios from 'axios'
* Create an action type named REQUEST_USER_DATA
* Create an action creator function (named `requestUserData`) that makes an http request for user data;
  * Method: GET
  * URL: '/auth/user-data'
* The action that is returned from the action creator should have `type` and `payload` properties. The payload should be the response from the http request
  * Make sure you return `res.data` from the callback passed to `.then()`
    ```
    export const requestUserData = () => {
    let data = axios.get('/auth/user-data').then(res => res.data)
      return {
        type: REQUEST_USER_DATA,
        payload: data
      }
    }
    ```

* Update the reducer function the have a `switch` statement testing for the value of `action.type`.
* When the request is fulfilled, return a new state object with email, firstName, and lastName properties. 

__NOTE__: You should get used to using the network tab in your chrome dev tools to check what the response looks like from an http request. But if you need help, you can also check below for what the reponse looks like.

<details>
<summary>Response object from HTTP request</summary>

```
Response Object:

{
  ...,
  data: {
    user: {
      email: 'someEmail',
      firstName: 'name',
      lastName: 'name'
    }
  }
}

```
</details>

In Budget.js:
* In `mapStateToProps`, make sure you are getting the user data from the redux store onto the props object
  
  ```
  function mapStateToProps(state) {
    return {
      budget: state.budget,
      user: state.user
    }
  }
  ```
* Import the action creator (`requestUserData`) from userReducer.js.
* The second arg to the connect method is an object that you can put any needed action creators in. Remember, you will want to invoke the version of `requestUserData` that is now on `this.props`.
* Invoke `requestUserData` in the `componentDidMount` method

After the `this.props.requestUserData` runs in the `componentDidMount` method, the http request should be sent for the user data. When the user data comes back, the redux store gets updated, which will trigger a re-rending of the `Budget` component. The difference? We will now have values for `email`, `firstName`, and `lastName` on the props object.

* The Nav component is expecting a firstName and lastName prop. Pass the appropriate data as props. You should now see the logged in user's name next to the picture in the corner.

### Solution

<details>
<summary><code> userReducer.js </code> </summary>

```
import axios from 'axios';

const initialState = {
  email: null,
  firstName: null,
  lastName: null
};

const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

export const requestUserData = () => {
  let data = axios.get('/auth/user-data').then(res => res.data)
  return {
    type: REQUEST_USER_DATA,
    payload: data
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER_DATA + '_FULFILLED':
      const { email, firstName, lastName } = action.payload.user
      return { email, firstName, lastName };
    default:
      return state;
  }
}

```
</details>

<details>
<summary><code>Budget.js</code></summary>

```
import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'
import { requestUserData } from './../../ducks/userReducer'


class Budget extends Component {
  componentDidMount() {
    this.props.requestUserData()
  }

  render() {
    const { loading } = this.props.budget;
    const { firstName, lastName } = this.props.user;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase />
              <DisplayPurchases />
            </div>
            <div className='chart-container'>
              <Chart1 />
              <Chart2 />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUserData })(Budget);

```
</details>

## Step 6

### Summary

In this step, we'll get the budgetData from the server to be displayed.

### Instructions

In budgetReducer.js:

* Create action type called `REQUEST_BUDGET_DATA`
* Create an action creator named `requestBudgetData` that will make an http request for budget data.
  * Method: `GET`
  * URL: `/api/budget-data`
  * Return action object from `requestBudgetData` with `type` and `payload` properties.
* Update the switch statement
  * When http request is pending, `loading` should be true
  * When http request is fulfilled, update redux store state and change `loading` back to false.

In Budget.js:

* Import `requestBudgetData` from budgetReducer.js
* Add `requestBudgetData` to the second arg in the connect method.
* Invoke `this.props.requestBudgetData` in the componentDidMount method.

The budget data from the http request is now in the redux store, and because of mapStateToProps, is also on the this.props object. 

* `this.props.budget.purchases` needs to be passed to the `DisplayPurchases`, `Chart1`, and `Chart2` components. The name of the prop needs to be `purchases`.
* `budgetLimit` from the props object needs to be passed to `Chart1` on a prop called `budgetLimit`.

You should now see some dummy data appearing as well as the charts reacting to that data.

### Solution

<details>
<summary> <code>budgetReducer.js </code> </summary>

```
import axios from 'axios';

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
};

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';

export const requestBudgetData = () => {
  let data = axios.get('/api/budget-data').then(res => res.data)
  return {
    type: REQUEST_BUDGET_DATA,
    payload: data
  }
}

export default function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BUDGET_DATA + '_PENDING':
      return { ...state, loading: true }
    case REQUEST_BUDGET_DATA + '_FULFILLED':
      return { ...state, ...action.payload, loading: false }
    default:
      return state;
  }
}

```
</details>
<details><summary><code>Budget.js </code> </summary>

```
import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'
import { requestUserData } from './../../ducks/userReducer'
import { requestBudgetData } from './../../ducks/budgetReducer'


class Budget extends Component {
  componentDidMount() {
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    const { loading, purchases, budgetLimit } = this.props.budget;
    const { firstName, lastName } = this.props.user;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase />
              <DisplayPurchases purchases={purchases} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUserData, requestBudgetData })(Budget);

```
</details>


## Step 7

### Summary

In this step, we'll create two more action creators so that we can add and remove purchases from our budget app.

### Instructions

In budgetReducer.js:

* Create an action creator named `addPurchase` that will make an http request to add a new purchase.
* Create action type for `addPurchase`.
  * Parameters of `addPurchase` (in order):
    * `price`
    * `description`
    * `category`
  * Method: POST
  * URL: '/api/budget-data/purchase'
  * Body of request
    ```
    { description: 'value', price: 'value', category: 'value' }
    ```
* addPurchase should return action object.

Update the switch statement: 
* When request is pending, `loading` should be set to `true`
* When requst is fulfilled, update state properly and change `loading` back to `false`.

Now for the last action creator.

* Create an action creator named `removePurchase` that will make an http request to remove a purchase.
* Create action type for `removePurchase`.
  * `removePurchase` will have an `id` parameter
  * Method: DELETE
  * URL: '/api/budget-data/purchase/:id'
* removePurchase should return action object.

Update the switch statement: 
* When request is pending, `loading` should be set to `true`
* When requst is fulfilled, update state properly and change `loading` back to `false`.


In Budget.js:
* Import both action creators you just made and add them to the action creator object (2nd arg in connect method).
* Pass `this.props.addPurchase` to the `AddPurchase` component on a prop called `addPurchase`.

When the `Add` button is clicked, the AddPurchase component will invoke this.props.addPurchase and pass in the price, description, and category as arguments. Take a look at the AddPurchase component if you want (line 27).

* Pass `this.props.removePurchase` to the DisplayPurchases component on a props called `removePurchase`.

Go ahead and try adding and removing purchases. You should see the charts react as data is added and removed.

### Solution

<details>
<summary> <code>budgetReducer.js </code> </summary>

```

import axios from 'axios';

const initialState = {
  purchases: [],
  budgetLimit: null,
  loading: false
};

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA';
const ADD_PURCHASE = 'ADD_PURCHASE';
const REMOVE_PURCHASE = 'REMOVE_PURCHASE'

export const requestBudgetData = () => {
  let data = axios.get('/api/budget-data').then(res => res.data)
  return {
    type: REQUEST_BUDGET_DATA,
    payload: data
  }
}

export const addPurchase = (price, description, category) => {
  let data = axios.post('/api/budget-data/purchase', {
    description,
    price,
    category
  }).then(res => res.data);
  return {
    type: ADD_PURCHASE,
    payload: data
  }
}

export const removePurchase = (id) => {
  let data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data);
  return {
    type: REMOVE_PURCHASE,
    payload: data
  }
}

export default function budgetReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BUDGET_DATA + '_PENDING':
      return { ...state, loading: true }
    case REQUEST_BUDGET_DATA + '_FULFILLED':
      return { ...state, ...action.payload, loading: false }
    case ADD_PURCHASE + '_PENDING':
      return { ...state, loading: true }
    case ADD_PURCHASE + '_FULFILLED':
      return { ...state, purchases: action.payload, loading: false }
    case REMOVE_PURCHASE + '_PENDING':
      return { ...state, loading: true };
    case REMOVE_PURCHASE + '_FULFILLED':
      return { ...state, loading: false, purchases: action.payload }
    default:
      return state;
  }
}
```
</details>

<details>
<summary> <code>Budget.js </code> </summary>

```

import React, { Component } from 'react';
import Background from './../shared/Background/Background'
import Chart1 from './../shared/Chart1';
import Chart2 from './../shared/Chart2';
import AddPurchase from './../shared/AddPurchase';
import DisplayPurchases from './../shared/DisplayPurchases';
import Loading from './../shared/Loading/Loading';
import Nav from './../shared/Nav';
import './Budget.css';
import { connect } from 'react-redux'
import { requestUserData } from './../../ducks/userReducer'
import { requestBudgetData, addPurchase, removePurchase } from './../../ducks/budgetReducer'


class Budget extends Component {
  componentDidMount() {
    this.props.requestUserData();
    this.props.requestBudgetData();
  }

  render() {
    const { loading, purchases, budgetLimit } = this.props.budget;
    const { firstName, lastName } = this.props.user;
    return (
      <Background>
        {loading ? <Loading /> : null}
        <div className='budget-container'>
          <Nav firstName={firstName} lastName={lastName} />
          <div className='content-container'>
            <div className="purchases-container">
              <AddPurchase addPurchase={this.props.addPurchase} />
              <DisplayPurchases purchases={purchases} removePurchase={this.props.removePurchase} />
            </div>
            <div className='chart-container'>
              <Chart1 purchases={purchases} budgetLimit={budgetLimit} />
              <Chart2 purchases={purchases} />
            </div>
          </div>
        </div>
      </Background>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget,
    user: state.user
  }
}

export default connect(mapStateToProps, { requestUserData, requestBudgetData, addPurchase, removePurchase })(Budget);

```
</details>


## Resources

<details>

<summary> <code> React with Redux </code> </summary>

* [React Redux Docs](https://react-redux.js.org/introduction/quick-start)
* [Redux - Usage With React](https://redux.js.org/basics/usage-with-react)

</details>

<details>

<summary> <code> Redux Middleware </code> </summary>

* [Understanding Redux Middlewares](https://redux.js.org/advanced/middleware)
* [Apply Middleware](https://redux.js.org/api/applymiddleware)
* [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware/blob/master/docs/introduction.md)

</details>

<details>

<summary> <code> Combine Reducers </code> </summary>

* [Combine Reducers](https://redux.js.org/api/combinereducers)

</details>

## Contributions

If you see a problem or a typo, please fork, make the necessary changes, and create a pull request so we can review your changes and merge them into the master repo and branch.

## Copyright

© DevMountain LLC, 2017. Unauthorized use and/or duplication of this material without express and written permission from DevMountain, LLC is strictly prohibited. Excerpts and links may be used, provided that full and clear credit is given to DevMountain with appropriate and specific direction to the original content.

<p align="center">
<img src="https://s3.amazonaws.com/devmountain/readme-logo.png" width="250">
</p>
