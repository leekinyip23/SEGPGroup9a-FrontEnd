import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountEditScreen from '../AccountScreen/AccountEditScreen';
import AccountScreen from '../AccountScreen/AccountScreen';

const FullStack = createStackNavigator();

export default function AccountStack() {
  return (
    <FullStack.Navigator
      initialRouteName="AccountOverView"
      screenOptions={{ gestureEnabled: false }}
    >
      <FullStack.Screen
        name="AccountOverview"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <FullStack.Screen
        name="AccountEdit"
        component={AccountEditScreen}
        options={
          ({route}) => ({
            title: route.params.account.title
          })}
          //{ headerShown: false }}
      />
    </FullStack.Navigator>

  );
}