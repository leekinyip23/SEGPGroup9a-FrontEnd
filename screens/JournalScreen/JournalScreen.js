import React, { Fragment, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SearchBar } from 'react-native-elements';


import { connect } from 'react-redux';
import * as ACTION_TYPES from '../../service/redux/action_types/journal';

import Journal from '../../components/JournalScreen/Journal';
import { addJournalAPI, deleteJournalAPI, updateJournalAPI, fetchJournalAPI } from '../../service/api/journal';

const DUMMY_DATA = require("../../dummy_data/dummy_data.json");


const JournalScreen = (props) => {
    const [journals, setJournals] = useState();
    const [searchMessage, setSearchMessage] = useState("");

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
        fetchJournalAPI(props.loginReducer.userId)
        .then(journals => {
            props.onSaveJournal(journals)
            setJournals(journals)
        })
    }, [])

    useEffect(() => {
        setJournals(props.journalReducer.journals)
    }, [props.journalReducer])

    const journalPressHandler = (journal) => {
        props.navigation.navigate("JournalDetail", {
            journal: journal,
        })
    }

    const journalDateSplit = (journalDate) => {
        let simplifiedDate = journalDate.split("T")

        return simplifiedDate[0]
    }

    const searchBarHandler = searchMessage => {
        setSearchMessage(searchMessage);
    }

    const onAddJournalPressHandler = () => {
        props.navigation.navigate("JournalAdd")
    }


    return (
        <Fragment>
                <View style={styles.container}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        <View style={styles.itemContainer}> 
                            {journals && journals.filter(journal => {
                                //Return journal that include search message or all journals when search message is empty
                                return journal.title.includes(searchMessage) || (searchMessage === "")
                            }).map(journal => {
                                //Afterward map it out as component
                                return (
                                    <TouchableOpacity 
                                        key={journal._id}
                                        style={styles.journalContainer}
                                        onPress={() => {journalPressHandler(journal)}}
                                    >
                                        <Journal 
                                            date={journalDateSplit(journal.createdAt)}
                                            title={journal.title}
                                            mood={journal.mood}
                                        />
                                    </TouchableOpacity>  
                                )
                            })
                            }
                            {/* journals.map(journal => {
                                
                            }) */}
                        </View>
                    </ScrollView>
                    <View style={styles.searchBarContainer}>
                        <SearchBar
                            containerStyle={styles.searchBarOuter}
                            placeholder="Search Journal..."
                            onChangeText={text => searchBarHandler(text)}
                            value={searchMessage}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => onAddJournalPressHandler()}
                            style={styles.roundButton}
                        >
                            <Text style={{fontSize: 40, color: "#86939e"}}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        </Fragment>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#87cefa',
    },
    searchBarContainer: {
        position: "absolute",
        top: 0,
        marginTop: "5%",
        width: "100%",
    },
    searchBarOuter: {
        backgroundColor: "#87cefa",
        borderColor: "#87cefa",
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    buttonContainer: {
        position: "absolute",
        bottom: 10,
        right: "46%",
        marginTop: "5%",
        width: "10%",
    },
    roundButton: {
        alignItems: "center",
        backgroundColor: '#303337',
        borderRadius: 100,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },  
    scrollView: {
        marginTop: "0%",
    },
    itemContainer: {
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
    loginReducer: state.loginReducer,
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
