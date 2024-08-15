import React, { useEffect, useState } from 'react';
import {
    Box, Heading, Text, Link, Stack, List, ListItem, Button, useToast, Modal, ModalOverlay, ModalContent,
    ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteResumeData, EditResumeData, getResumeData } from '../redux/productReducer/action';

const ResumeCard = ({ data }) => {
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(data.sections);
    const toast = useToast();
    const dispatch = useDispatch();
    const { isLoading, isError } = useSelector((state) => state.resumeReducer);

    const { personalInfo, education, projects, workExperience, skills, certifications } = data.sections;
    const { title } = data;
    const { _id } = data;

    useEffect(() => {
        if (hasSubmitted && !isError && !isLoading) {
            toast({
                title: 'Resume Data Deleted',
                status: 'success',
                isClosable: true,
                position: 'top',
            });
            setHasSubmitted(false);
            const token = localStorage.getItem('token');
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            dispatch(getResumeData(headers));
        }
    }, [isError, hasSubmitted, toast, isLoading, dispatch]);

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const headers = { headers: { Authorization: `Bearer ${token}` } };
        dispatch(deleteResumeData(_id, headers));
        setHasSubmitted(true);
    };

    const handleEdit = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e, section, index) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prevState => {
                const updatedSection = prevState[section].map((item, idx) =>
                    idx === index ? { ...item, [name]: value } : item
                );
                return { ...prevState, [section]: updatedSection };
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                personalInfo: {
                    ...prevState.personalInfo,
                    [name]: value
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = { headers: { Authorization: `Bearer ${token}` } };
            await dispatch(EditResumeData(formData, _id, headers));
            handleCloseModal();
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };


    return (
        <Box p={8} boxShadow="2xl" borderRadius="lg" bg="white" maxW="800px" mx="auto" mt={10}>
            <Heading as="h1" mb={4} fontSize="3xl" color="teal.500">{personalInfo.fullName}</Heading>

            <Box mb={6}>
                <Heading as="h2" size="md" mb={2} color="gray.700">{title}</Heading>
            </Box>

            <Box mb={6}>
                <Heading as="h2" size="md" mb={2} color="gray.700">Professional Summary</Heading>
                <Text fontSize="md" color="gray.600">{personalInfo.professionalSummary}</Text>
            </Box>

            <Stack spacing={3} mb={6}>
                <Text fontSize="md" color="gray.600">Phone: {personalInfo.phoneNumber}</Text>
                <Text fontSize="md" color="gray.600">Email: <Link href={`mailto:${personalInfo.email}`} color="teal.500">{personalInfo.email}</Link></Text>
                <Text fontSize="md" color="gray.600">Location: {personalInfo.location}</Text>
                <Text fontSize="md" color="gray.600">LinkedIn: <Link href={personalInfo.linkedIn} color="teal.500">{personalInfo.linkedIn}</Link></Text>
                <Text fontSize="md" color="gray.600">GitHub: <Link href={personalInfo.gitHub} color="teal.500">{personalInfo.gitHub}</Link></Text>
                <Text fontSize="md" color="gray.600">Portfolio: <Link href={personalInfo.portfolio} color="teal.500">{personalInfo.portfolio}</Link></Text>
            </Stack>

            {education.length > 0 && (
                <Box mb={6}>
                    <Heading as="h2" mt={8} mb={4} fontSize="2xl" color="gray.700">Education</Heading>
                    {education.map((edu, index) => (
                        <Box key={edu._id} mb={4}>
                            <Text fontWeight="bold" fontSize="lg" color="gray.700">{edu.instituteName}</Text>
                            <Text fontSize="md" color="gray.600">{edu.degree}</Text>
                            <Text fontSize="md" color="gray.600">{new Date(edu.startDate).toLocaleDateString()} - {new Date(edu.endDate).toLocaleDateString()}</Text>
                            <Text fontSize="md" color="gray.600">{edu.location}</Text>
                        </Box>
                    ))}
                </Box>
            )}

            {projects.length > 0 && (
                <Box mb={6}>
                    <Heading as="h2" mt={8} mb={4} fontSize="2xl" color="gray.700">Projects</Heading>
                    {projects.map((project, index) => (
                        <Box key={project._id} mb={4}>
                            <Text fontWeight="bold" fontSize="lg" color="gray.700">{project.projectTitle}</Text>
                            <Text fontSize="md" color="gray.600">{project.projectDescription}</Text>
                            {project.features.length > 0 && (
                                <List spacing={1} mb={2}>
                                    {project.features.map((feature, i) => (
                                        <ListItem key={i} fontSize="md" color="gray.600">{feature}</ListItem>
                                    ))}
                                </List>
                            )}
                            <Text fontSize="md" color="gray.600">Responsibilities: {project.areasOfResponsibility.join(', ')}</Text>
                            <Text fontSize="md" color="gray.600">Tech Stack: {project.techStack.join(', ')}</Text>
                            <Text fontSize="md" color="gray.600">Team Size: {project.teamSize}</Text>
                            <Text fontSize="md" color="teal.500">
                                GitHub: <Link href={project.gitHubURL}>{project.gitHubURL}</Link>
                            </Text>
                            <Text fontSize="md" color="teal.500">
                                Deployed URL: <Link href={project.deployedURL}>{project.deployedURL}</Link>
                            </Text>
                        </Box>
                    ))}
                </Box>
            )}

            {workExperience.length > 0 && (
                <Box mb={6}>
                    <Heading as="h2" mt={8} mb={4} fontSize="2xl" color="gray.700">Work Experience</Heading>
                    {workExperience.map((work, index) => (
                        <Box key={work._id} mb={4}>
                            <Text fontWeight="bold" fontSize="lg" color="gray.700">{work.jobTitle} at {work.organizationalName}</Text>
                            <Text fontSize="md" color="gray.600">{new Date(work.startDate).toLocaleDateString()} - {work.endDate ? new Date(work.endDate).toLocaleDateString() : 'Present'}</Text>
                            <Text fontSize="md" color="gray.600">{work.areasOfResponsibility.join(', ')}</Text>
                            <Text fontSize="md" color="teal.500">Company Website: <Link href={work.companyWebsite}>{work.companyWebsite}</Link></Text>
                        </Box>
                    ))}
                </Box>
            )}

            {skills.length > 0 && (
                <Box mb={6}>
                    <Heading as="h2" mt={8} mb={4} fontSize="2xl" color="gray.700">Skills</Heading>
                    <List spacing={1}>
                        {skills.map((skill, index) => (
                            <ListItem key={index} fontSize="md" color="gray.600">{skill}</ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {certifications.length > 0 && (
                <Box mb={6}>
                    <Heading as="h2" mt={8} mb={4} fontSize="2xl" color="gray.700">Certifications</Heading>
                    {certifications.map((cert, index) => (
                        <Box key={cert._id} mb={4}>
                            <Text fontWeight="bold" fontSize="lg" color="gray.700">{cert.certificateName}</Text>
                            <Text fontSize="md" color="gray.600">Issued by: {cert.issuingOrganization}</Text>
                            <Text fontSize="md" color="teal.500">
                                Certificate URL: <Link href={cert.certificateURL}>{cert.certificateURL}</Link>
                            </Text>
                        </Box>
                    ))}
                </Box>
            )}

            <Box textAlign="center" mt={8}>
                <Button variant="outline" colorScheme="teal" mr={3} onClick={handleEdit}>Edit Resume</Button>
                <Button colorScheme="red" onClick={handleDelete}>Delete Resume</Button>
            </Box>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Resume</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleSubmit}>
                            <FormControl id="fullName" mb={4}>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    name="fullName"
                                    value={formData.personalInfo.fullName}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl id="professionalSummary" mb={4}>
                                <FormLabel>Professional Summary</FormLabel>
                                <Textarea
                                    name="professionalSummary"
                                    value={formData.personalInfo.professionalSummary}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl id="phoneNumber" mb={4}>
                                <FormLabel>Phone Number</FormLabel>
                                <Input
                                    name="phoneNumber"
                                    value={formData.personalInfo.phoneNumber}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl id="email" mb={4}>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    name="email"
                                    value={formData.personalInfo.email}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl id="linkedIn" mb={4}>
                                <FormLabel>LinkedIn</FormLabel>
                                <Input
                                    name="linkedIn"
                                    value={formData.personalInfo.linkedIn}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl id="gitHub" mb={4}>
                                <FormLabel>GitHub</FormLabel>
                                <Input
                                    name="gitHub"
                                    value={formData.personalInfo.gitHub}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>
                            <FormControl id="portfolio" mb={4}>
                                <FormLabel>Portfolio</FormLabel>
                                <Input
                                    name="portfolio"
                                    value={formData.personalInfo.portfolio}
                                    onChange={(e) => handleChange(e)}
                                />
                            </FormControl>

                            {education.map((edu, index) => (
                                <Box key={edu._id} mb={4}>
                                    <FormControl id={`instituteName-${index}`} mb={4}>
                                        <FormLabel>Institute Name</FormLabel>
                                        <Input
                                            name="instituteName"
                                            value={edu.instituteName}
                                            onChange={(e) => handleChange(e, 'education', index)}
                                        />
                                    </FormControl>
                                    <FormControl id={`degree-${index}`} mb={4}>
                                        <FormLabel>Degree</FormLabel>
                                        <Input
                                            name="degree"
                                            value={edu.degree}
                                            onChange={(e) => handleChange(e, 'education', index)}
                                        />
                                    </FormControl>
                                    <FormControl id={`location-${index}`} mb={4}>
                                        <FormLabel>Location</FormLabel>
                                        <Input
                                            name="location"
                                            value={edu.location}
                                            onChange={(e) => handleChange(e, 'education', index)}
                                        />
                                    </FormControl>
                                </Box>
                            ))}
                            <Button colorScheme="teal" type="submit">Save Changes</Button>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="outline" colorScheme="red" onClick={handleCloseModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ResumeCard;
