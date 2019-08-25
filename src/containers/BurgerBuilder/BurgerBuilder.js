import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from './../../hoc/Ax/Ax';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import axios from './../../axios-orders';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  // constructor(props){
  //   super(props);
  //   this.state = {...};
  // }

  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // console.log(this.props);
    this.props.onInitIngredients();
    /*  axios
      .get("https://react-my-bruger-52303.firebaseio.com/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
        const totalPrice = Object.keys(this.state.ingredients).reduce(
          (sum, key) => {
            return (sum +=
              this.state.ingredients[key] > 0
                ? this.state.ingredients[key] * INGREDIENT_PRICES[key]
                : 0);
          },
          this.state.totalPrice
        );
        this.setState({
          totalPrice: totalPrice
        });
        this.updatePurchaseState(this.state.ingredients);
      })
      .catch(err => {
        this.setState({ error: true });
      }); */
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  updatePurchaseState() {
    const sum = Object.keys(this.props.ings).reduce((total, el) => {
      return total + this.props.ings[el];
    }, 0);

    return sum > 0;
  }

  /* addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };
 */
  /* removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }; */

  purchaseCancelHandler = () => {
    this.setState({
      purchasing: false,
      showEmp: false
    });
  };

  purchaseContinueHandler = () => {
    // alert("You Continue!");
    /* const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push(
      encodeURIComponent("price") +
        "=" +
        encodeURIComponent(this.state.totalPrice.toFixed(2))
    );
    const queryString = queryParams.join("&"); */
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.props.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientsAdded={this.props.onIngredientAdded}
            ingredientsRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState()}
            ordered={this.purchaseHandler}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
