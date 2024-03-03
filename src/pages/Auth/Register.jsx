import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  InputGroup,
  FormErrorMessage,
  Box,
  Flex,
  useColorModeValue,
  Heading,
  Button,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { supabase } from 'lib/supabaseClient';
import { Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

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

const Register = () => {
  return (
    <Flex
      h={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Create an account</Heading>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <RegisterForm />
        </Box>
        <Text textAlign='center'>
          Already have an account?
          <Link color='purple.400' href={'/login'}>
            {' '}
            Log in
          </Link>
        </Text>
      </Stack>
    </Flex>
  );
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string(),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be longer than 6 characters!').required('Required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const handleRegistration = async (values) => {
    try {
      await supabase.auth.signUp({
        options: {
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
          },
        },
        email: values.email,
        password: values.password,
      });

      navigate('/login');
      showToast(toast, {
        title: 'Account created!',
        description: "We've created an account for you",
        status: 'success',
      });
    } catch (error) {
      navigate('/register');
      showToast(toast, {
        title: 'Registration failed!',
        description: 'Unable to create an account',
        status: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={{ firstName: '', lastName: '', email: '', password: '', confirm_password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleRegistration}
    >
      {(props) => (
        <Form>
          <Stack spacing={4}>
            <Stack direction='row'>
              <Field name='firstName'>
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.firstName && form.touched.firstName}
                    isRequired
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input data-testid='first-name-label' type='text' {...field} />
                    <FormErrorMessage>{form.errors.firstName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name='lastName'>
                {({ field }) => (
                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input data-testid='last-name-label' type='text' {...field} />
                  </FormControl>
                )}
              </Field>
            </Stack>

            <Field name='email'>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email} isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input data-testid='register-email-label' type='email' {...field} />
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
                      data-testid='register-password-label'
                      type='password'
                      {...field}
                      autoComplete='off'
                    />
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name='confirm_password'>
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.confirm_password && form.touched.confirm_password}
                  isRequired
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    data-testid='register-confirm-password-label'
                    type='password'
                    {...field}
                    autoComplete='off'
                  />
                  <FormErrorMessage>{form.errors.confirm_password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              data-testid='register-button-label'
              type='submit'
              bg={'purple.400'}
              color={'white'}
              _hover={{
                bg: 'purple.700',
              }}
              isDisabled={!(props.isValid && props.dirty)}
            >
              Register
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
