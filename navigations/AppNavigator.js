import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import LoginScreen from '../screens/LoginScreen';
import JournalScreen from '../screens/JournalScreen';
import ChatBotScreen from '../screens/ChatBotScreen';
import AccountScreen from '../screens/AccountScreen';

const AppTab = createBottomTabNavigator();
const AppNavigator = () => {
    return (
            <AppTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if(route.name === 'Journal') {
                            iconName = 'ios-book';
                        } else if (route.name === 'ChatBot') {
                            iconName = 'ios-warning';
                        } else if (route.name === 'Account') {
                            iconName = 'md-person';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />
                    }
                })}
                tabBarOptions={{
                    keyboardHidesTabBar: true,
                }}
            >
                <AppTab.Screen 
                    name="Journal"
                    component={JournalScreen}
                />
                <AppTab.Screen 
                    name="ChatBot"
                    component={ChatBotScreen}
                />
                <AppTab.Screen 
                    name="Account"
                    component={AccountScreen}
                />
            </AppTab.Navigator>

    )
}

const FullStack = createStackNavigator();

export default function RootStack() {
  return (
    <FullStack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ gestureEnabled: false }}
    >
      <FullStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <FullStack.Screen
        name="App"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </FullStack.Navigator>

  );
}