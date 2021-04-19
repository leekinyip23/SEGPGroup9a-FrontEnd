import * as ACTION_TYPES from '../action_types/account';

const initialState = {
    editAccount: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.SAVE_EDIT:
            return {
                ...state,
                editAccount: action.neweditAccount
            }
        case ACTION_TYPES.UPDATE_EDIT:
            let neweditAccount = JSON.parse(JSON.stringify(state.editAccount))
            neweditAccount.map((account, index) => {
                if(account.userId === action.neweditAccountEntryData.userId) {
                    neweditAccount[index] = action.neweditAccountEntryData;
                }
                return null;
            })
            return {
                ...state,
                editAccount: neweditAccount,
            }
          
        default: return state;
    }
}