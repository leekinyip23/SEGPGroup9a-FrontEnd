import React, { useState, useEffect, Fragment } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';


import * as ACTION_TYPES from '../../service/redux/action_types/journal';
import { connect } from 'react-redux';

import { addJournalAPI } from '../../service/api/journal'

import EditButton from '../../components/JournalScreen/EditButton';

const JournalAddScreen = (props) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [currentFocus, setCurrentFocus] = useState(null) 

    const confirmButtonHandler = () => {
        addJournalAPI(props.loginReducer.userId,title,body,0)
        .then(data => {
            console.log("Journal added successfully!");
            props.onAddJournal(data);
            props.navigation.navigate("JournalOverview")
        })
    }

    let focusedStyle;

    if(currentFocus !== null) {
        focusedStyle = {
            height: "82%"
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
            setCurrentFocus(null)
        }}>
            <View style={styles.container}>
                
                {(currentFocus === null || currentFocus === "title") && 
                    <Fragment>
                        <View style={styles.inputHeadingContainer}>
                            <Text style={styles.inputHeading}>Title</Text>
                        </View>
                        <View style={{...styles.inputHeadingContainer, ...styles.TextInputContainer, ...focusedStyle}}>
                            <TextInput 
                                style={styles.journalBodyText}
                                multiline={true}
                                onFocus={() => setCurrentFocus("title")}
                                onBlur={() => setCurrentFocus(null)}
                                value={title}
                                onChangeText={text => setTitle(text)}
                            />
                        </View>
                    </Fragment>
                }
                
                {(currentFocus === null || currentFocus === "body") &&
                    <Fragment>
                        <View style={styles.inputHeadingContainer}>
                            <Text style={styles.inputHeading}>Body</Text>
                        </View>
                        <View style={{...styles.inputHeadingContainer, ...styles.TextInputContainer, height: "55%", ...focusedStyle}}>
                            <TextInput 
                                style={styles.journalBodyText}
                                multiline={true}
                                onFocus={() => setCurrentFocus("body")}
                                onBlur={() => setCurrentFocus(null)}
                                value={body}
                                onChangeText={text => setBody(text)}
                            />
                        </View>
                    </Fragment>
                }
                {currentFocus === null && <View style={styles.confirmButton}>
                    <EditButton 
                        onPressHandler={() => confirmButtonHandler()}
                        bodyText={"Add Journal"}
                    />
                </View>
                }
                
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        backgroundColor: '#87cefa',
    },

    inputHeadingContainer: {
        height: 35,
        marginTop: "2%",
        width: "90%",
        backgroundColor: "#DCDCDC",
        alignContent: "center",
        alignSelf: "center",
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 8,
    },
    TextInputContainer: {
        marginTop: "1%",
        height: 50,
    },
    inputHeading: {
        fontSize: 20,
        textAlign: 'center',
    },
    journalBodyText: {
        textAlign: 'justify',
        textAlignVertical: "top",
        fontSize: 15,
        marginHorizontal: 15,
        marginVertical: 5,
        flex: 1,
    },
    confirmButton: {
        alignItems: "center",
        flex: 1,
        width: "100%",
    },
})

const mapStateToProps = state => ({
    journalReducer: state.journalReducer,
    loginReducer: state.loginReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        onAddJournal: (newJournal) => dispatch({
            type: ACTION_TYPES.ADD_JOURNAL,
            newJournal: newJournal,
        }),
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JournalAddScreen);
