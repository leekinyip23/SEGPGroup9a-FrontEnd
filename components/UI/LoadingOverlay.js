import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';

const LoadingOverlay = props => {
    return (
        <TouchableWithoutFeedback >
            <View style={styles.container}>
                <ActivityIndicator size={120} color="#007eff" />
                <Text style={styles.text}>{props.children}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 50,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.6,
        backgroundColor: "#303030"
    },
    text: {
        opacity: 1,
        color: "#eee",
        fontSize: 15,
    },
});

export default LoadingOverlay;