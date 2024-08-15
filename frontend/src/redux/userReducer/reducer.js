import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "../actionType"

const initialState = {
    isLoading: false,
    isError: false,
    users: []
}


export const reducer = (state = initialState, { type, payload }) => {

    switch (type) {
        case USER_REQUEST: return { ...state, isLoading: true, isError: false }
        case USER_FAILURE: return { ...state, isError: true, isLoading: false }
        case USER_SUCCESS: return {
            ...state,
            isError: false,
            isLoading: false,
            users: payload
        }

        default: return state
    }
}
