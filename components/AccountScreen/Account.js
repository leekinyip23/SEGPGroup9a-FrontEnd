import React from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const Account = (props) => {
        return (
            <View>
                <View style={styles.textBody}>
                <Text style={styles.ShownText}>{props.username} </Text>
                </View>
                <View style={styles.textBody}>
                 <Text style={styles.ShownText}>{props.age} </Text>
                 </View>
                 
                <View style={styles.textBody}>
                 <Text style={styles.ShownText}>{props.gender} </Text>
                 </View>
                <View style={styles.textBody}>
                 <Text style={styles.ShownText}>{props.location} </Text>
                 </View>
            </View>
        )
}

const styles = StyleSheet.create({
  
     ShownText: {
       marginBottom:-100,
       marginTop:-10,
        marginLeft: 40,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        fontSize:18,
        color:'#BFBFBF',
        
     },
})

export default Account