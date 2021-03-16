import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import JournalDetailScreen from './JournalDetailScreen';
import JournalScreen from './JournalScreen';
import JournalAddScreen from './JouranlAddScreen';

const FullStack = createStackNavigator();

export default function RootStack() {
  return (
    <FullStack.Navigator
      initialRouteName="JournalOverview"
      screenOptions={{ gestureEnabled: false }}
    >
      <FullStack.Screen
        name="JournalOverview"
        component={JournalScreen}
        options={{ headerShown: false }}
      />
      <FullStack.Screen
        name="JournalDetail"
        component={JournalDetailScreen}
        options={
          ({route}) => ({
            title: route.params.journal.title
          })}
      />
      <FullStack.Screen 
        name="JournalAdd"
        component={JournalAddScreen}
        options= {{
          title: "Add Journal"
        }}
      />
    </FullStack.Navigator>

  );
}