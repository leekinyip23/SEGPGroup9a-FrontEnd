import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native'
import { Picker } from '@react-native-community/picker';
import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/account';
import AccEditButton from '../../components/AccountScreen/AccEditButton';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Fontisto } from '@expo/vector-icons';
import { updateAccountAPI } from '../../service/api/account';
import NumericInput from 'react-native-numeric-input';

const AccountEditScreen = (props) => {
    const [userId, setuserId] = useState(props.route.params.account.userId);
    const [account, setAccount] = useState(props.route.params.account);
    const [nickname, setaccNickname] = useState(props.route.params.account.nickname);
    const [age, setaccAge] = useState(props.route.params.account.age);
    const [password, setaccPass] = useState(props.route.params.account.password);
    const [gender, setaccgender] = useState(props.route.params.account.gender);
    const [location, setaccLocation] = useState(props.route.params.account.location);
    const [isBodyEditable, setIsBodyEditable] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [hidePass, setHidePass] = useState(true);
    const [showGender, setShowGender] = useState(props.route.params.account.gender);

    // const gender = props.route.params.account.gender;

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
        neweditAccounts.userId = userId;
        neweditAccounts.nickname = nickname;
        neweditAccounts.age = age;
        neweditAccounts.password = password;
        neweditAccounts.gender = gender;
        neweditAccounts.location = location;
        //Update state and redux, then set to not editable
        setAccount(neweditAccounts);

        props.navigation.navigate("AccountOverview");
        console.log("Ruuning")
        console.log(neweditAccounts.userId)
        updateAccountAPI(neweditAccounts.userId, neweditAccounts.nickname, neweditAccounts.age, neweditAccounts.gender, neweditAccounts.location, neweditAccounts.password)
            .then(reply => {
                console.log(reply)
                if (reply.n > 0) {
                    console.log("Account Updated Successfully!")
                    console.log(props.route.params.account)
                    Alert.alert(
                        "Account Updated Successfully!",
                        "Account has been successfully updated!",
                        [
                            {
                                text: "Ok",
                                onPress: () => { },
                                style: "default"
                            }
                        ],
                        {
                            cancelable: true,
                            onDismiss: () => console.log("Update dismissed")
                        }
                    )
                    props.onUpdateAccount(neweditAccounts);
                    setIsBodyEditable(false);
                } else {
                    console.log("Account Update Fail!")
                }
            }).catch(err => {
                console.log("Error!")
            });

    }

    //Handle when discard change is pressed
    const dischardChangeHandler = () => {
        //Reset the account detail to original detail
        setuserId(account.userId);
        setaccNickname(account.nickname);
        setaccAge(account.age);
        setaccPass(account.password);
        setaccgender(account.gender);
        setaccLocation(account.location);
        //Set editable to false
        setIsBodyEditable(false);

        props.navigation.navigate("AccountOverview");
    }



    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.container}>


                <TouchableOpacity onPress={() => { console.log(props.route.params.account.gender) }} style={styles.avatarContainer} >
                    { <Fontisto name={(showGender.toLowerCase())} size={150} color="black" alignItems="center" /> }
                </TouchableOpacity>





                <View style={styles.itemContainer}>



                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        onChangeText={text => setaccNickname(text)}
                        value={nickname}
                        isBodyEditable={() => setIsBodyEditable(true)}
                    />







                </View>

                <View style={styles.itemContainer}>


                    {/* <TextInput style={styles.inputs}

                        placeholder="Age"
                        onChangeText={text => setaccAge(text)}
                     
                        value={age}
                        isBodyEditable={() => setIsBodyEditable(true)}
                    /> */
                    <NumericInput 
                    style={styles.inputs}
                        placeholder="Age"
                        onChange={value => setaccAge(value)}
                        rounded 
                        value={age}
                        
                    />}



                </View>
                <View style={styles.itemContainer}>


                    <Picker
                        placeholder="Gender"
                        selectedValue={gender}
                        style={styles.inputs}
                        isBodyEditable={() => setIsBodyEditable(true)}
                        onValueChange={(gender, _genderIndex) => { setaccgender(gender); setShowGender(gender) }}
                        mode="dialog">
                    
                        <Picker.Item label="male" value="male" />

                        <Picker.Item label="female" value="female" />



                    </Picker>



                </View>
                <View style={styles.itemContainer}>

                    <Picker
                        placeholder="Location"
                        selectedValue={location}
                        style={styles.inputs}
                        isBodyEditable={() => setIsBodyEditable(true)}
                        onValueChange={(location, _locationIndex) => setaccLocation(location)}
                        mode="dropdown">
                     
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
                        isBodyEditable={() => setIsBodyEditable(true)}
                        isKeyboardVisible={() => setKeyboardVisible(true)}

                    />
                    <AccEditButton
                        onPressHandler={dischardChangeHandler}
                        bodyText={"Discard Changes"}
                        isBodyEditable={() => setIsBodyEditable(true)}
                        isKeyboardVisible={() => setKeyboardVisible(true)}
                    />
                </View>







            </View >
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },

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
        color: '#BFBFBF',
    },
    inputs: {

        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize: 18,
        color: '#BFBFBF',

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
        marginLeft: 5,
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
