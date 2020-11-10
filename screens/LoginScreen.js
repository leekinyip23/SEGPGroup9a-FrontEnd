import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button } from 'react-native';

import { connect } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/reducer';

import Login from '../components/UI/Login';


const LoginScreen = (props) => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");


    const idChangeHandler = (id) => {
        setUserId(id)
    }

    const passChangeHandler = (pass) => {
        setUserPassword(pass)
    }

    const loginHandler = () => {
        props.onLoginClick(userId, userPassword);
        setUserId("");
        setUserPassword("");

        props.navigation.navigate("App")
    }

    return (
        <View style={styles.container}>
            <Image 
                style={styles.logo}
                source={require('../assets/logo.jpeg')}
            />
            <Login 
                name="ID" 
                onChange={idChangeHandler} 
                value={userId} 
            />
            <Login 
                name="Password" 
                onChange={passChangeHandler} 
                value={userPassword}
            />
            <Button 
                title="Login"
                onPress={() => {loginHandler()}
            }
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
    logo: {
        height: 70,
        width: 70,
        marginBottom: 50,
    },
    
})

const mapStateToProps = state => ({
    reducer: state,
});


const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: (newName, newPassword) => dispatch({
            type: ACTION_TYPES.LOGIN,
            name: newName,
            password: newPassword,
        }),
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
