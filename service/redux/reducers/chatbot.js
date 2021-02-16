import * as ACTION_TYPES from '../action_types/chatbot';

const initialState = {
    chatHistory: [],
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.UPDATE_CHATHISTORY:
            
            return {
                ...state
            }

        default: return state;
    }
}