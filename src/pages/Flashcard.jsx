import {
  Box,
  Center,
  Container,
  Divider,
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
        py='40px'
        h={'92vh'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Grid h={10} templateColumns='repeat(3, 1fr)'>
          <GridItem
            overflow='scroll'
            overflowX='hidden'
            rowSpan={4}
            colSpan={2}
            bg={useColorModeValue('gray.50', 'gray.800')}
            borderRadius={15}
          >
            <VStack p={2} spacing={4} align='stretch'>
              <Box
                w='175px'
                h='110px'
                display={'flex'}
                flexDirection={'column'}
                bg={'white'}
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
                display={'flex'}
                flexDirection={'column'}
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
                display={'flex'}
                flexDirection={'column'}
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
                display={'flex'}
                flexDirection={'column'}
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
                display={'flex'}
                flexDirection={'column'}
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
                display={'flex'}
                flexDirection={'column'}
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
              <Center py={100} px={290} gap={10}>
                <IconButton
                  w={20}
                  h={200}
                  icon={<ChevronLeft size={'md'} />}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                />
                <Stack
                  borderWidth='3px'
                  borderRadius='xl'
                  borderColor={'purple.400'}
                  w={{ sm: '100%', md: '630px' }}
                  height={{ sm: '476px', md: '25rem' }}
                  bg={useColorModeValue('white', 'purple.900')}
                  boxShadow={'1xl'}
                >
                  <Text align='center'>0/18</Text>
                </Stack>
                <IconButton
                  w={20}
                  h={200}
                  icon={<ChevronRight size={'md'} />}
                  bg={useColorModeValue('gray.50', 'gray.800')}
                />
              </Center>
            </SimpleGrid>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};
