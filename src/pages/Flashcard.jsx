import {
  Box,
  Center,
  Container,
  Divider,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../components/NavigationBar/Navbar';

export const Flashcard = () => {
  return (
    <>
      <Navbar />
      <Container as='section' maxW='9xl' py='40px'>
        <Grid templateColumns='repeat(3, 1fr)'>
          <GridItem colStart={1}>
            <VStack p={3} spacing={8} align='stretch'>
              <Box w='200px' h='100px' display={'flex'} flexDirection={'column'} bg={'purple.100'}>
                <Text align='center'>1/18</Text>
              </Box>
              <Divider />
              <Box w='200px' h='100px' display={'flex'} flexDirection={'column'} bg={'purple.100'}>
                <Text align='center'>2/18</Text>
              </Box>
              <Divider />
              <Box w='200px' h='100px' display={'flex'} flexDirection={'column'} bg={'purple.100'}>
                <Text align='center'>3/18</Text>
              </Box>
              <Divider />
              <Box w='200px' h='100px' display={'flex'} flexDirection={'column'} bg={'purple.100'}>
                <Text align='center'>4/18</Text>
              </Box>
            </VStack>
          </GridItem>
          <GridItem colSpan={1}>
            <SimpleGrid display={'flex'} alignContent={'center'} justifyContent={'center'}>
              <Center py={100} px={400}>
                <Stack
                  borderWidth='2px'
                  borderRadius='xl'
                  borderColor={'purple.400'}
                  w={{ sm: '100%', md: '630px' }}
                  height={{ sm: '476px', md: '25rem' }}
                  bg={useColorModeValue('white', 'purple.900')}
                  boxShadow={'2xl'}
                ></Stack>
              </Center>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
