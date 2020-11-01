import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';

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
                onPress={() => props.navigation.navigate("App")}
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

export default LoginScreen;
