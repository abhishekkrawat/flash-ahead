import {
  Box,
  Divider,
  // IconButton,
  Flex,
  Text,
  VStack,
  useColorModeValue,
  Center,
} from '@chakra-ui/react';
// import { ChevronLeft, ChevronRight } from 'react-feather';
import Navbar from '../components/NavigationBar/Navbar';

export const Flashcard = () => {
  return (
    <>
      <Navbar />
      <Flex minH='100vh'>
        <VStack
          padding={3}
          gap={1}
          display={'flex'}
          justifyContent={'space-between'}
          bg={'gray.100'}
          overflow={'scroll'}
          overflowX={'hidden'}
        >
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
        <Box
          display={'flex'}
          flex={1}
          alignItems={'center'}
          justifyContent={'center'}
          bg={'gray.100'}
        >
          <Center h={100}>
            <Box
              minW={600}
              minH={400}
              maxW={'lg'}
              w={'100%'}
              h={'100%'}
              bg={useColorModeValue('white', 'purple.900')}
              borderWidth={'3px'}
              borderRadius={'xl'}
              borderColor={'purple.400'}
              boxShadow={'2xl'}
            >
              <Text>1/18</Text>
            </Box>
          </Center>
        </Box>

        {/* <GridItem paddingY={100} gap={2} justifyContent={'center'}> 
           <IconButton
              w={{ base: '10px', md: '20px' }}
              h={{ base: '100px', md: '200px' }}
              icon={<ChevronLeft size={'md'} />}
              bg={useColorModeValue('gray.50', 'gray.800')}
            /> */}
        {/* <Stack 
            borderWidth='3px'
            borderRadius='xl'
            borderColor={'purple.400'}
            w={{ sm: '315px', md: '630px' }}
            height={{ sm: '15em', md: '25em' }}
            bg={useColorModeValue('white', 'purple.900')}
            boxShadow={'2xl'}
          >
            <Text align='center'>1/18</Text>
          </Stack> */}
        {/* <IconButton
              w={{ base: '10px', md: '20px' }}
              h={{ base: '100px', md: '200px' }}
              icon={<ChevronRight size={'md'} />}
              bg={useColorModeValue('gray.50', 'gray.800')}
            /> 
         </GridItem> */}
      </Flex>
    </>
  );
};
