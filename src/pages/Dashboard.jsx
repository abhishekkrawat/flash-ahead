import { IconButton } from '@chakra-ui/button';
import Navbar from '../components/NavigationBar/Navbar';
import { Plus } from 'react-feather';
import { Text, Flex, Box, GridItem } from '@chakra-ui/react';

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <Flex direction={'column'} marginLeft={'10'} marginTop={'20'} p={2} gap={'20'}>
        <Box gap={2}>
          <Text fontSize={'2xl'} fontFamily={'cursive'}>
            Hi, Abhishek Rawat
          </Text>
          <IconButton minW={'xs'} minH={'xs'}>
            <Plus size={'60px'} />
          </IconButton>
        </Box>
        <Box>
          <Text fontSize={'2xl'}>Recently added</Text>
          <GridItem rowSpan={2} colSpan={1}></GridItem>
        </Box>
      </Flex>
    </>
  );
};
