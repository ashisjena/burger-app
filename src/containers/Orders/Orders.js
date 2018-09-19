import React, { Component } from "react";

import Order from "./../../components/Order/Order";
import axios from "./../../axios-orders";
import Spinner from "./../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: {},
    loading: true
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then(res => {
        /* const fetchedOrder = [];
        for (let key in res.data) {
          fetchedOrder.push({
            ...res.data[key],
            id: key
          });
        }
        console.log(fetchedOrder); */
        console.log(res.data);
        this.setState({ orders: res.data, loading: false });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  }

  render() {
    const orders = Object.entries(this.state.orders).map(entry => {
      const key = entry[0];
      const value = entry[1];
      return (
        <Order key={key} ingredients={value.ingredients} price={value.price} />
      );
    });

    return this.state.loading ? <Spinner /> : <div>{orders}</div>;
  }
}

export default Orders;
