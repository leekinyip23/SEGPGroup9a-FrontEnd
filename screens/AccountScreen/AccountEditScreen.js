import React, {useEffect, useState } from 'react';
import { Text, View, StyleSheet,TextInput, Keyboard, TouchableOpacity } from 'react-native'
import {Picker} from '@react-native-community/picker';
import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/account';
import { Avatar, Accessory } from "react-native-elements";
import AccEditButton from '../../components/AccountScreen/AccEditButton';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountEditScreen = (props) => {
    const [account, setAccount] = useState(props.route.params.account);
    const [accUsername, setaccUsername] = useState(props.route.params.account.username);
    const [accID, setaccID] = useState(props.route.params.account.UserID);
    const [accPass, setaccPass] = useState(props.route.params.account.userPassword);
    const [accgender, setaccgender] = useState(props.route.params.account.gender);
    const [accLocation, setaccLocation] = useState(props.route.params.account.userlocation);
    const [isBodyEditable, setIsBodyEditable] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [hidePass, setHidePass] = useState(true);

    //Add keyboard listener
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setKeyboardVisible(true); // or some other action
        }
        );
        const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setKeyboardVisible(false); // or some other action
        }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
  
 
   
   //Handling save changes
   const saveChangeHandler = () => {
    //Copy the current account detail
    let neweditAccounts = JSON.parse(JSON.stringify(account));
    //Replace the current details with new edit detail
    neweditAccounts.username = accUsername;
    neweditAccounts.UserID = accID;
    neweditAccounts.userPassword = accPass;
    neweditAccounts.gender = accgender;
    neweditAccounts.userlocation = accLocation;
    //Update state and redux, then set to not editable
    setAccount(neweditAccounts);
    props.onUpdateAccount(neweditAccounts);
    setIsBodyEditable(false);
    props.navigation.navigate("AccountOverview");
}

//Handle when discard change is pressed
const dischardChangeHandler = () => {
    //Reset the account detail to original detail
    setaccUsername(account.username);
    setaccID(account.UserID);
    setaccPass(account.userPassword);
    setaccgender(account.gender);
    setaccLocation(account.userlocation);
    //Set editable to false
    setIsBodyEditable(false);
    
    props.navigation.navigate("AccountOverview");
}


    return (
        <View style={styles.container}> 
     
      <Avatar
    
      size="xlarge"
      title="USER"
      titleStyle={{fontSize:48}}
      onPress={() => console.log("Work!")}
      activeOpacity={0.7}
      containerStyle={{ marginTop: 10,marginBottom:20}}
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

          
           
           
<View style={styles.itemContainer}> 

                   
                      
                        <TextInput style={styles.inputs}
                                placeholder="Username" 
                                 onChangeText={text => setaccUsername(text) } 
                                 value={accUsername} 
                                 isBodyEditable = {() =>setIsBodyEditable(true)}
                                 />
                                
                    
                    
                    
                   
                  
           
            </View>
                
            <View style={styles.itemContainer}>
               
                     
                     <TextInput style={styles.inputs}
                                 
                                 placeholder="ID" 
                                 onChangeText={text => setaccID(text)} 
                                 value={accID}
                                 isBodyEditable = {() =>setIsBodyEditable(true)}
                                 />
                              
                    
                
                </View>
                <View style={styles.itemContainer}>  
               
                   
                     <TextInput style={styles.inputs}
                                 
                                 placeholder="Password" 
                                 onChangeText={text => setaccPass(text)} 
                                 text={/\s+/g, ''}
                                 secureTextEntry={hidePass ? true : false}
                                 value={accPass}
                                 isBodyEditable = {() =>setIsBodyEditable(true)}
                                 />
                            
                   
                <Icon style={styles.iconContainer}
                    name={hidePass ? 'eye-slash' : 'eye'}
                    size={20}
                    color="grey"
                    onPress={() => setHidePass(!hidePass)}
                />
                 </View>
                 <View style={styles.itemContainer}>  
              
                    
                      <Picker
                                         placeholder="Gender" 
                                          selectedValue={accgender}
                                          style={         styles.inputs }
                                          isBodyEditable = {() =>setIsBodyEditable(true)}
                                          onValueChange={(accgender,_genderIndex)=> setaccgender(accgender)}
                                          mode="dialog">
                                          <Picker.Item value='' label='Gender' />
                                           <Picker.Item label="Male" value="Male" />
                          
                                           <Picker.Item label="Female" value="Female" />
                           
                          
                          
                                         </Picker>
                            
                            
                    
                 </View>
                 <View style={styles.itemContainer}> 
               
                     <Picker
                                          placeholder="Location" 
                                          selectedValue={accLocation}
                                          style={styles.inputs}
                                          isBodyEditable = {() =>setIsBodyEditable(true)}
                                          onValueChange={(accLocation,_locationIndex)=> setaccLocation(accLocation)}
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

         
         
                     <View style={styles.editButtonViewContainer}>
                      
                        
                        <AccEditButton 
                            onPressHandler={saveChangeHandler}
                            bodyText={"Save Changes"}
                            isBodyEditable = {() =>setIsBodyEditable(true)}
                            isKeyboardVisible = {() =>setKeyboardVisible(true)}
                            
                        />
                         <AccEditButton 
                            onPressHandler={dischardChangeHandler}
                            bodyText={"Discard Changes"}
                            isBodyEditable = {() =>setIsBodyEditable(true)}
                            isKeyboardVisible = {() => setKeyboardVisible(true)}
                        />
                    </View>
     
   



                
            
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
  
    itemContainer: {
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
    editButtonViewContainer: {
        flexDirection: 'row',
        color: "#DCDCDC",
    },
    editContainer: {
        width: "30%",
        backgroundColor: "#DCDCDC",
        marginTop: 15,
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 8,
        marginBottom: 5,
    },
    editBody: {
        width: "30%",
        marginVertical: 10,
        marginHorizontal: 30,
    },

    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 5,
        marginLeft:5,
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
    loginReducer: state.loginReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        onLogOutClick: () => dispatch({
            type: ACTION_TYPES.CLEAR_ACCOUNT,
        }),
        onUpdateAccount: (neweditAccountEntryData) => dispatch({
            type: ACTION_TYPES.UPDATE_EDIT,
            neweditAccountEntryData: neweditAccountEntryData,
        }),
    
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountEditScreen);
