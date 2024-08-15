import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getResumeData } from '../redux/productReducer/action';
import ResumeCard from '../components/ResumeCard';
import DeletedResume from '../components/DeletedResume';

const ResumePage = () => {
    const resumeData = useSelector((store) => store.resumeReducer.resumeData);
    const isLoading = useSelector((store) => store.resumeReducer.isLoading);
    const isError = useSelector((store) => store.resumeReducer.isError);
    const dispatch = useDispatch();

  


    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        dispatch(getResumeData(headers));
    }, [dispatch]);

    return (

        <Box>
            {resumeData.length > 0 ? (
                <Box>
                    {resumeData && resumeData.map(resume => (
                        <ResumeCard key={resume._id} data={resume} isLoading={isLoading} isError={isError} />
                    ))}
                </Box>
            ) : (
                <DeletedResume />
            )}
        </Box>

    )
}

export default ResumePage