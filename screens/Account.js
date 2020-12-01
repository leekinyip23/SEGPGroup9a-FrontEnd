import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'

const Account = (props) => {
        return (
            <View style={styles.form}>
                <Text style={styles.formText}>
                    {props.name}
                </Text>
                <TextInput
                    style={{...styles.formText ,...styles.input}}
                    onChangeText={props.onChange}
                    value={props.value}
                 />
            </View>
        )
}

const styles = StyleSheet.create({
    form: {
        flexDirection: 'row',
        borderWidth: 1,
        marginTop: 15,
        width: '90%',
     },
     formText: {
         fontSize: 15,
         width: '25%',
         textAlign: "left",
         marginHorizontal: 5,
         padding: 5,
         height: 40,
     },
     input: {
         borderLeftWidth: 1,
         width:'100%',
         fontSize: 15,
     }
})

export default Account