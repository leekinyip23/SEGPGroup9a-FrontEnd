import * as ACTION_TYPES from '../action_types/login';

const initialState = {
    name: "",
    password: "",
    userId: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                name: action.name,
                password: action.password,
                userId: action.userId,
            };
        case ACTION_TYPES.CLEAR_ACCOUNT:
            return {
                ...state,
                name: "",
                password: "",
                userId: "",
            }
        default: return state;
    }
}