import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { InputField, Button, ErrorText, Progress } from './custom';
import { registrationFormUpdate, registerNewUser } from '../actions';

class RegistrationForm extends Component {

  onRegisterPress() {
    const { email, password, repeatPassword } = this.props;

    this.props.registerNewUser({ email, password, repeatPassword });
  }

  renderRegisterButton() {
    if (this.props.loading) {
      return <Progress size="large" />;
    }

    return (
      <Button onPress={this.onRegisterPress.bind(this)}>
        Create New Account
      </Button>
    );
  }
  
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ paddingTop: 5, flex: 1 }}>
          <ErrorText>{ this.props.registrationError }</ErrorText>
          <InputField
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={value => this.props.registrationFormUpdate({ prop: 'email', value })}
          />
          <ErrorText>{ this.props.emailError }</ErrorText>
          <InputField
              placeholder="Enter your password"
              autoCapitalize="none"
              onChangeText={value => this.props.registrationFormUpdate({ prop: 'password', value })}
              secureTextEntry
          />
          <ErrorText>{ this.props.passwordError }</ErrorText>
          <InputField
              placeholder="Repeat your password"
              autoCapitalize="none"
              onChangeText={
                value => this.props.registrationFormUpdate({ prop: 'repeatPassword', value })
              }
              secureTextEntry
          />
          <ErrorText>{ this.props.repeatPasswordError }</ErrorText>
          { this.renderRegisterButton() }
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ registration }) => registration;

export default connect(mapStateToProps, { 
  registrationFormUpdate,
  registerNewUser 
})(RegistrationForm);
