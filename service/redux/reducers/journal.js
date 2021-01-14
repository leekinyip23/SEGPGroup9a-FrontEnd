import * as ACTION_TYPES from '../action_types/journal';

const initialState = {
    journals: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.SAVE_JOURNAL:
            return {
                ...state,
                journals: action.newJournals
            }
        case ACTION_TYPES.UPDATE_JOURNAL:
            let newJournals = JSON.parse(JSON.stringify(state.journals))
            newJournals.map((journal, index) => {
                if(journal.journal_id === action.newJournalEntryData.journal_id) {
                    newJournals[index] = action.newJournalEntryData;
                }
                return null;
            })
            return {
                ...state,
                journals: newJournals,
            }
        default: return state;
    }
}