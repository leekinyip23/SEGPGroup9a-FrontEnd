import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import MainReducer from './service/redux/reducers/reducer';

import AppNavigator from './navigations/AppNavigator';
import NavContainer from './navigations/NavContainer';

const store = createStore(MainReducer);


export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <NavContainer/>
        </NavigationContainer>
      </Provider>
  );
};