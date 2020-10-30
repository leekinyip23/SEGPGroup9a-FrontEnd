import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'

const AccountScreen = (props) => {
    return (
        <View style={styles.container}>
            <Text>Hello from Account Screen</Text>
            <Text>Hello Aaron Chin</Text>
            <Button
                title="Log Out"
                onPress={() => props.navigation.navigate("LoginScreen")}
            />
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

export default AccountScreen;
