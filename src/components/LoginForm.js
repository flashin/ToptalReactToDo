import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { InputField, Button, Progress, ErrorText } from './custom';
import { loginFormUpdate, loginUser, logoutUser } from '../actions';

class LoginForm extends Component {

  componentWillMount() {
    if (this.props.user) {
      this.props.logoutUser();
      console.log('logout');
    }
  }

  onRegisterPress() {
    Actions.registration();
  }

  onLoginPress() {
    const { email, password } = this.props;

    console.log(email);
    console.log(password);
    this.props.loginUser({ email, password });
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Progress size="large" />;
    }

    return (
      <Button onPress={this.onLoginPress.bind(this)}>
        Login
      </Button>
    );
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 5, flex: 1 }}>
          <ErrorText>{ this.props.error }</ErrorText>
          <InputField
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={value => this.props.loginFormUpdate({ prop: 'email', value })}
          />
          <InputField
              placeholder="Enter your password"
              autoCapitalize="none"
              onChangeText={value => this.props.loginFormUpdate({ prop: 'password', value })}
              secureTextEntry
          />
          { this.renderLoginButton() }
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', padding: 10 }}>
          <TouchableOpacity
              style={{ flex: 1, alignItems: 'center' }}
              onPress={this.onRegisterPress.bind(this)}
          >
            <Text style={{ fontSize: 16 }}>Create new account</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => auth;

export default connect(mapStateToProps, { loginFormUpdate, loginUser, logoutUser })(LoginForm);
