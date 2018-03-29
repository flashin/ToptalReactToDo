import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { isEmailValid } from '../helper';
import {
  LOGIN_FORM_CHANGED,
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
  LOGOUT_COMPLETED
} from './types';

export function loginFormUpdate({ prop, value }) {
  return {
    type: LOGIN_FORM_CHANGED,
    payload: { prop, value }
    };
}

export function loginUser({ email, password }) {
  return (dispatch) => {
    // validate form
    let isValid = true;
    let error = '';
    if (!isEmailValid(email) || password.length < 1) {
      error = 'Please, enter valid email address and password';
      isValid = false;
    }

    if (!isValid) {
      dispatch({ type: LOGIN_FAILURE,
        payload: {
          error
        }
      });
      return;
    }

    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            dispatch({
              type: LOGIN_SUCCESS,
              payload: user
            });
          
            Actions.content();
          })
          .catch(() => {
            dispatch({ type: LOGIN_FAILURE,
              payload: {
                error: 'Incorrect email or password'
              }
            });
          });
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });

    firebase.auth().signOut()
          .then(() => {
            dispatch({
              type: LOGOUT_COMPLETED
            });
          })
          .catch(() => {
            dispatch({
              type: LOGOUT_COMPLETED
            });
          });
  };
}
