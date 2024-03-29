import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';

import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/journal';

import EditButton from '../../components/JournalScreen/EditButton';
import Spinner from 'react-native-loading-spinner-overlay';

import { updateJournalAPI } from '../../service/api/journal';

const JournalDetailScreen = (props) => {
    const [journal, setJournal] = useState(props.route.params.journal);
    const [journalBody, setJournalBody] = useState(props.route.params.journal.body);
    const [isBodyEditable, setIsBodyEditable] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


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
        //Copy the current journal
        let newJournal = JSON.parse(JSON.stringify(journal));

        //Replace the current journal's body with new text
        newJournal.body = journalBody;

        //Update state and redux, then set to not editable
        setJournal(newJournal);

        setIsLoading(true);
        updateJournalAPI(newJournal._id, newJournal.title, newJournal.body, newJournal.mood)
            .then(reply => {
                setIsLoading(false);
                if(reply.n > 0) {
                    console.log("Journal Updated Successfully!")
                    Alert.alert(
                        "Journal Updated Successfully!",
                        "Journal has been successfully updated!",
                        [
                            {
                                text: "Ok",
                                onPress: () => {},
                                style: "default"
                            }
                        ],
                        {
                            cancelable: true,
                            onDismiss: () => console.log("Update dismissed")
                        }
                    )
                    props.onUpdateJournal(newJournal);
                    setIsBodyEditable(false);
                } else{
                    console.log("Journal Update Fail!")
                }
            })

        
    }

    //Handle when discard change is pressed
    const dischardChangeHandler = () => {
        //Reset the body to original text
        setJournalBody(journal.body);
        //Set editable to false
        setIsBodyEditable(false);
    }

    return (
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
            <View style={styles.container}>
                <Spinner 
                    visible={isLoading}
                />
                <View style={{...styles.itemContainer, ...styles.journalContainer}}>
                    <View style={styles.journalBody}>
                        {isBodyEditable 
                            ? <TextInput
                                style={styles.journalBodyText}
                                onChangeText={text => setJournalBody(text)}
                                value={journalBody}
                                multiline={true}
                                autoFocus={true}
                            /> 
                            : <Text style={styles.journalBodyText}>{journalBody}</Text>
                        }
                    </View>
                </View>
                {isBodyEditable 
                    ? !isKeyboardVisible 
                        && <View style={styles.editButtonViewContainer}>
                            <EditButton 
                                onPressHandler={saveChangeHandler}
                                bodyText={"Save Changes"}
                            />
                            <EditButton 
                                onPressHandler={dischardChangeHandler}
                                bodyText={"Discard Changes"}
                            />
                        </View>
                    : <TouchableOpacity style={styles.buttonContainer} onPress={() => {setIsBodyEditable(true)}}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity >
                }
            </View>
        </TouchableWithoutFeedback>
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
        marginTop: "5%",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    journalContainer: {
        width: "90%",
        backgroundColor: "#DCDCDC",
        marginTop: 15,
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 8,
        marginBottom: 5,
    },
    journalBody: {
        width: "90%",
        marginVertical: 10,
        marginHorizontal: 30,
    },
    journalBodyText: {
        textAlign: 'justify',
        fontSize: 15,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00b5ec",
    },
    editButtonViewContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
    }
})

const mapStateToProps = state => ({
    journalReducer: state.journalReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        onUpdateJournal: (newJournalEntryData) => dispatch({
            type: ACTION_TYPES.UPDATE_JOURNAL,
            newJournalEntryData: newJournalEntryData,
        }),
        dispatch,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JournalDetailScreen);