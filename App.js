import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';

import LoginReducer from './service/redux/reducers/login';
import ChatbotReducer from './service/redux/reducers/chatbot';
import JournalReducer from './service/redux/reducers/journal';
import AccountReducer from './service/redux/reducers/Account';
import NavContainer from './navigations/NavContainer';

const rootReducer = combineReducers({
  loginReducer: LoginReducer,
  chatbotReducer: ChatbotReducer,
  journalReducer: JournalReducer,
  accountReducer: AccountReducer,
})

const store = createStore(rootReducer);


export default function App() {
  return (
      <Provider store={store}>
        <NavigationContainer>
          <NavContainer/>
        </NavigationContainer>
      </Provider>
  );
};