import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from './../../components/Order/Order';
import axios from './../../axios-orders';
import Spinner from './../../components/UI/Spinner/Spinner';
import * as actions from './../../store/actions/index';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.authToken, this.props.userId);
  }

  render() {
    /* const orders = Object.entries(this.props.orders).map(entry => {
      const key = entry[0];
      const value = entry[1];
      return <Order key={key} ingredients={value.ingredients} price={value.price} />; */

    const orders = this.props.orders.map(order => {
      return <Order key={order.id} ingredients={order.ingredients} price={order.price} />;
    });

    return this.props.loading ? <Spinner /> : <div>{orders}</div>;
  }
}

const mpaStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    authToken: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (authToken, userId) => dispatch(actions.fetchOrders(authToken, userId))
  };
};

export default connect(
  mpaStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
