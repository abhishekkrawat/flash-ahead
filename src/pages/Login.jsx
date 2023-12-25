import { useEffect, useState } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Icon,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'react-feather';
import { supabase } from '../supabaseClient';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  return (
    <Flex
      h={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Log in to your account</Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <LoginForm />
        </Box>
        <Text textAlign='center'>
          New to FlashAhead?
          <Link color='purple.400' href={'/register'}>
            {' '}
            Create an account
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};

const LoginForm = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [userStatus, setUserStatus] = useState(false);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setUserStatus(true);
    }
  };

  const showToast = (toast, options) => {
    return toast({
      title: options.title,
      description: options.description,
      status: options.status,
      duration: options.duration || 3000,
      isClosable: options.isClosable || true,
      position: options.position || 'top',
    });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be longer than 6 characters!').required('Required'),
  });

  const handleLogin = async (values) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      showToast(toast, {
        title: 'Login failed!',
        description: 'Incorrect username or password',
        status: 'error',
      });
    } else {
      navigate('/decks');
      showToast(toast, {
        title: 'Login successful!',
        description: 'Welcome to FlashAhead',
        status: 'success',
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (userStatus) {
    navigate('/decks');
  } else {
    return (
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {(props) => (
          <Form>
            <Stack spacing={4}>
              <Field name='email'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' {...field} />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name='password'>
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup size='md'>
                      <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        {...field}
                        autoComplete='off'
                      />
                      <InputRightElement h={'full'}>
                        <Button variant={'ghost'} onClick={() => setShow(!show)}>
                          {show ? <Icon as={EyeOff} /> : <Icon as={Eye} />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'purple'}>Forgot password?</Link>
                </Stack>
                <Button
                  type='submit'
                  bg={'purple.400'}
                  color={'white'}
                  _hover={{
                    bg: 'purple.700',
                  }}
                  isDisabled={!(props.isValid && props.dirty)}
                >
                  Log in
                </Button>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    );
  }
};

export default Login;
