import React, { useState } from 'react';
import { Text, View, StyleSheet,TextInput, Button } from 'react-native'
import Account from '../screens/Account';
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/reducer';
import { Avatar, Accessory } from "react-native-elements";
import LoginScreen from './LoginScreen';
const AccountScreen = (props) => {
    const logOutHandler = () => {
        props.onLogOutClick();

        props.navigation.navigate("LoginScreen");
    }
  
    const[username,setUsername] = useState("");
    const[UserID, setID] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userlocation, setUserlocation] = useState("");

    const nameChangeHandler =(username) => {
        username = username.replace(/\s+/g, '');
        setUsername(username)
    }
    const IDChangeHandler =(ID) =>{
        setID(ID)
    }
    const LocationChangeHandler =(userlocation) =>{
        setUserlocation(userlocation)
    }
    const passChangeHandler = (pass) => {
        pass = pass.replace(/\s+/g, '');
        setUserPassword(pass)
    }
    const GenderChangeHandler =(userGender) =>{
        setUserGender(userGender)
    }
    return (
        <View style={styles.container}> 
     
      <Avatar
    
      size="xlarge"
      title="USER"
      titleStyle={{fontSize:48}}
      onPress={() => console.log("Work!")}
      activeOpacity={0.7}
      containerStyle={{ marginTop: 75,marginBottom:30}}
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
       <TextInput style={styles.inputs}
            
               placeholder="Username" 
                onChangeText={nameChangeHandler} 
                value={username} 
                
                />
</View>

<View style={styles.inputContainer}>
       <TextInput style={styles.inputs}
       
                placeholder="ID" 
                onChangeText={IDChangeHandler} 
                value={UserID}
                />
            </View>

            <View style={styles.inputContainer}>
            <Picker
               placeholder="Gender" 
                selectedValue={props.userGender}
                style={{          borderColor: 'transparent',fontSize: 18, color:'#BFBFBF', 
                borderBottomColor: '#F5FCFF',
                backgroundColor: 'transparent',
                borderRadius: 30,
                borderBottomWidth: 1,
                width: 325,
                height: 212,
                marginBottom: 3,
                color:'#BFBFBF',
                
       }}
                onPickerValueChange={(userGender,_genderIndex)=> setUserGender({userGender : userGender})}
                mode="dialog">
                <Picker.Item value='' label='Gender' />
                 <Picker.Item label="Male" value="Male" />
                 <Picker.Item label="Female" value="Female" />

               </Picker>
               </View>
               <View style={styles.inputContainer}>

               
        <Picker
                placeholder="Location" 
                selectedValue={props.userlocation}
                style={{        borderColor: 'transparent',  fontSize: 18, color:'#BFBFBF', 
                borderBottomColor: '#F5FCFF',
                backgroundColor: 'transparent',
                borderRadius: 30,
                borderBottomWidth: 1,
                width: 325,
                height: 212,
                marginBottom: 3,
                color:'#BFBFBF',
       }}
                onPickerValueChange={(userlocation,_locationIndex)=> setUserlocation({Location : userlocation})}
                mode="dropdown">
                <Picker.Item value='' label='Location' />
                 <Picker.Item label="Johor" value="Johor" />
                 <Picker.Item label="Kedah" value="Kedah" />
                 <Picker.Item label="Kelantan" value="Kelantan" />
                 <Picker.Item label="Kuala Lumpur" value="Kuala Lumpur" />
                 <Picker.Item label="Labuan" value="Labuan" />
                 <Picker.Item label="Melaka" value="Melaka" />
                 <Picker.Item label="Negeri Sembilan" value="Negeri Sembilan" />
                 <Picker.Item label="Pahang" value="Pahang" />
                 <Picker.Item label="Perak" value="Perak" />
                 <Picker.Item label="Perlis" value="Perlis" />
                 <Picker.Item label="Pulau Pinang" value="Pulau Pinang" />
                 <Picker.Item label="Putrajaya" value="Putrajaya" />
                 <Picker.Item label="Sabah" value="Sabah" />
                 <Picker.Item label="Sarawak" value="Sarawak" />
                 <Picker.Item label="Selangor" value="Selangor" />
                 <Picker.Item label="Terengganu" value="Terengganu" />
            
               </Picker>
               </View>
               
            <Button
            style={styles.buttonContainer}
                title="Save Changes"
                onPress={() => props.navigation.navigate("AccountScreen")}
                />
                
           <Button
           style={styles.buttonContainer}
                title="Log Out"
                onPress={() => props.navigation.navigate("LoginScreen")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87cefa',
        alignItems: 'center',
        justifyContent: 'center',
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
    inputs: {

        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
       
    },
    buttonContainer: {
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
