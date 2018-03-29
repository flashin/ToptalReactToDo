import {
    TO_DO_LIST_FETCH_SUCCESS,
    TO_DO_LIST_FILTER
  } from '../actions/types';

const INITIAL_STATE = {
    list: [],
    keyword: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TO_DO_LIST_FETCH_SUCCESS:
            return { ...state, list: action.payload };
        case TO_DO_LIST_FILTER:
            return { ...state, keyword: action.payload };
        default: return state;
    }
};
