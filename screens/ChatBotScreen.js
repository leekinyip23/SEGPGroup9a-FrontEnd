import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const ChatBotScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello from ChatBot Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default ChatBotScreen;