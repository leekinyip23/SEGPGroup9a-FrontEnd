import React, { useEffect, useState } from 'react';
import { Text,View, StyleSheet, TouchableOpacity,Button } from 'react-native';
import { Avatar, Accessory } from "react-native-elements";

import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/Account';

import Account from '../../components/AccountScreen/Account';

const DATA = require("../../dummy_data/dummy_profile_data.json");


const AccountScreen = (props) => {
    const [editAccount, seteditAccounts] = useState(DATA.editAccount);
    //For when API is avaible

    // useEffect(() => {
    //     fetch("../dummy_data/dummy_data.json")
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         setJournalData(journalData);
    //     })
    // }, [])

    useEffect(() => {
        props.onSaveEdit(editAccount)
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
                        
                        key={account.account_id}
                        style={styles.container}
                    >
                      
                       <View>
                       <Text style={styles.Text}>Your Profile</Text>

                       <Avatar
    
      size="xlarge"
      title="USER"
      titleStyle={{fontSize:48}}
      onPress={() => console.log("Work!")}
      activeOpacity={0.7}
      containerStyle={{ marginTop: -30,marginBottom:20, marginLeft:80 }}
      source={{
        uri:
          'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      }}
      onAccessoryPress={() => Alert.alert("change avatar")}
      rounded
  > 
 <Accessory
 
 />
</Avatar>

                            <View style={styles.inputContainer}>
                            <Account 
                            
                                username= {account.username}
                                />
                                 </View>
                                 <View style={styles.inputContainer}>
                                  <Account 
                                UserID={account.UserID}
                                />
                                </View>
                               
                                <View style={styles.inputContainer}>
                                <Account 
                                gender={account.gender}
                                />
                                </View>
                                <View style={styles.inputContainer}>
                                <Account 
                                userlocation={account.userlocation}
                            />
                             </View>
                    
                 <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {AccountPressHandler(account)}}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
               
                <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  props.navigation.navigate("LoginScreen")}>
                  <Text style={styles.buttonText}>Log Out</Text>
                </TouchableOpacity>
          
                     
                             </View>
                             </View>   
                  )  })}
        
        </View>
    )
}
const styles = StyleSheet.create({
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
        color:'#BFBFBF',
    },
    Text: {

        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        fontSize:18,
        color:'white',
        fontSize:36,
        padding:45,
       
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
        marginLeft:65,
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
