import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, Button, TextInput, TouchableOpacity, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { connect } from 'react-redux';
import * as LOGIN_ACTION_TYPES from '../service/redux/action_types/login';

import { loginUserAPI, registerUserAPI } from '../service/api/login';
import Spinner from 'react-native-loading-spinner-overlay';

import Login from '../components/UI/Login';
import { Alert } from 'react-native';


const LoginScreen = (props) => {
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const idChangeHandler = (id) => {
        id = id.replace(/\s+/g, '');
        setUserId(id)
    }

    const passChangeHandler = (pass) => {
        pass = pass.replace(/\s+/g, '');
        setUserPassword(pass)
    }

    const loginHandler = () => {
        setIsLoading(true);
        loginUserAPI(userId, userPassword)
        .then((userInfo) => {
            setIsLoading(false);
            if(userInfo.username && userInfo._id) {
                props.onLoginClick(userId, userPassword, userInfo._id);
                props.navigation.navigate("App")
            } else {
                Alert.alert(
                    `Invalid login`,
                    "Incorrect id or password",
                    [
                        {
                            text: "Ok",
                            onPress: () => {},
                            style: "default",
                        }
                    ],
                    {
                        cancelable: true,
                        onDismiss: () => {}
                    }
                )
            }
            setUserId("");
            setUserPassword("");
        })
    }

    return (
        <View style={styles.container}>
            <Spinner 
                visible={isLoading}
            />
            <Image
                style={styles.logoContainer}
                source={require('../assets/logo.jpeg')}
            />

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Username"
                    underlineColorAndroid='transparent'
                    value={userId}
                    onChangeText={idChangeHandler} />
            </View>

            <View style={styles.inputContainer}>
                <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
                <TextInput style={styles.inputs}
                    placeholder="Password"
                    secureTextEntry={hidePass ? true : false}
                    underlineColorAndroid='transparent'
                    value={userPassword}
                    onChangeText={passChangeHandler} />

                <Icon style={styles.iconContainer}
                    name={hidePass ? 'eye-slash' : 'eye'}
                    size={20}

                    color="grey"
                    onPress={() => setHidePass(!hidePass)}
                />
            </View>

            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => { loginHandler() }}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity >

            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate("App")}>
                <Text>Forgot your password ?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => props.navigation.navigate("App")}>
                <Text>Register</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#87cefa',
    },

    logoContainer: {
        borderRadius: 30,
        marginBottom: 50,
    },

    iconContainer: {
        marginHorizontal: 10,
    },

    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 325,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },

    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },

    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
        width: 250,
        borderRadius: 30,
    },

    loginButton: {
        backgroundColor: "#00b5ec",
    },

    loginText: {
        color: 'white',
    }
})

const mapStateToProps = state => ({
    loginReducer: state.loginReducer,
});


const mapDispatchToProps = dispatch => {
    return {
        onLoginClick: (newName, newPassword, newUserId) => dispatch({
            type: LOGIN_ACTION_TYPES.LOGIN,
            name: newName,
            password: newPassword,
            userId: newUserId,
        }),
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
