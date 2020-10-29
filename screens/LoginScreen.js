import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, Button } from 'react-native';

const LoginScreen = (props) => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("")

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
            <View style={styles.form}>
                <Text style={styles.formText}>ID:</Text>
                <TextInput
                    style={{...styles.formText ,...styles.input}}
                    onChangeText={id => idChangeHandler(id)}
                    value={userId}
                 />
            </View>
            <View style={styles.form}>
                <Text style={styles.formText}>Password:</Text>
                <TextInput
                    style={{...styles.formText ,...styles.input}}
                    onChangeText={password => passChangeHandler(password)}
                    value={userPassword}
                 />
            </View>
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
    form: {
       flexDirection: 'row',
       borderWidth: 1,
       marginTop: 15,
       width: '90%',
    },
    formText: {
        fontSize: 15,
        width: '25%',
        textAlign: "left",
        marginHorizontal: 5,
        padding: 5,
        height: 40,
    },
    input: {
        borderLeftWidth: 1,
        width:'100%',
        fontSize: 15,
    }
})

export default LoginScreen;
