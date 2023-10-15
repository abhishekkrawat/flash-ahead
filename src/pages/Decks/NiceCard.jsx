import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue } from '@chakra-ui/react';
import { data } from '../Decks/data';

export default function NiceCard({ name, date, subjectId }) {
  const subjectData = data.find((subject) => subject.subjectId === subjectId);

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'md'}
        borderWidth={'1px'}
        rounded={'md'}
        p={4}
        overflow={'hidden'}
      >
        <Box
          h={'210px'}
          bg={'gray.100'}
          mt={-4}
          mx={-4}
          mb={4}
          pos={'relative'}
          objectFit={'contain'}
          overflow={'hidden'}
        >
          <img src={subjectData?.image} alt='subject-image' />
        </Box>
        <Stack>
          <Text
            color={subjectData?.color}
            textTransform={'uppercase'}
            fontWeight={800}
            fontSize={'sm'}
            letterSpacing={1.1}
          >
            {subjectData.subjectName}
          </Text>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            noOfLines={1}
          >
            {name}
          </Heading>
          {/* <Text color={'gray.500'}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum.
          </Text> */}
        </Stack>
        <Stack mt={6} direction={'row'} spacing={2} align={'center'}>
          <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontSize={'sm'}>Abhishek Rawat</Text>
            <Text color={'gray.500'} fontSize={'xs'}>
              {new Date(date).toDateString()}
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
