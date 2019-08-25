import React, { Component } from "react";

import Modal from "./../../components/UI/Modal/Modal";
import Aux from "./../Ax/Ax";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        res => res,
        error => {
          /* console.log(
            "Global Error Handler. Propagating the error to respective API call."
          ); */
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
    }

    // To avoid memory leaks. As all the components that are wrapped with "withErrorHander" will have their own interceptors.
    // So when the component will be unmounted then eject the interceptors. Ex. Routing.
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
