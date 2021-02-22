import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';


import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/journal';

import Journal from '../../components/JournalScreen/Journal';


const DUMMY_DATA = require("../../dummy_data/dummy_data.json");


const JournalScreen = (props) => {
    const [journals, setJournals] = useState(DUMMY_DATA.journals);

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

    useEffect(() => {
        props.onSaveJournal(journals)
    }, [])

    useEffect(() => {
        setJournals(props.journalReducer.journals)
    }, [props.journalReducer])

    const journalPressHandler = (journal) => {
        props.navigation.navigate("JournalDetail", {
            journal: journal,
        })
    }


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    {journals && journals.map(journal => {
                        return (
                            <TouchableOpacity 
                                key={journal.journal_id}
                                style={styles.journalContainer}
                                onPress={() => {journalPressHandler(journal)}}
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
        </ScrollView>
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

const mapStateToProps = state => ({
    journalReducer: state.journalReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        onSaveJournal: (newJournalData) => dispatch({
            type: ACTION_TYPES.SAVE_JOURNAL,
            newJournals: newJournalData,
        }),
        dispatch,
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(JournalScreen);
