import * as ACTION_TYPES from '../action_types/login';

const initialState = {
    name: "",
    password: "",
    nickname: "",
    age: "",
    gender: "",
    location: "",
    userId: "",
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.LOGIN:
            return {
                ...state,
                name: action.name,
                password: action.password,
                nickname: action.nickname,
                age: action.age,
                gender: action.gender,
                location: action.location,
                userId: action.userId,
            };
        case ACTION_TYPES.CLEAR_ACCOUNT:
            return {
                ...state,
                name: "",
                password: "",
                nickname: "",
                age: "",
                gender: "",
                location: "",
                userId: "",
            }
        default: return state;
    }
}