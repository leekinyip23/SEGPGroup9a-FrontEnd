import React from 'react';
import { View, Text, StyleSheet,TextInput } from 'react-native';

const Input = (props) => {
    return (
        <View>
            <TextInput />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        height: 40,
        borderColor: 'black'
    }
})

export default Input;