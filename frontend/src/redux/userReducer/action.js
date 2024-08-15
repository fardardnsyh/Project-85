import { USER_FAILURE, USER_REQUEST, USER_SUCCESS } from "../actionType";
import axios from "axios";

const userRequestAction = () => {
    return { type: USER_REQUEST }
}

const userSuccessAction = (payload) => {
    return { type: USER_SUCCESS, payload }
}

const userFailureAction = () => {
    return { type: USER_FAILURE }
}



// Register/signup
export const addUser = (payload) => (dispatch) => {
    dispatch(userRequestAction());
    axios.post("https://swanirbhar-backend-4v6f.onrender.com/auth/register/", payload)
        .then((res) => {
            console.log('res:', res.data);
            dispatch(userSuccessAction());
        })
        .catch((err) => {
            dispatch(userFailureAction());
            console.log('err:', err);
        })
}