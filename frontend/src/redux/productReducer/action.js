import { DELETE_RESUME_DATA_SUCCESS, GET_RESUME_DATA_SUCCESS, PATCH_RESUME_DATA_SUCCESS, POST_RESUME_DATA_SUCCESS, RESUME_DATA_FAILURE, RESUME_DATA_REQUEST } from "../actionType"
import axios from "axios";



const resumeDataRequestAction = () => {
    return { type: RESUME_DATA_REQUEST }
}


const resumeDataFailureAction = () => {
    return { type: RESUME_DATA_FAILURE }
}

const postResumeDataSuccessAction = () => {
    return { type: POST_RESUME_DATA_SUCCESS }
}


const getResumeDataSuccessAction = (payload) => {
    return { type: GET_RESUME_DATA_SUCCESS, payload }
}


const editResumeDataSuccessAction = () => {
    return { type: PATCH_RESUME_DATA_SUCCESS }
}

const deleteResumeDataSuccessAction = () => {
    return { type: DELETE_RESUME_DATA_SUCCESS }
}



// Add resume
export const addResumedata = (payload, headers) => (dispatch) => {
    dispatch(resumeDataRequestAction());
    axios.post("https://swanirbhar-backend-4v6f.onrender.com/resumes/", payload, headers)
        .then((res) => {
            console.log('res:', res);
            dispatch(postResumeDataSuccessAction());

        })
        .catch((err) => {
            console.log('err:', err);
            dispatch(resumeDataFailureAction());
        })
};

// getResume
export const getResumeData = (headers) => (dispatch) => {
    dispatch(resumeDataRequestAction());
    axios.get(`https://swanirbhar-backend-4v6f.onrender.com/resumes`, headers)
        .then((res) => {
            console.log('res:', res.data);
            dispatch(getResumeDataSuccessAction(res.data));
        })
        .catch((err) => {
            console.log('err:', err);
            dispatch(resumeDataFailureAction());
        })
};

// Delete Resume
export const deleteResumeData = (id, headers) => (dispatch) => {
    dispatch(resumeDataRequestAction());
    axios.delete(`https://swanirbhar-backend-4v6f.onrender.com/resumes/${id}`, headers)
        .then((res) => {
            console.log('res:', res.data);
            dispatch(deleteResumeDataSuccessAction());
        })
        .catch((err) => {
            console.log('err:', err);
            dispatch(resumeDataFailureAction());
        })
};

// Edit Resume
export const EditResumeData = (payload, id, headers) => (dispatch) => {
    dispatch(resumeDataRequestAction());
    return axios.put(`https://swanirbhar-backend-4v6f.onrender.com/resumes/${id}`, payload, headers)
        .then((res) => {
            console.log('res:', res.data);
            dispatch((editResumeDataSuccessAction()));
        })
        .catch((err) => {
            console.log('err:', err);
            dispatch(resumeDataFailureAction());
        })
};






