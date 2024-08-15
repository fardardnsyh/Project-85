import { DELETE_RESUME_DATA_SUCCESS, GET_RESUME_DATA_SUCCESS, PATCH_RESUME_DATA_SUCCESS, POST_RESUME_DATA_SUCCESS, RESUME_DATA_FAILURE, RESUME_DATA_REQUEST } from "../actionType"

const initialState = {
    isLoading: false,
    isError: false,
    resumeData: []
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case RESUME_DATA_REQUEST: return { ...state, isLoading: true }
        case RESUME_DATA_FAILURE: return { ...state, isLoading: false, isError: true }
        case POST_RESUME_DATA_SUCCESS: return { ...state, isLoading: false, isError: false }
        case GET_RESUME_DATA_SUCCESS: return { ...state, isLoading: false, isError: false, resumeData: payload }
        case DELETE_RESUME_DATA_SUCCESS: return { ...state, isLoading: false, isError: false }
        case PATCH_RESUME_DATA_SUCCESS: return { ...state, isLoading: false, isError: false }
        default: return state
    }
}