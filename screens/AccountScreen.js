import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

import { connect } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/reducer';


const AccountScreen = (props) => {
    const logOutHandler = () => {
        props.onLogOutClick();

        props.navigation.navigate("LoginScreen");
    }

    return (
        <View style={styles.container}>
            <Text>{props.reducer.name}</Text>
            <Text>{props.reducer.password}</Text>
            <Button
                title="Log Out"
                onPress={() => logOutHandler()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

const mapStateToProps = state => ({
    reducer: state,
});

const mapDispatchToProps = dispatch => {
    return {
        onLogOutClick: () => dispatch({
            type: ACTION_TYPES.CLEAR_ACCOUNT,
        }),
        dispatch,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
