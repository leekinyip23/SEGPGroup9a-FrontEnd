import React, { Fragment } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const EditButton = (props) => {
    return (
        <TouchableOpacity 
            style={{...styles.buttonContainer, ...props.style}} 
            onPress={() => {
                props.onPressHandler()
            }}
        >
            <Text style={styles.buttonText}>{props.bodyText}</Text>
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 7,
        width: "45%",
        borderRadius: 30,
        backgroundColor: "#00b5ec",
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
    }
})

export default EditButton;