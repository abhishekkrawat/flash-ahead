import { useState } from 'react';
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
} from '@chakra-ui/react';
import { Eye, EyeOff } from 'react-feather';
import { supabase } from '../supabaseClient';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';

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

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be longer than 6 characters!').required('Required'),
  });

  const handleLogin = async (values) => {
    try {
      await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
};

export default Login;
