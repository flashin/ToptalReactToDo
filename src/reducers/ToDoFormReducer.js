import {
    TO_DO_FORM_CHANGED,
    TO_DO_SAVE,
    TO_DO_SAVE_FAIL,
    TO_DO_CREATE_SUCCESS,
    TO_DO_EDIT_SUCCESS,
    TO_DO_DELETE,
    TO_DO_DELETE_FAIL,
    TO_DO_CLEAR,
    ADD_NEW_ENTRY,
    DELETE_ENTRY,
    IMAGE_UPLOAD_START,
    IMAGE_UPLOADED,
    IMAGE_UPLOAD_FAILED,
    IMAGE_DELETE,
    ADD_NEW_CONTACT,
    DELETE_CONTACT,
    ADD_NEW_CONTACT_FAIL,
    SHARE_ITEM_ERROR
  } from '../actions/types';

const INITIAL_STATE = {
    name: '',
    entries: [],
    images: [],
    contacts: [],
    newEntry: '',
    error: '',
    loading: false,
    uploadingImage: false
  };

export default (state = INITIAL_STATE, action) => {
    if (action.type === ADD_NEW_ENTRY) {
        if (!state.entries) {
            const entries = [action.payload];
            return { ...state, entries, newEntry: '' };
        } 
        
        state.entries.push(action.payload);
        return { ...state, newEntry: '' };
    }

    if (action.type === DELETE_ENTRY) {
        if (state.entries && state.entries.length > action.payload) {
            state.entries.splice(action.payload, 1);
            const entries = state.entries.slice();
            return { ...state, entries };
        }
        return { ...state };
    }

    if (action.type === IMAGE_UPLOADED) {
        if (!state.images) {
            const images = [action.payload];
            return { ...state, images, uploadingImage: false };
        }
        
        state.images.push(action.payload);
        return { ...state, uploadingImage: false };
    }

    if (action.type === IMAGE_DELETE) {
        if (state.images && state.images.length > action.payload) {
            state.images.splice(action.payload, 1);
            const images = state.images.slice();
            return { ...state, images };
        }
        return { ...state };
    }

    if (action.type === ADD_NEW_CONTACT) {
        if (!state.contacts) {
            const contacts = [action.payload];
            return { ...state, contacts };
        } 
        
        const contacts = state.contacts.slice();
        contacts.push(action.payload);
        return { ...state, contacts };
    }

    if (action.type === DELETE_CONTACT) {
        if (state.contacts && state.contacts.length > action.payload) {
            state.contacts.splice(action.payload, 1);
            const contacts = state.contacts.slice();
            return { ...state, contacts };
        }
        return { ...state };
    }

    switch (action.type) {
        case TO_DO_SAVE:
            return { ...state,
                loading: true
            };
        case TO_DO_DELETE:
            return { ...state,
                loading: true
            };
        case TO_DO_CREATE_SUCCESS:
            return { ...INITIAL_STATE,
                loading: false
            };
        case TO_DO_EDIT_SUCCESS:
            return { ...INITIAL_STATE,
                loading: false
            };
        case TO_DO_SAVE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case TO_DO_DELETE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case TO_DO_FORM_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case TO_DO_CLEAR:
            return { ...INITIAL_STATE };
        case IMAGE_UPLOAD_START:
            return { ...state, uploadingImage: true };
        case IMAGE_UPLOAD_FAILED:
            return { ...state, uploadingImage: false, error: action.payload };
        case ADD_NEW_CONTACT_FAIL:
            return { ...state, error: action.payload };
        case SHARE_ITEM_ERROR:
            return { ...state };
        default: return state;
    }
};
