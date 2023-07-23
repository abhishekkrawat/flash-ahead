import {
  Box,
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import Navbar from '../components/NavigationBar/Navbar';

export const Flashcard = () => {
  return (
    <>
      <Navbar />
      <Container
        as='section'
        maxW='9xl'
        py={{ base: '20px', md: '40px' }}
        minH='92vh'
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Flex justifyContent='flex-end'>
          <Grid h={10} templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(3, 1fr)']}>
            <GridItem
              position='relative'
              overflow='scroll'
              overflowX='hidden'
              colSpan='1'
              bg={useColorModeValue('gray.50', 'gray.800')}
              borderRadius='15'
              maxW='50%'
            >
              <VStack p={2} spacing={4} align='stretch' w='100%' minW='min-content'>
                <Box
                  w={{ base: '50px', md: '175px' }}
                  minW='12pxs'
                  h='110px'
                  bg='white'
                  borderRadius='10px'
                  borderWidth='2px'
                  borderColor='purple.400'
                >
                  <Text align='center'>1/18</Text>
                </Box>
                <Divider />
                <Box
                  w='175px'
                  h='110px'
                  bg={'white'}
                  borderRadius='10px'
                  borderWidth='2px'
                  borderColor='purple.400'
                >
                  <Text align='center'>2/18</Text>
                </Box>
                <Divider />
                <Box
                  w='175px'
                  h='110px'
                  bg={'white'}
                  borderRadius='10px'
                  borderWidth='2px'
                  borderColor='purple.400'
                >
                  <Text align='center'>3/18</Text>
                </Box>
                <Divider />
                <Box
                  w='175px'
                  h='110px'
                  bg={'white'}
                  borderRadius='10px'
                  borderWidth='2px'
                  borderColor='purple.400'
                >
                  <Text align='center'>4/18</Text>
                </Box>
                <Divider />
                <Box
                  w='175px'
                  h='110px'
                  bg={'white'}
                  borderRadius='10px'
                  borderWidth='2px'
                  borderColor='purple.400'
                >
                  <Text align='center'>5/18</Text>
                </Box>
                <Divider />
                <Box
                  w='175px'
                  h='110px'
                  bg={'white'}
                  borderRadius='10px'
                  borderWidth='2px'
                  borderColor='purple.400'
                >
                  <Text align='center'>6/18</Text>
                </Box>
              </VStack>
            </GridItem>
            <GridItem bg={useColorModeValue('gray.50', 'gray.800')}>
              <SimpleGrid>
                <Center py={100} gap={1}>
                  <IconButton
                    w={{ base: '10px', md: '20px' }}
                    h={{ base: '100px', md: '200px' }}
                    icon={<ChevronLeft size={'md'} />}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                  />
                  <Stack
                    borderWidth='3px'
                    borderRadius='xl'
                    borderColor={'purple.400'}
                    w={{ sm: '315px', md: '630px' }}
                    height={{ sm: '15em', md: '25em' }}
                    bg={useColorModeValue('white', 'purple.900')}
                    boxShadow={'1xl'}
                  >
                    <Text align='center'>1/18</Text>
                  </Stack>
                  <IconButton
                    w={{ base: '10px', md: '20px' }}
                    h={{ base: '100px', md: '200px' }}
                    icon={<ChevronRight size={'md'} />}
                    bg={useColorModeValue('gray.50', 'gray.800')}
                  />
                </Center>
              </SimpleGrid>
            </GridItem>
          </Grid>
        </Flex>
      </Container>
    </>
  );
};
