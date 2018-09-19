import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import Spinner from "./../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "./../../../axios-orders";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    },
    phoneNumber: "",
    loading: false
  };

  orderHandler = event => {
    // Inside a form it reloads the page. So to prevent it.
    event.preventDefault();
    console.log(this.props.ingredients);
    this.setState({ loading: true });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Ashis Jena",
        address: {
          street: "Test Street 1",
          zipCode: "560087",
          country: "Germany"
        },
        email: "test@test.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false
        });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Postal Code"
        />
        <input
          className={classes.Input}
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
