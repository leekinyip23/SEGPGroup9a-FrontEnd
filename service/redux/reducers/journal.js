import * as ACTION_TYPES from '../action_types/journal';

const initialState = {
    journals: []
}

export default (state = initialState, action) => {
    let newJournals = JSON.parse(JSON.stringify(state.journals))
    switch(action.type) {
        case ACTION_TYPES.SAVE_JOURNAL:
            return {
                ...state,
                journals: action.newJournals
            }
        case ACTION_TYPES.UPDATE_JOURNAL:
            
            newJournals.map((journal, index) => {
                if(journal._id === action.newJournalEntryData._id) {
                    newJournals[index] = action.newJournalEntryData;
                }
                return null;
            })

            return {
                ...state,
                journals: newJournals,
            }
        case ACTION_TYPES.ADD_JOURNAL:
            newJournals = [...newJournals, action.newJournal]
            return {
                ...state,
                journals: newJournals,
            }
        default: return state;
    }
}