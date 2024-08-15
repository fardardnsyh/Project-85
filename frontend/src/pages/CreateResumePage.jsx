import React, { useEffect, useState } from 'react';
import {
    ChakraProvider,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    SimpleGrid,
    GridItem,
    VStack,
    extendTheme,
    useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux"
import { addResumedata } from '../redux/productReducer/action';
import { useNavigate } from 'react-router-dom';
const theme = extendTheme({
    components: {
        Input: {
            defaultProps: {
                focusBorderColor: "teal.400"
            }
        }
    }
});


const initialData = {
    title: "Software Engineer",
    sections: {
        personalInfo: {
            fullName: "",
            professionalSummary: "",
            phoneNumber: "",
            email: "",
            linkedIn: "",
            gitHub: "",
            portfolio: "",
            location: ""
        },
        education: [
            {
                instituteName: "",
                degree: "",
                startDate: "",
                endDate: "",
                location: ""
            },
            {
                instituteName: "",
                degree: "",
                startDate: "",
                endDate: "",
                location: ""
            }
        ],
        projects: [
            {
                projectTitle: "",
                gitHubURL: "",
                deployedURL: "",
                teamSize: "",
                startDate: "",
                endDate: "",
                projectDescription: "",
                features: [""],
                areasOfResponsibility: [""],
                techStack: [""]
            },
            {
                projectTitle: "",
                gitHubURL: "",
                deployedURL: "",
                teamSize: "",
                startDate: "",
                endDate: "",
                projectDescription: "",
                features: [""],
                areasOfResponsibility: [""],
                techStack: [""]
            }
        ],
        workExperience: [
            {
                jobTitle: "",
                organizationalName: "",
                companyWebsite: "",
                startDate: "",
                endDate: "",
                areasOfResponsibility: [""]
            }
        ],
        skills: [""],
        certifications: [
            {
                certificateName: "",
                certificateURL: "",
                issuingOrganization: ""
            },
            {
                certificateName: "",
                certificateURL: "",
                issuingOrganization: ""
            }
        ]
    }
}

const CreateResumePage = () => {
    const [resumeData, setResumeData] = useState(initialData);
    const dispatch = useDispatch();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [clickGenerateResume, setClickGenerateResume] = useState(false);
    const isError = useSelector((store) => store.resumeReducer.isError);
    const isLoading = useSelector((store) => store.resumeReducer.isLoading);
    const toast = useToast();
    const navigate = useNavigate();


    const handleChange = (section, field, index, subIndex, e) => {
        const value = e.target.value;
        setResumeData(prevState => {
            if (subIndex !== undefined) {
                const updatedSubSection = [...prevState.sections[section][index][field]];
                updatedSubSection[subIndex] = value;

                return {
                    ...prevState,
                    sections: {
                        ...prevState.sections,
                        [section]: prevState.sections[section].map((item, i) =>
                            i === index ? { ...item, [field]: updatedSubSection } : item
                        )
                    }
                };
            }

            const updatedSection = Array.isArray(prevState.sections[section])
                ? prevState.sections[section].map((item, i) =>
                    i === index ? { ...item, [field]: value } : item
                )
                : { ...prevState.sections[section], [field]: value };

            return {
                ...prevState,
                sections: {
                    ...prevState.sections,
                    [section]: updatedSection
                }
            };
        });
    };

    const handleSkillsChange = (index, e) => {
        const value = e.target.value;
        setResumeData(prevState => {
            const updatedSkills = [...prevState.sections.skills];
            updatedSkills[index] = value;

            return {
                ...prevState,
                sections: {
                    ...prevState.sections,
                    skills: updatedSkills
                }
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        dispatch(addResumedata(resumeData, headers));
        setHasSubmitted(true);
        setClickGenerateResume(true);
    };

    const handleGenerateResume = () => {
        navigate("/resume");
    }


    useEffect(() => {
        if (hasSubmitted && !isLoading) {
            if (isError) {
                toast({
                    title: `Please Fill Personal Information`,
                    status: "error",
                    isClosable: true,
                    position: "top"
                });
            } else {
                toast({
                    title: `Resume Data Added Successfully.`,
                    status: "success",
                    isClosable: true,
                    position: "top"
                });
            }
            setHasSubmitted(false);
        }
    }, [isError, isLoading, hasSubmitted, toast, navigate]);



    return (
        <ChakraProvider theme={theme} bg="gray.50">
            <Box
                maxW="container.md"
                mx="auto"
                p={5}
                bg="#ffff"
                boxShadow="lg"
                borderRadius="md"
            >
                <Heading mb={5}>Resume Form</Heading>
                <form onSubmit={handleSubmit}>
                    <VStack spacing={5}>
                        <Heading size="md" mb={3}>Personal Info</Heading>
                        <SimpleGrid columns={2} spacing={5}>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={resumeData.sections.personalInfo.fullName}
                                        onChange={(e) => handleChange('personalInfo', 'fullName', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Professional Summary</FormLabel>
                                    <Textarea
                                        value={resumeData.sections.personalInfo.professionalSummary}
                                        onChange={(e) => handleChange('personalInfo', 'professionalSummary', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Phone Number</FormLabel>
                                    <Input
                                        type="text"
                                        value={resumeData.sections.personalInfo.phoneNumber}
                                        onChange={(e) => handleChange('personalInfo', 'phoneNumber', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        type="email"
                                        value={resumeData.sections.personalInfo.email}
                                        onChange={(e) => handleChange('personalInfo', 'email', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>LinkedIn</FormLabel>
                                    <Input
                                        type="url"
                                        value={resumeData.sections.personalInfo.linkedIn}
                                        onChange={(e) => handleChange('personalInfo', 'linkedIn', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>GitHub</FormLabel>
                                    <Input
                                        type="url"
                                        value={resumeData.sections.personalInfo.gitHub}
                                        onChange={(e) => handleChange('personalInfo', 'gitHub', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Portfolio</FormLabel>
                                    <Input
                                        type="url"
                                        value={resumeData.sections.personalInfo.portfolio}
                                        onChange={(e) => handleChange('personalInfo', 'portfolio', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Location</FormLabel>
                                    <Input
                                        type="text"
                                        value={resumeData.sections.personalInfo.location}
                                        onChange={(e) => handleChange('personalInfo', 'location', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                        <Heading size="md" mb={3}>Education</Heading>
                        <SimpleGrid columns={2} spacing={5}>
                            {resumeData.sections.education.map((education, index) => (
                                <React.Fragment key={index}>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>Institute Name</FormLabel>
                                            <Input
                                                type="text"
                                                value={education.instituteName}
                                                onChange={(e) => handleChange('education', 'instituteName', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>Degree</FormLabel>
                                            <Input
                                                type="text"
                                                value={education.degree}
                                                onChange={(e) => handleChange('education', 'degree', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>Start Date</FormLabel>
                                            <Input
                                                type="date"
                                                value={education.startDate}
                                                onChange={(e) => handleChange('education', 'startDate', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>End Date</FormLabel>
                                            <Input
                                                type="date"
                                                value={education.endDate}
                                                onChange={(e) => handleChange('education', 'endDate', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Location</FormLabel>
                                            <Input
                                                type="text"
                                                value={education.location}
                                                onChange={(e) => handleChange('education', 'location', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </React.Fragment>
                            ))}
                        </SimpleGrid>
                        <Heading size="md" mb={3}>Projects</Heading>
                        <SimpleGrid columns={2} spacing={5}>
                            {resumeData.sections.projects.map((project, index) => (
                                <React.Fragment key={index}>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Project Title</FormLabel>
                                            <Input
                                                type="text"
                                                value={project.projectTitle}
                                                onChange={(e) => handleChange('projects', 'projectTitle', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>GitHub URL</FormLabel>
                                            <Input
                                                type="url"
                                                value={project.gitHubURL}
                                                onChange={(e) => handleChange('projects', 'gitHubURL', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>Deployed URL</FormLabel>
                                            <Input
                                                type="url"
                                                value={project.deployedURL}
                                                onChange={(e) => handleChange('projects', 'deployedURL', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>Team Size</FormLabel>
                                            <Input
                                                type="number"
                                                value={project.teamSize}
                                                onChange={(e) => handleChange('projects', 'teamSize', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>Start Date</FormLabel>
                                            <Input
                                                type="date"
                                                value={project.startDate}
                                                onChange={(e) => handleChange('projects', 'startDate', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem>
                                        <FormControl>
                                            <FormLabel>End Date</FormLabel>
                                            <Input
                                                type="date"
                                                value={project.endDate}
                                                onChange={(e) => handleChange('projects', 'endDate', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Project Description</FormLabel>
                                            <Textarea
                                                value={project.projectDescription}
                                                onChange={(e) => handleChange('projects', 'projectDescription', index, undefined, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Features</FormLabel>
                                            <Input
                                                type="text"
                                                value={project.features.join(", ")}
                                                onChange={(e) => handleChange('projects', 'features', index, 0, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Areas of Responsibility</FormLabel>
                                            <Input
                                                type="text"
                                                value={project.areasOfResponsibility.join(", ")}
                                                onChange={(e) => handleChange('projects', 'areasOfResponsibility', index, 0, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormControl>
                                            <FormLabel>Tech Stack</FormLabel>
                                            <Input
                                                type="text"
                                                value={project.techStack.join(", ")}
                                                onChange={(e) => handleChange('projects', 'techStack', index, 0, e)}
                                            />
                                        </FormControl>
                                    </GridItem>
                                </React.Fragment>
                            ))}
                        </SimpleGrid>
                        <Heading size="md" mb={3}>Work Experience</Heading>
                        <SimpleGrid columns={2} spacing={5}>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Job Title</FormLabel>
                                    <Input
                                        type="text"
                                        value={resumeData.sections.workExperience[0].jobTitle}
                                        onChange={(e) => handleChange('workExperience', 'jobTitle', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Organizational Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={resumeData.sections.workExperience[0].organizationalName}
                                        onChange={(e) => handleChange('workExperience', 'organizationalName', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Company Website</FormLabel>
                                    <Input
                                        type="url"
                                        value={resumeData.sections.workExperience[0].companyWebsite}
                                        onChange={(e) => handleChange('workExperience', 'companyWebsite', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>Start Date</FormLabel>
                                    <Input
                                        type="date"
                                        value={resumeData.sections.workExperience[0].startDate}
                                        onChange={(e) => handleChange('workExperience', 'startDate', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem>
                                <FormControl>
                                    <FormLabel>End Date</FormLabel>
                                    <Input
                                        type="date"
                                        value={resumeData.sections.workExperience[0].endDate}
                                        onChange={(e) => handleChange('workExperience', 'endDate', 0, undefined, e)}
                                    />
                                </FormControl>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <FormControl>
                                    <FormLabel>Areas of Responsibility</FormLabel>
                                    <Input
                                        type="text"
                                        value={resumeData.sections.workExperience[0].areasOfResponsibility.join(", ")}
                                        onChange={(e) => handleChange('workExperience', 'areasOfResponsibility', 0, 0, e)}
                                    />
                                </FormControl>
                            </GridItem>
                        </SimpleGrid>
                        <Heading size="md" mb={3}>Skills</Heading>
                        <FormControl mb={3}>
                            <FormLabel>Skills</FormLabel>
                            <SimpleGrid columns={2} spacing={5}>
                                {resumeData.sections.skills.map((skill, index) => (
                                    <GridItem key={index} colSpan={2}>
                                        <Input
                                            type="text"
                                            value={skill}
                                            onChange={(e) => handleSkillsChange(index, e)}
                                        />
                                    </GridItem>
                                ))}
                            </SimpleGrid>
                        </FormControl>
                        <Heading size="md" mb={3}>Certifications</Heading>
                        {resumeData.sections.certifications.map((cert, index) => (
                            <SimpleGrid columns={2} spacing={5} key={index}>
                                <GridItem>
                                    <FormControl>
                                        <FormLabel>Certificate Name</FormLabel>
                                        <Input
                                            type="text"
                                            value={cert.certificateName}
                                            onChange={(e) => handleChange('certifications', 'certificateName', index, undefined, e)}
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem>
                                    <FormControl>
                                        <FormLabel>Certificate URL</FormLabel>
                                        <Input
                                            type="url"
                                            value={cert.certificateURL}
                                            onChange={(e) => handleChange('certifications', 'certificateURL', index, undefined, e)}
                                        />
                                    </FormControl>
                                </GridItem>
                                <GridItem colSpan={2}>
                                    <FormControl>
                                        <FormLabel>Issuing Organization</FormLabel>
                                        <Input
                                            type="text"
                                            value={cert.issuingOrganization}
                                            onChange={(e) => handleChange('certifications', 'issuingOrganization', index, undefined, e)}
                                        />
                                    </FormControl>
                                </GridItem>
                            </SimpleGrid>
                        ))}
                    </VStack>
                    <Button mt={6} colorScheme="teal" type="submit">Submit</Button>
                </form>
                <Button mt={6} colorScheme="teal" type="submit" isDisabled={!clickGenerateResume || isError} onClick={handleGenerateResume}>Generate Resume</Button>
            </Box>
        </ChakraProvider>
    );
};

export default CreateResumePage;
