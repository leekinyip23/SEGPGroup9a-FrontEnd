import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

import Journal from '../components/JournalScreen/Journal';

const DUMMY_DATA = require("../dummy_data/dummy_data.json");

const JournalScreen = (props) => {
    const [journalData, setJournalData] = useState(DUMMY_DATA);

    //For when API is avaible

    // useEffect(() => {
    //     fetch("../dummy_data/dummy_data.json")
    //     .then(response => {
    //         return response.json();
    //     })
    //     .then(data => {
    //         setJournalData(journalData);
    //     })
    // }, [])

    const journalPressHandler = (id) => {
        console.log(id);
    }


    return (
        <View style={styles.container}>
            <View style={styles.itemContainer}>
                {journalData.journals && journalData.journals.map(journal => {
                    return (
                        <TouchableOpacity 
                            key={journal.journal_id}
                            style={styles.journalContainer}
                            onPress={() => {journalPressHandler(journal.journal_id)}}
                        >
                            <Journal 
                                date={journal.date}
                                title={journal.title}
                                mood={journal.mood}
                            />
                        </TouchableOpacity>   
                    )
                })}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#87cefa',
    },
    itemContainer: {
        marginTop: "10%",
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    journalContainer: {
        width: "80%",
        backgroundColor: "#DCDCDC",
        marginVertical: 4,
        borderColor: "white",
        borderWidth: 3,
        borderRadius: 8,
    },
})

export default JournalScreen;
