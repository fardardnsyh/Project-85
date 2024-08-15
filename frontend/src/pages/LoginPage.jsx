import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authReducer/action';
import { useNavigate } from 'react-router-dom';

const initialData = {
  email: "",
  password: "",
}

export default function Login() {

  const [loginUser, setLoginUser] = useState(initialData);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((store) => store.authReducer.token);
  const isError = useSelector((store) => store.authReducer.isError);
  const isLoading = useSelector((store) => store.authReducer.isLoading);


  const toast = useToast();
  const navigate = useNavigate();



  const handleChnage = (e) => {

    const { name, value } = e.target;

    setLoginUser((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const hadleLogin = () => {
    dispatch(login(loginUser));
    setLoginUser(initialData);
    setHasSubmitted(true);
  }

  useEffect(() => {

    if (hasSubmitted && !isLoading) {

      if (isError) {
        toast({
          title: `Login Failed`,
          status: "error",
          isClosable: true,
          position: "top"
        });
      } else {
        toast({
          title: `Login Successfully`,
          status: "success",
          isClosable: true,
          position: "top"
        });

        navigate("/create-resume");
        localStorage.setItem("token", token);
      }
      setHasSubmitted(false);
    }

  }, [isError, isLoading, hasSubmitted, toast, navigate, token]);



  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Sign in to your account</Heading>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" name='email' placeholder={"Enter Email"} value={loginUser.email} onChange={handleChnage} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" name='password' placeholder={"Enter Password"} value={loginUser.password} onChange={handleChnage} />
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'}>Forgot password?</Text>
            </Stack>
            <Button colorScheme={'blue'} variant={'solid'} onClick={hadleLogin}>
              {isLoading ? "Please Wait..." : "Login"}
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://cdn.dribbble.com/userupload/7122630/file/original-aaa6eec728d8533562fcf8791fb99de6.jpg?resize=1024x768'
          }
        />
      </Flex>
    </Stack>
  )
}