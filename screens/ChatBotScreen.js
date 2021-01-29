import React, { useState, useRef } from 'react'
import { Text, View, SafeAreaView, StyleSheet, ScrollView, _ScrollView } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import MessageBubble from '../components/UI/MessageBubble'
import { Feather } from '@expo/vector-icons';

const ChatBotScreen = (props) => {

    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([])
    const [state, setState] = useState(Number)

    const AddView = () => {
        if (message == undefined) {
            console.log("Please Enter A Valid Message")
        } else {
            setMessage()
            setState(Math.floor(Math.random() * 10) + 1)
            console.log(state)
            chatHistory.push({ isOwnMessage: true, message: message })

            if (state == 1) {
                chatHistory.push({ isOwnMessage: false, message: 'Hello' })
            } else if (state == 2) {
                chatHistory.push({ isOwnMessage: false, message: 'How is your day ?' })
            } else if (state == 3) {
                chatHistory.push({ isOwnMessage: false, message: 'Nice to meet you' })
            } else if (state == 4) {
                chatHistory.push({ isOwnMessage: false, message: 'My name is Teemo' })
            } else if (state == 5) {
                chatHistory.push({ isOwnMessage: false, message: 'Whatups' })
            } else {
                chatHistory.push({ isOwnMessage: false, message: 'Have a nice day' })
            }
            console.log(chatHistory);
        }
    }

    const MessageHandler = (msg) => {
        setMessage(msg)
    }

    const ScrollToBottom = () => {
        setTimeout(() => {
        })
    }

    const scrollViewRef = useRef();

    return (
        <SafeAreaView behavior="padding" style={styles.container}>

            <ScrollView ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {chatHistory.map((m, i) => <MessageBubble {...m} key={i} />)}
            </ScrollView>

            <View style={styles.messageBoxContainer}>
                <TextInput style={styles.messageBox}
                    value={message}
                    onChangeText={MessageHandler} />

                <TouchableOpacity onPress={() => { AddView() }}>
                    <Feather name="send" size={25} color="blue" />
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        paddingHorizontal: 10,
    },

    messageBox: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#dddddd',
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
    },

    sendButton: {
        color: 'blue',
        marginLeft: 10,
        marginRight: 5,
        fontSize: 16,
        fontWeight: '500',
    },
})

const mapStateToProps = state => ({
    reducer: state.chatHistory,
});

export default ChatBotScreen;
