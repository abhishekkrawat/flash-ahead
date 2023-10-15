import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Spacer,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { data } from './data';
import { Eye, Heart } from 'react-feather';
import { useState } from 'react';

export const Card = ({ name, date, subjectId }) => {
  const subjectData = data.find((subject) => subject.subjectId === subjectId);
  const [liked, setLiked] = useState(false);

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
          <Flex>
            <Text
              color={`${subjectData?.color}.500`}
              textTransform={'uppercase'}
              fontWeight={800}
              fontSize={'sm'}
              letterSpacing={1.1}
            >
              {subjectData.subjectName}
            </Text>
            <Spacer />
            <Box cursor={'pointer'} onClick={() => setLiked(!liked)}>
              {liked ? (
                <Heart fill={subjectData.color} fontSize={'24px'} />
              ) : (
                <Heart fontSize={'24px'} />
              )}
            </Box>
          </Flex>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}
            noOfLines={1}
          >
            {name}
          </Heading>
        </Stack>
        <Stack flexWrap={'wrap'} mt={6} direction={'row'} spacing={2} alignItems={'center'}>
          <Avatar
            display={'inline-flex'}
            src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
          />
          <Stack display={'inline-flex'} direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontSize={'sm'}>Abhishek Rawat</Text>
            <Text color={'gray.500'} fontSize={'xs'}>
              {new Date(date).toDateString()}
            </Text>
          </Stack>
          <Spacer />
          <Box
            display={'inline-flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={1}
            mt={5}
          >
            <Icon color={'gray.500'} width='1rem' height='1rem' as={Eye} />
            <Text fontSize={'xs'} color='gray.500'>
              10
            </Text>
          </Box>
        </Stack>
      </Box>
    </Center>
  );
};
