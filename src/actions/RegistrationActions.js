import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { isEmailValid } from '../helper';
import {
  REGISTRATION_FORM_CHANGED,
  REGISTER_NEW_USER,
  REGISTATION_SUCCESS,
  REGISTATION_FAILURE
} from './types';

export function registrationFormUpdate({ prop, value }) {
  return {
    type: REGISTRATION_FORM_CHANGED,
    payload: { prop, value }
    };
}

export function registerNewUser({ email, password, repeatPassword }) {
  return (dispatch) => {
    // validate form
    let isValid = true;
    let emailError = '';
    let passwordError = '';
    let repeatPasswordError = '';
    if (!isEmailValid(email)) {
      emailError = 'Please, enter valid email address';
      isValid = false;
    }
    if (password.length < 6) {
      passwordError = 'Password should contain at least 6 symbols';
      isValid = false;
    } else if (password !== repeatPassword) {
      repeatPasswordError = 'Passwords do not match';
      isValid = false;
    }

    if (!isValid) {
      dispatch({ type: REGISTATION_FAILURE,
        payload: {
          registrationError: '',
          emailError,
          passwordError,
          repeatPasswordError
        }
      });
      return;
    }

    dispatch({ type: REGISTER_NEW_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            dispatch({
              type: REGISTATION_SUCCESS,
              payload: user
            });
          
            Actions.content();
          })
          .catch(() => {
            dispatch({ type: REGISTATION_FAILURE,
              payload: {
                registrationError: 'Email already exists',
                emailError: '',
                passwordError: '',
                repeatPasswordError: ''
              }
            });
          });
  };
}
