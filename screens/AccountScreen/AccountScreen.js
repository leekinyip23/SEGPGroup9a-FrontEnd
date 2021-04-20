import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { Avatar, Accessory } from "react-native-elements";
import { Fontisto } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/account';

import { loginUserAPI, registerUserAPI } from '../../service/api/login';

import Account from '../../components/AccountScreen/Account';

const DATA = require("../../dummy_data/dummy_profile_data.json");


const AccountScreen = (props) => {
    const [editAccount, seteditAccounts] = useState(DATA.editAccount);    
    //For when API is avaible

    useEffect(() => {
        if(props.loginReducer) {
            const newUserObj = [{
                userId: props.loginReducer.userId,
                nickname: props.loginReducer.nickname,
                age: props.loginReducer.age,
                password: props.loginReducer.password,
                gender: props.loginReducer.gender,
                location: props.loginReducer.location
            }]
            console.log(newUserObj)
            props.onSaveEdit(newUserObj)
            seteditAccounts(newUserObj)
        }
        
    }, [])

    useEffect(() => {
        seteditAccounts(props.accountReducer.editAccount)
    }, [props.accountReducer])

    const AccountPressHandler = (account) => {
        props.navigation.navigate("AccountEdit", {
            account: account,

        })
    }


    return (
        <View style={styles.container}>

            {editAccount && editAccount.map(account => {
                return (

                    <View
                        key={account.userId}
                        style={styles.container}
                    >

                        <View>
                            <Text style={styles.Text}>Profile</Text>

                     
                            <TouchableOpacity onPress={() => { console.log("Work!") }} style={styles.avatarContainer} >
                                <Fontisto name={account.gender.toLowerCase()} size={150} color="black" alignItems="center" />
                            </TouchableOpacity>

                            <View style={styles.inputContainer}>
                                <Account
                                    username={account.nickname}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Account
                                    age={account.age}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Account
                                    gender={account.gender}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Account
                                    location={account.location}
                                />
                            </View>

                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => { AccountPressHandler(account) }}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => props.navigation.navigate("LoginScreen")}>
                                <Text style={styles.buttonText}>Log Out</Text>
                            </TouchableOpacity>


                        </View>
                    </View>
                )
            })}

        </View>
    )
}
const styles = StyleSheet.create({

    avatarContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87cefa',
    },
    itemContainer: {
        marginTop: "10%",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    AccountContainer: {
        width: "80%",
        backgroundColor: "#DCDCDC",
        marginVertical: 4,
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 8,
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
        alignItems: 'center',
        color: '#BFBFBF',
    },
    Text: {
        marginLeft: 100,
        borderBottomColor: '#FFFFFF',
        fontSize: 18,
        color: 'white',
        fontSize: 36,
        padding: 10,

    },
    editbuttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 100,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00b5ec",
    },
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 65,
        width: 200,
        borderRadius: 30,
    },

    loginButton: {
        backgroundColor: "#00b5ec",
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    }
})

const mapStateToProps = state => ({
    accountReducer: state.accountReducer,
    loginReducer: state.loginReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        onSaveEdit: (newAccountData) => dispatch({
            type: ACTION_TYPES.SAVE_EDIT,
            neweditAccount: newAccountData,
        }),
        dispatch,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
