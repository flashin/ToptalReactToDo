import {
    LOGIN_FORM_CHANGED,
    LOGIN_USER,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_USER,
    LOGOUT_COMPLETED
  } from '../actions/types';

const INITIAL_STATE = {
    user: null,
    email: '',
    password: '',
    error: '',
    loading: false
  };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_FORM_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case LOGIN_USER:
            return { ...state,
                loading: true
            };
        case LOGIN_SUCCESS:
            return { ...state,
                ...INITIAL_STATE,
                loading: false,
                user: action.payload
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case LOGOUT_USER:
            return { ...state,
                ...INITIAL_STATE,
                loading: true
            };
        case LOGOUT_COMPLETED:
            return { ...INITIAL_STATE };
        default: return state;
    }
};
