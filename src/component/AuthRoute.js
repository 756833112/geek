import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import 'utils/storage';
import { hasToken } from 'utils/storage';

class AuthRoute extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) => {
          if (hasToken()) {
            return <Component {...props}></Component>;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location.pathname },
                }}
              ></Redirect>
            );
          }
        }}
      ></Route>
    );
  }
}

export default AuthRoute;
