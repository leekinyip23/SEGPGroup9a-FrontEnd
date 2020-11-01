import React from 'react';
import { View, StyleSheet } from 'react-native';



import AppNavigator from './AppNavigator';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const NavContainer = props => {
    return (
        <View style={styles.container}>
            <AppNavigator/>
            {
                false && <LoadingOverlay />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})


export default NavContainer;