import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const JournalScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello from Journal Screen</Text>
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

export default JournalScreen;
