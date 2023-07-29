import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  // IconButton,
  Stack,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
// import { ChevronLeft, ChevronRight } from 'react-feather';
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
        <Grid h={10} templateColumns={'repeat(5, 1fr)'} justifyItems={'start'} columnGap={550}>
          <GridItem
            overflow='scroll'
            overflowX='hidden'
            bg={useColorModeValue('gray.50', 'gray.800')}
          >
            <VStack padding={2} spacing={4}>
              <Box
                w={{ base: '50px', md: '175px' }}
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
                w={{ base: '50px', md: '175px' }}
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
                w={{ base: '50px', md: '175px' }}
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
                w={{ base: '50px', md: '175px' }}
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
                w={{ base: '50px', md: '175px' }}
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
                w={{ base: '50px', md: '175px' }}
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

          <GridItem paddingY={100} gap={2} justifyContent={'center'}>
            {/* <IconButton
              w={{ base: '10px', md: '20px' }}
              h={{ base: '100px', md: '200px' }}
              icon={<ChevronLeft size={'md'} />}
              bg={useColorModeValue('gray.50', 'gray.800')}
            /> */}
            <Stack
              borderWidth='3px'
              borderRadius='xl'
              borderColor={'purple.400'}
              w={{ sm: '315px', md: '630px' }}
              height={{ sm: '15em', md: '25em' }}
              bg={useColorModeValue('white', 'purple.900')}
              boxShadow={'2xl'}
            >
              <Text align='center'>1/18</Text>
            </Stack>
            {/* <IconButton
              w={{ base: '10px', md: '20px' }}
              h={{ base: '100px', md: '200px' }}
              icon={<ChevronRight size={'md'} />}
              bg={useColorModeValue('gray.50', 'gray.800')}
            /> */}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
