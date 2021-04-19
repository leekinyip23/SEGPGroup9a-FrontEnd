import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView, _ScrollView, Alert, Platform } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import MessageBubble from '../components/UI/MessageBubble'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { connect, useStore } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/chatbot';
import * as JOURNAL_ACTION_TYPES from '../service/redux/action_types/journal';
import { addJournalAPI } from '../service/api/journal'

import { sendMessageAPI } from '../service/api/chatBot';
import * as CHATBOT_ACTIONTYPE from '../service/api/actionType/chatBot';

import Spinner from 'react-native-loading-spinner-overlay';

const ChatBotScreen = (props) => {

    const scrollViewRef = useRef();
    const [inputMessage, setInputMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [isSaveToDB, setIsSaveToDB] = useState(false)
    const [isSaveJournalNext, setIsSaveJournalNext] = useState(false)
    // -1 --> negative
    // 0 --> neutral
    // 1 --> positive
    // 2 --> normal conversation
    const [mood, setMood] = useState(2)
    const [journal, setJournal] = useState([])
    const [continueShare, setContinueShare] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        sendMessageAPI("Hi", false)
            .then(data => {
                setChatHistory([
                    ...chatHistory,
                    { isOwnMessage: false, message: data.message },
                ])
            })
    }, [])

    const messageHandler = (msg) => {
        setInputMessage(msg)
    }

    const showMessage = () => {
        if (inputMessage == undefined || inputMessage == "") {
            Alert.alert(
                'Invalid message!',
                'Message cannot be empty!',
                [
                    {
                        text: 'Ok',
                        onPress: () => console.log("Invalid message prompt canceled")
                    }
                ]
            )
        } else {
            chatHistory.push({ isOwnMessage: true, message: inputMessage })

            let dialogflowMessage = "";
            let isEvent = false;

            if (isSaveJournalNext) {
                isEvent = true
                setJournal([...journal, inputMessage])

                if (mood == -1) {
                    if (continueShare) {
                        dialogflowMessage = CHATBOT_ACTIONTYPE.NEGATIVE_SHARE_YES_CONTINUE_SHARE_YES;
                        setContinueShare(false)
                    } else {
                        dialogflowMessage = CHATBOT_ACTIONTYPE.NEGATIVE_SHARE_YES;
                        setContinueShare(true)
                    }
                } else if (mood == 0) {
                    dialogflowMessage = CHATBOT_ACTIONTYPE.NEUTRAL_NO_JOURNAL_YES;
                } else if (mood == 1) {
                    dialogflowMessage = CHATBOT_ACTIONTYPE.POSITIVE_SHARE_YES;
                }
                setIsSaveJournalNext(false)
            } else {
                dialogflowMessage = inputMessage
            }

            setIsLoading(true);

            sendMessageAPI(dialogflowMessage, isEvent)
                .then(data => {

                    if (data.intent.includes("Negative")) {
                        setMood(-1)
                    } else if (data.intent.includes("Neutral")) {
                        setMood(0)
                    } else if (data.intent.includes("Positive")) {
                        setMood(1)
                    }

                    if (data.intent === "Negative-Share(Yes)" ||
                        data.intent === "Negative-Share(Yes)-ContinueShare(Yes)" ||
                        data.intent === "Neutral(No)-Journal(Yes)" ||
                        data.intent === "Positive-Share(Yes)"
                    ) {
                        setIsSaveJournalNext(true)
                    }

                    if (data.intent === "Negative-Share(Yes)-ContinueShare(Yes)-Journal(Yes)-End" ||
                        data.intent === "Negative-Share(Yes)-ContinueShare(No)-Journal(Yes)-End" ||
                        data.intent === "Neutral(No)-Journal(Yes)-End" ||
                        data.intent === "Positive-Share(Yes)-Journal(Yes)"
                    ) {
                        setIsSaveToDB(true)
                        setIsSaveToDB((state) => {
                            if (state) {
                                let currentDate = new Date().toDateString()

                                //Call API
                                setIsLoading(true);
                                addJournalAPI(props.loginReducer.userId, currentDate, journal, mood)
                                    .then(data => {
                                        console.log("Journal added successfully!");
                                        props.onSaveToJournal(data);
                                        setIsLoading(false);
                                    })
                                console.log("Saving to MongoDB")
                                console.log("Mood : " + mood)
                                console.log("Journal content : " + journal)

                                setMood(2)
                                setJournal([])
                                setIsSaveToDB(false)
                            }
                            return state;
                        });
                    }

                    setChatHistory([
                        ...chatHistory,
                        { isOwnMessage: false, message: data.message },
                    ])

                    console.log("******************************************************************")
                    console.log("Input :    " + inputMessage)
                    console.log("Output : " + data.message)

                    setIsLoading(false);

                }).catch(err => {
                    console.log("Error!")
                });
        }
        setInputMessage('')
    }

    return (
        <View behavior="padding" style={styles.container}>
            <Spinner
                visible={isLoading}
            />


            <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.backgroundColour}>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {chatHistory.map((m, i) => <MessageBubble {...m} key={i} />)}
                </ScrollView>
            </LinearGradient>


            <View style={styles.messageBoxContainer}>

                <TextInput style={styles.messageBox} value={inputMessage} onChangeText={messageHandler} />

                <TouchableOpacity onPress={() => { showMessage() }} style={styles.sendContainer}>
                    <Feather name="send" size={35} color="blue" />
                </TouchableOpacity>
            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#87cefa',
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },

    bubbleContainer: {
        flex: 1,
    },

    messageBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
        backgroundColor: '#eeeeee',
        paddingVertical: 5,
        paddingHorizontal: 15,
    },

    messageBox: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
    },

    backgroundColour: {
        flex: 1,
    },

    sendContainer: {
        flex: 1,
        padding: 1,
    },
})

const mapStateToProps = state => ({
    chatBotReducer: state.chatbotReducer,
    loginReducer: state.loginReducer,
})

const mapDispatchToProps = dispatch => {
    return {
        onSaveToJournal: (newJournal) => dispatch({
            type: JOURNAL_ACTION_TYPES.ADD_JOURNAL,
            newJournal: newJournal,
        }),
        dispatch,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotScreen);