import * as ACTION_TYPES from '../action_types/reducer';

const initialState = {
    name: "",
    password: "",
}

export default (state = initialState, action) => {
    switch(action.type) {
        case ACTION_TYPES.LOGIN: 
            return {
                ...state,
                name: action.name,
                password: action.password
            };
        case ACTION_TYPES.CLEAR_ACCOUNT:
            return {
                ...state,
                name: " ",
                password: " "
            }
        default: return state;
    }
}