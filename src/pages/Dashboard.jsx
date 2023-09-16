import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Grid,
  Flex,
} from '@chakra-ui/react';
import Navbar from '../components/NavigationBar/Navbar';

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Flex>
        <Text fontSize={'x-large'} marginTop={25} marginLeft={2}>
          Welcome, Abhishek
        </Text>
        <Box py={6} marginLeft={2}>
          <Box
            maxW={'320px'}
            w={'full'}
            bg={useColorModeValue('white', 'gray.900')}
            boxShadow={'2xl'}
            rounded={'lg'}
            p={6}
            textAlign={'center'}
          >
            <Avatar
              size={'xl'}
              src={'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg'}
              mb={4}
              pos={'relative'}
              _after={{
                content: '""',
                w: 4,
                h: 4,
                bg: 'green.300',
                border: '2px solid white',
                rounded: 'full',
                pos: 'absolute',
                bottom: 0,
                right: 3,
              }}
            />
            <Heading fontSize={'2xl'} fontFamily={'body'}>
              Abhishek Rawat
            </Heading>
            <Stack mt={8} direction={'row'} spacing={4}>
              <Button
                flex={1}
                fontSize={'sm'}
                rounded={'full'}
                bg={'blue.400'}
                color={'white'}
                boxShadow={
                  '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                }
                _hover={{
                  bg: 'blue.500',
                }}
                _focus={{
                  bg: 'blue.500',
                }}
              >
                Follow
              </Button>
            </Stack>
          </Box>
        </Box>
        <Text fontSize={'x-large'} marginLeft={2} marginTop={5}>
          Recently added
        </Text>
        <Grid templateColumns='repeat(4, 1fr)' gap={2} marginLeft={2}>
          <Box boxSize={'xs'} maxH={250} bg={'gray.200'} />
          <Box boxSize={'xs'} maxH={250} bg={'gray.200'} />
          <Box boxSize={'xs'} maxH={250} bg={'gray.200'} />
          <Box boxSize={'xs'} maxH={250} bg={'gray.200'} />
          <Box boxSize={'xs'} maxH={250} bg={'gray.200'} />
        </Grid>
      </Flex>
    </>
  );
};
