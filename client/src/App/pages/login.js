// src/Login.js

import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../components/login/loginForm';


export default withAuth(class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { authenticated: null };
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const authenticated = await this.props.auth.isAuthenticated();
    if (authenticated !== this.state.authenticated) {
      this.setState({ authenticated });
    }
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  onSuccess = res => {
    return this.props.auth.redirect({
      sessionToken: res.session.token
    });
  };

  onError = err => {
    console.log('error logging in', err);
  };
  
  render() {
    if (this.state.authenticated === null) return null;
    return this.state.authenticated ?
      <Redirect to={{ pathname: '/' }}/> :
      <LoginForm baseUrl={this.props.baseUrl} onSuccess={this.onSuccess}
      onError={this.onError} />;
  }
});














































/*import React, { Component } from "react";
import LoginForm from "../components/login/loginForm"

class Login extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default Login;*/