import React, { useState, useRef } from 'react'
import { View, StyleSheet, ScrollView, _ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import MessageBubble from '../components/UI/MessageBubble'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { connect, useStore } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/chatbot';

const ChatBotScreen = (props) => {

    const scrollViewRef = useRef();
    const [inputMessage, setInputMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [reply, setReply] = useState('')
    const [isSaveJournalNext, setIsSaveJournalNext] = useState(false)
    // 0 --> neutral
    // 1 --> positive
    // 2 --> negative
    // 3 --> dummy value
    const [mood, setMood] = useState(3)
    // for negative part
    // 0 --> share
    // 1 --> continue share
    const [continueShare, setContinueShare] = useState(true)

    const fetchmsg = () => {
        if (inputMessage == undefined || inputMessage == "") {
            console.log("Please Enter A Valid Message")
        } else {
            chatHistory.push({ isOwnMessage: true, message: inputMessage })
            console.log("Input :    " + inputMessage)

            if (isSaveJournalNext) {

                // This is not the final place for dispatch, should be dispatched after the user agreed (...-Journal(Yes)) , this part i havent done it
                // later i will move the dispatch to its place , u can do it first
                // The mesage should be send to JOURNAL at this point
                // dispatch(onSaveJournal(inputMessage))

                if (mood == 0) {
                    // The mood should be send to MOODTRACKER at this point (mood tracker)
                    // dispatch(onSaveMoodTracker(mood))
                    fetch('http://192.168.0.190:5000/send-msg/neutralno-journalyes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "text": `${inputMessage}`
                        })
                    })
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            chatHistory.push({ isOwnMessage: false, message: data.message[0].text.text[0] })
                            setReply(data.message[0].text.text[0])
                            console.log("Output :    " + data.message[0].text.text[0])
                        })
                } else if (mood == 1) {
                    // The mood should be send to MOODTRACKER at this point
                    // dispatch(onSaveMoodTracker(mood))
                    fetch('http://192.168.0.190:5000/send-msg/positive-shareyes', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "text": `${inputMessage}`
                        })
                    })
                        .then(res => {
                            return res.json();
                        })
                        .then(data => {
                            chatHistory.push({ isOwnMessage: false, message: data.message[0].text.text[0] })
                            setReply(data.message[0].text.text[0])
                            console.log("Output :    " + data.message[0].text.text[0])
                        })
                } else if (mood == 2) {
                    // The mood should be send to MOODTRACKER at this point
                    // dispatch(onSaveMoodTracker(mood))
                    if (continueShare) {
                        fetch('http://192.168.0.190:5000/send-msg/negative-sharedyes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "text": `${inputMessage}`
                            })
                        })
                            .then(res => {
                                return res.json();
                            })
                            .then(data => {
                                chatHistory.push({ isOwnMessage: false, message: data.message[0].text.text[0] })
                                setReply(data.message[0].text.text[0])
                                console.log("Output :    " + data.message[0].text.text[0])
                            })
                        setContinueShare(false)
                    } else {
                        fetch('http://192.168.0.190:5000/send-msg/negative-sharedyes-continueshareyes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                "text": `${inputMessage}`
                            })
                        })
                            .then(res => {
                                return res.json();
                            })
                            .then(data => {
                                chatHistory.push({ isOwnMessage: false, message: data.message[0].text.text[0] })
                                setReply(data.message[0].text.text[0])
                                console.log("Output :    " + data.message[0].text.text[0])
                            })
                        setContinueShare(true)
                    }
                }
            } else {

                fetch('http://192.168.0.190:5000/send-msg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "text": `${inputMessage}`
                    })
                })
                    .then(res => {
                        return res.json();
                    })
                    .then(data => {
                        setMood(data.mood)
                        console.log("Mood :     " + data.mood)
                        if (data.isSaveJournal) {
                            setIsSaveJournalNext(true)
                        }

                        chatHistory.push({ isOwnMessage: false, message: data.message[0].text.text[0] })
                        setReply(data.message[0].text.text[0])
                        console.log("Output :    " + data.message[0].text.text[0])
                    })
            }
            setIsSaveJournalNext(false)
            setInputMessage("")
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