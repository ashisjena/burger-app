import React, { Component } from "react";

import Aux from "./../../../hoc/Ax/Ax";
import Button from "./../../UI/Button/Button";

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to a class
  // Just for testing and using lifecycle hook method.
  componentWillUpdate() {
    // console.log("[OrderSummary] componentWillUpdate");
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(igKey => {
      return this.props.ingredients[igKey] > 0 ? (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
          {this.props.ingredients[igKey]}
        </li>
      ) : null;
    });

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
