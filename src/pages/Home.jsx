import { Box, Heading, Container, Text, Button, Stack } from '@chakra-ui/react';
import Navbar from '../components/NavigationBar/Navbar';
import { Features } from './Features';

const Home = () => {
  return (
    <>
      <Navbar />
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 20 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '7xl' }}
            lineHeight={'110%'}
          >
            Unlock Your Learning Potential <br />
            <Text as={'span'} color={'purple'}>
              with your Flashcards
            </Text>
          </Heading>
          <Text color={'gray.500'}>A Smarter Way to Study, Anytime, Anywhere</Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}
          >
            <Button
              as={'a'}
              href='/decks'
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}
            >
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Features />
    </>
  );
};

export default Home;
