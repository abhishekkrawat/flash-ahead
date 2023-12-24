import { IconButton } from '@chakra-ui/button';
import Navbar from '../components/NavigationBar/Navbar';
import { Plus } from 'react-feather';
import { Text, Flex, Box } from '@chakra-ui/react';

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Flex direction={'column'} marginLeft={'10'} marginTop={'14'} p={2} gap={10}>
        <Box>
          <Text fontSize={'2xl'} fontFamily={'cursive'}>
            Hi, Abhishek Rawat
          </Text>
          <IconButton minW={'xs'} minH={'xs'}>
            <Plus size={'60px'} />
          </IconButton>
        </Box>
        <Box>
          <Text fontSize={'2xl'}>Recently added</Text>
          <Flex direction={'row'} justifyContent={'space-between'}>
            <Box boxSize={'xs'} bg={'gray'}></Box>
            <Box boxSize={'xs'} bg={'gray'}></Box>
            <Box boxSize={'xs'} bg={'gray'}></Box>
            <Box boxSize={'xs'} bg={'gray'}></Box>
            <Box boxSize={'xs'} bg={'gray'}></Box>
            <Box boxSize={'xs'} bg={'gray'}></Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
