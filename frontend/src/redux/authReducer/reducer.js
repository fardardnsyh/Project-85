import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, } from "../actionType"

const initialState = {
    isLoading: false,
    isError: false,
    isAuth: false,
    token: "",
}


export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST: return { ...state, isLoading: true }
        case LOGIN_FAILURE: return { ...state, isError: true, isLoading: false }
        case LOGIN_SUCCESS: return { ...state, isError: false, isLoading: false, token: payload, isAuth: true }
        default: return state
    }
}