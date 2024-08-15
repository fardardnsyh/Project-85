import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { reducer as authReducer } from "./authReducer/reducer"
import { reducer as userReducer } from "./userReducer/reducer"
import { reducer as resumeReducer } from "./productReducer/reducer"

const rootReducer = combineReducers({
    authReducer,
    userReducer,
    resumeReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));