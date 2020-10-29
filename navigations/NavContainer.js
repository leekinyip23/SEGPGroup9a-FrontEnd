import React, { useState } from 'react';
import { Text, View } from 'react-native';



import AppNavigator from './AppNavigator';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';

const NavContainer = props => {
    return (

        <NavigationContainer>
            <AppNavigator/>
            <Text>Test</Text>
        </NavigationContainer>
    )
}


export default NavContainer;