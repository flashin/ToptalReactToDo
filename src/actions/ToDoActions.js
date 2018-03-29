import firebase from 'firebase';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import Share from 'react-native-share';
import ContactsWrapper from 'react-native-contacts-wrapper';
import {
  TO_DO_FORM_CHANGED,
  TO_DO_SAVE,
  TO_DO_SAVE_FAIL,
  TO_DO_CREATE_SUCCESS,
  TO_DO_EDIT_SUCCESS,
  TO_DO_LIST_FETCH_SUCCESS,
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
  SHARE_ITEM_ERROR,
  TO_DO_DELETE_FAIL,
  TO_DO_DELETE,
  TO_DO_LIST_FILTER
} from './types';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
global.window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
global.window.Blob = Blob;

export function toDoFormUpdate({ prop, value }) {
  return {
    type: TO_DO_FORM_CHANGED,
    payload: { prop, value }
    };
}

export function toDoCreate({ name, entries, images, contacts }) {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    if (name.length === 0) {
      dispatch({ type: TO_DO_SAVE_FAIL,
        payload: { error: 'Name should not be empty' } });
      return;
    }

    dispatch({ type: TO_DO_SAVE });

    firebase.database().ref(`/users/${currentUser.uid}/toDoList`)
      .push({ name, entries, images, contacts })
      .then(() => {
        dispatch({ type: TO_DO_CREATE_SUCCESS });
        Actions.content({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: TO_DO_SAVE_FAIL,
                  payload: { error: 'Unknown Error Occured. Please, try again later' } });
      });
  };
}

export function toDoEdit({ name, entries, images, contacts, uid }) {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    if (name.length === 0) {
      dispatch({ type: TO_DO_SAVE_FAIL,
        payload: { error: 'Name should not be empty' } });
      return;
    }

    dispatch({ type: TO_DO_SAVE });

    firebase.database().ref(`/users/${currentUser.uid}/toDoList/${uid}`)
      .set({ name, entries, images, contacts })
      .then(() => {
        dispatch({ type: TO_DO_EDIT_SUCCESS });
        Actions.content({ type: 'reset' });
      })
      .catch(() => {
        dispatch({ type: TO_DO_SAVE_FAIL,
                  payload: { error: 'Unknown Error Occured. Please, try again later' } });
      });
  };
}

export function toDoDelete({ uid }) {
  return (dispatch) => {
    dispatch({ type: TO_DO_DELETE });

    const { currentUser } = firebase.auth();
    firebase.database().ref(`/users/${currentUser.uid}/toDoList/${uid}`)
        .remove()
        .then(() => {
          dispatch({ type: TO_DO_CLEAR });
          Actions.content();
        })
        .catch(() => {
          dispatch({ type: TO_DO_DELETE_FAIL,
                    payload: { error: 'Unknown Error Occured. Please, try again later' } });
        });
  };
}

export const toDoListFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/toDoList`)
      .on('value', snapshot => {
        dispatch({ type: TO_DO_LIST_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export function filterToDoList(keyword) {
  return {
    type: TO_DO_LIST_FILTER,
    payload: keyword
  };
}

export function toDoClear() {
  return {
    type: TO_DO_CLEAR
    };
}

export function addNewEntry(name) {
  return {
    type: ADD_NEW_ENTRY,
    payload: name
    };
}

export function deleteEntry(index) {
  return {
    type: DELETE_ENTRY,
    payload: index
    };
}

export function chooseImage() {
  return (dispatch) => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        dispatch({ type: IMAGE_UPLOAD_START });

        Promise.all([uploadImage(response.uri, 'image/jpeg', 'image')])
        .then(urls => {
          dispatch({ type: IMAGE_UPLOADED, payload: urls[0] });
        })
        .catch(error => {
          dispatch({ type: IMAGE_UPLOAD_FAILED, payload: error });
        });
      }
    });
  };
}

function uploadImage(uri, mime = 'image/jpeg', name) {
  return new Promise((resolve, reject) => {
    const imgUri = uri;
    let uploadBlob = null;
    const uploadUri = Platform.OS === 'ios' ? imgUri.replace('file://', '') : imgUri;
    const { currentUser } = firebase.auth();
    const imageRef = firebase.storage().ref(`/images/${currentUser.uid}`);

    fs.readFile(uploadUri, 'base64')
      .then(data => {
        console.log('data received');
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        console.log('blob received');
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime, name });
      })
      .then(() => {
        console.log('download url received');
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        console.log('url received');
        resolve(url);
      })
      .catch(error => {
        console.log('error received');
        reject(error);
    });
  });
}

export function deleteImage(index) {
  return {
    type: IMAGE_DELETE,
    payload: index
    };
}

export function getContact() {
  return (dispatch) => {
    ContactsWrapper.getContact()
          .then((contact) => {
              let { name, email, phone } = contact;
              if (!name) {
                name = '';
              }
              if (!email) {
                email = '';
              }
              if (!phone) {
                phone = '';
              }
              dispatch({ type: ADD_NEW_CONTACT, payload: { name, email, phone } });
          })
          .catch((error) => {
              dispatch({ type: ADD_NEW_CONTACT_FAIL, payload: error.message });
          });
  };
}

export function deleteContact(index) {
  return {
    type: DELETE_CONTACT,
    payload: index
    };
}

export function shareItem({ name, entries, images, contacts }) {
  return (dispatch) => {
    let msg = 'Entries:\n';
    if (entries) {
      for (let i = 0; i < entries.length; i++) {
        msg = `${msg}${entries[i]}\n`;
      }
    }

    msg = `${msg}Contacts:\n`;
    if (contacts) {
      for (let i = 0; i < contacts.length; i++) {
        msg = `${msg}${contacts[i].name} / ${contacts[i].phone} / ${contacts[i].email}\n`;
      }
    }

    msg = `${msg}Images:\n`;
    if (images) {
      for (let i = 0; i < images.length; i++) {
        msg = `${msg}${images[i]}\n`;
      }
    }

    const shareOptions = {
      title: name,
      message: msg,
      subject: name,
      url: '',
      type: 'text/plain'
    };

    Share.open(shareOptions)
      .catch((err) => { 
        console.log(err); 
        dispatch({ type: SHARE_ITEM_ERROR, payload: err });
      });
  };
}
