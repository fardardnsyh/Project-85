import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { addUser } from '../redux/userReducer/action';

const initialData = {
    username: "",
    email: "",
    password: ""
}

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [user, setUser] = useState(initialData);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const isError = useSelector((store) => store.userReducer.isError);
    const isLoading = useSelector((store) => store.userReducer.isLoading);
    const toast = useToast();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleAddUser = () => {
        setHasSubmitted(true);
        dispatch(addUser(user));
        setUser(initialData);
    }

    useEffect(() => {
        if (hasSubmitted && !isLoading) {
            if (isError) {
                toast({
                    title: `Register Failed`,
                    status: "error",
                    isClosable: true,
                    position: "top"
                });
            } else {
                toast({
                    title: `Register Successfully`,
                    status: "success",
                    isClosable: true,
                    position: "top"
                });

                navigate("/login");

            }
            setHasSubmitted(false);
        }
    }, [isError, isLoading, hasSubmitted, toast, navigate]);

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Create a Job-Ready Resume in Minutes. ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <HStack>
                            <Box>
                                <FormControl id="userName" isRequired>
                                    <FormLabel>User Name</FormLabel>
                                    <Input type="text" value={user.username} name="username" placeholder='Enter User Name' onChange={handleChange} />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="email" isRequired>
                                    <FormLabel>Email address</FormLabel>
                                    <Input type="email" value={user.email} name="email" placeholder='Enter Email' onChange={handleChange} />
                                </FormControl>
                            </Box>
                        </HStack>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={user.password} name="password" placeholder='Enter Password' onChange={handleChange} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                disabled={isLoading}
                                onClick={handleAddUser}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                {isLoading ? "Please Wait..." : "Signup"}
                            </Button>
                        </Stack>

                        <Stack pt={6}>
                            <Box display={"flex"} justifyContent={"center"} gap={"5px"}>
                                <Text>Already a user?</Text>
                                <Link to="/login">
                                    <Text color={"blue.400"}>Login</Text>
                                </Link>
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}
