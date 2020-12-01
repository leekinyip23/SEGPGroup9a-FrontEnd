import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

const Journal = (props) => {
    return (
        <View>
            <Text style={styles.textDate}>{props.date}</Text>
            <View style={styles.textBody}>
                <Text style={styles.textMood}>{props.mood}</Text>
                <Text style={styles.textTitle}>{props.title}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textBody: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    textDate: {
        textAlign: "left",
        marginHorizontal: 10,
        fontSize: 15,
    },
    textMood: {
        marginHorizontal: 0,
        paddingHorizontal: 15,
        textAlign: "justify",
        fontSize: 15,
        flex:1,
    }, 
    textTitle: {
        textAlign: "center",
        marginTop: 5,
        marginBottom: 15,
        fontSize: 20,
        flex: 5,
    },
})

export default Journal
