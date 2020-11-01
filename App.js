import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppNavigator from './navigations/AppNavigator';
import NavContainer from './navigations/NavContainer';


export default function App() {
  return (
      <NavigationContainer>
        <NavContainer/>
      </NavigationContainer>
  );
};