import React, { Component } from 'react';
import { YellowBox } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

YellowBox.ignoreWarnings(['Setting a timer']);
class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyClmoyrMyztiz7J5LnnQ5NGzOC18flHqdQ',
      authDomain: 'toptalreacttodolist.firebaseapp.com',
      databaseURL: 'https://toptalreacttodolist.firebaseio.com',
      projectId: 'toptalreacttodolist',
      storageBucket: 'gs://toptalreacttodolist.appspot.com',
      messagingSenderId: '684447808465'
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
