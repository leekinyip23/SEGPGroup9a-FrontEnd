import React, { useState, useRef } from 'react'
import { View, SafeAreaView, StyleSheet, ScrollView, _ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import MessageBubble from '../components/UI/MessageBubble'
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';


import { connect } from 'react-redux';
import * as ACTION_TYPES from '../service/redux/action_types/chatbot';

const ChatBotScreen = (props) => {

    const [inputMessage, setInputMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [reply, setReply] = useState(Number)

    const scrollViewRef = useRef();

    const fetchmsg = () => {

        var url = 'https://dialogflow.googleapis.com/v2/projects/mental-health-care-chatbo-rqfi/agent';

        const data = new URLSearchParams();
        for (const pair of new FormData(inputMessage)) {
            data.append(pair[0], pair[1]);
            console.log(pair)
        }

        console.log("abc", data)
        fetch(url, {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                chatHistory.push({ isOwnMessage: false, message: response.message })


            })
            .catch(error => console.error('Error h:', error));

    }


    const MessageHandler = (msg) => {
        setInputMessage(msg)
    }

    const AddChat = () => {
        if (inputMessage == undefined || inputMessage == "") {
            console.log("Please Enter A Valid Message")
        } else {
            setInputMessage()
            fetchmsg()
            setReply(Math.floor(Math.random() * 10) + 1)

            chatHistory.push({ isOwnMessage: true, message: inputMessage })

            if (reply == 1) {
                chatHistory.push({ isOwnMessage: false, message: 'Hello' })
            } else if (reply == 2) {
                chatHistory.push({ isOwnMessage: false, message: 'How is your day ?' })
            } else if (reply == 3) {
                chatHistory.push({ isOwnMessage: false, message: 'Nice to meet you' })
            } else if (reply == 4) {
                chatHistory.push({ isOwnMessage: false, message: 'My name is Teemo' })
            } else if (reply == 5) {
                chatHistory.push({ isOwnMessage: false, message: 'Whatups' })
            } else {
                chatHistory.push({ isOwnMessage: false, message: 'Have a nice day' })
            }

            // Printing out input message by user
            console.log(inputMessage)
        }
    }

    return (
        <SafeAreaView behavior="padding" style={styles.container}>

            <LinearGradient colors={['#2974FA', '#38ABFD', '#43D4FF']} style={styles.backgroundColour}>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                    {chatHistory.map((m, i) => <MessageBubble {...m} key={i} />)}
                </ScrollView>
            </LinearGradient>

            <View style={styles.messageBoxContainer}>
                <TextInput style={styles.messageBox} value={inputMessage} onChangeText={MessageHandler} />

                <TouchableOpacity onPress={() => { AddChat() }} style={styles.sendContainer}>
                    <Feather name="send" size={35} color="blue" />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
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
