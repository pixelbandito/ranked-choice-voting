import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from 'firebase';
//
import Body from './Body';
//
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBdsGFx0j9svg0lfxEHqiWoiUuFywN6tSg",
  authDomain: "ranked-choice-voting-805a0.firebaseapp.com",
  databaseURL: "https://ranked-choice-voting-805a0.firebaseio.com",
  projectId: "ranked-choice-voting-805a0",
  storageBucket: "ranked-choice-voting-805a0.appspot.com",
  messagingSenderId: "860983913109"
}
//
// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}
//
// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
//
// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore);
//
// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  // firestore: firestoreReducer // <- needed if using firestore
});
//
// Create store with reducers and initial state
const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Body/>
        </div>
      </Provider>
    );
  }
}

export const AppSimple = () => (<div> Boom </div>);

export default App;
