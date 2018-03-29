import {
    REGISTRATION_FORM_CHANGED,
    REGISTER_NEW_USER,
    REGISTATION_SUCCESS,
    REGISTATION_FAILURE
  } from '../actions/types';

const INITIAL_STATE = {
    user: null,
    email: '',
    password: '',
    repeatPassword: '',
    registrationError: '',
    emailError: '',
    passwordError: '',
    repeatPasswordError: '',
    loading: false
  };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTRATION_FORM_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case REGISTER_NEW_USER:
            return { ...state,
                ...INITIAL_STATE,
                loading: true
            };
        case REGISTATION_SUCCESS:
            return { ...state,
                ...INITIAL_STATE,
                loading: false,
                user: action.payload
            };
        case REGISTATION_FAILURE:
            return {
                ...state,
                loading: false,
                registrationError: action.payload.registrationError,
                emailError: action.payload.emailError,
                passwordError: action.payload.passwordError,
                repeatPasswordError: action.payload.repeatPasswordError

            };
        default: return state;
    }
};
