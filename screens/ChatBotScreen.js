import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, ScrollView, _ScrollView, Alert } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import MessageBubble from '../components/UI/MessageBubble'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { connect, useStore } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/chatbot';

import { sendMessageAPI } from '../service/api/chatBot';
import * as CHATBOT_ACTIONTYPE from '../service/api/actionType/chatBot';

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

    useEffect(() => {
        sendMessageAPI("Hi", false)
            .then(data => {
                setChatHistory([
                    ...chatHistory,
                    { isOwnMessage: false, message: data.message[0].text.text[0] },
                ])
            })
    }, [])

    const fetchmsg = () => {
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

            console.log("******************************************************************")
            console.log("Input :    " + inputMessage)

            let moodMessage = "";
            let isEvent = false;

            if (isSaveJournalNext) {
                isEvent = true
                setJournal([...journal, inputMessage])
                if (mood == -1) {
                    if (continueShare) {
                        moodMessage = CHATBOT_ACTIONTYPE.NEGATIVE_SHARED_YES_CONTINUE_SHARE_YES;
                        setContinueShare(false)
                    } else {
                        moodMessage = CHATBOT_ACTIONTYPE.NEGATIVE_SHARED_YES;
                        setContinueShare(true)
                    }
                } else if (mood == 0) {
                    moodMessage = CHATBOT_ACTIONTYPE.NEUTRAL_NO_JOURNAL_YES;
                } else if (mood == 1) {
                    moodMessage = CHATBOT_ACTIONTYPE.POSITIVE_SHARE_YES;
                }
                setIsSaveJournalNext(false)
            } else {
                moodMessage = inputMessage
            }

            if (isSaveToDB) {
                // dispatch mood
                // dispatch journal
                console.log("Things save to DB ::")
                console.log("Mood : " + mood)
                console.log("Journal content : " + journal)
                setIsSaveToDB(false)
            }

            sendMessageAPI(moodMessage, isEvent)
                .then(data => {

                    if (data.isSaveJournal) {
                        setIsSaveJournalNext(true)
                    }

                    if (data.isSaveToDB) {
                        setIsSaveToDB(true)
                    }

                    setMood(data.mood)

                    setChatHistory([
                        ...chatHistory,
                        { isOwnMessage: false, message: data.message[0].text.text[0] },
                    ])

                    console.log("Output : " + data.message[0].text.text[0])
                });
            setInputMessage("");
        }
    }

    // const fetchmsg = async e => {
    //     const response = await fetch('/send-msg', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ 
    //           "text": `${inputMessage}`
    //         }),
    //     });
    //     const body = await response.text();

    //     chatHistory.push({ isOwnMessage: false, message: response })
    // };

    const MessageHandler = (msg) => {
        setInputMessage(msg)
    }

    return (
        <View behavior="padding" style={styles.container}>

            <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.backgroundColour}>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {chatHistory.map((m, i) => <MessageBubble {...m} key={i} />)}
                </ScrollView>
            </LinearGradient>

            <View style={styles.messageBoxContainer}>
                <TextInput style={styles.messageBox} value={inputMessage} onChangeText={MessageHandler} />

                <TouchableOpacity onPress={() => { fetchmsg() }} style={styles.sendContainer}>
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
        justifyContent: 'flex-end',
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
    chatBotReducer: state.chatbotReducer
})

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatBotScreen);