import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const Account = (props) => {
        return (
            <View>
                <View style={styles.textBody}>
                <Text style={styles.usernameText}>{props.username} </Text>
                </View>
                <View style={styles.textBody}>
                 <Text style={styles.AgeText}>{props.age} </Text>
                 </View>
                 
                <View style={styles.textBody}>
                 <Text style={styles.GenderText}>{props.gender} </Text>
                 </View>
                <View style={styles.textBody}>
                 <Text style={styles.locationText}>{props.location} </Text>
                 </View>
            </View>
        )
}

const styles = StyleSheet.create({
  
     usernameText: {
       marginBottom:-100,
       marginTop:-10,
        marginLeft: 40,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
        
     },
     AgeText: {
        marginBottom:-100,
        marginTop:-10,
         marginLeft: 40,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
    },
    PassText: {
        marginBottom:-100,
       marginTop:-10,
        marginLeft: 40,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
    },
    GenderText: {
        marginBottom:-100,
        marginTop:-10,
         marginLeft: 40,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
    },
    locationText: {
        marginBottom:-100,
        marginTop:-10,
         marginLeft: 40,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
    }
   
})

export default Account