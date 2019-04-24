import React, { Component } from 'react';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

export class Login extends Component {
    handleClickButton = () => {
      this.props.firebase.login({ provider: 'google', type: 'popup' });
    }

    render() {
      const { auth } = this.props;

      return <div {...this.props}>
        <button onClick={this.handleClickButton}>
          Click me!
          {
            !isLoaded(auth)
            ? <span>Loading...</span>
            : isEmpty(auth)
              ? <span>Not Authed</span>
              : <pre>{JSON.stringify(auth, null, 2)}</pre>
          }
        </button>
      </div>;
    }
};

export const ConnectedLogin = compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login);

export default ConnectedLogin;
