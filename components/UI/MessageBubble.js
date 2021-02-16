import React from 'react'
import propTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'

const MessageBubble = (props) => (
    <View style={[style.bubble, props.isOwnMessage && style.ownBubble]}>
        <Text style={[style.messageText, props.isOwnMessage && style.ownMessageText]}>
            {props.message}
        </Text>
    </View>
)

<<<<<<< HEAD
=======
MessageBubble.propTypes = {
    message: propTypes.string.isRequired,
    isOwnMessage: propTypes.bool.isRequired,
}

>>>>>>> e8668914e0d718d1555f37372fdbbb2817c89c3f
const style = StyleSheet.create({
    bubble: {
        width: 250,
        padding: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: '#ececec',
        borderRadius: 10,
    },

    ownBubble: {
        backgroundColor: '#457DE5FF',
        alignSelf: 'flex-end',
    },

    messageText: {
        color: '#333333',
    },

    ownMessageText: {
        color: '#ffffff',
    },
})

export default MessageBubble