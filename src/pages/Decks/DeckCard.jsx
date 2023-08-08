import {
  Box,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  HStack,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowUpRight, Heart } from 'react-feather';

export default function DeckCard({ name, flashcardCount }) {
  const [liked, setLiked] = useState(false);

  return (
    <Box
      w='xs'
      rounded={'sm'}
      my={5}
      mx={[0, 5]}
      overflow={'hidden'}
      bg='white'
      border={'1px'}
      borderColor='black'
      boxShadow={useColorModeValue('6px 6px 0 lightgrey', '6px 6px 0 cyan')}
    >
      <Box p={4}>
        <Box bg='black' display={'inline-block'} px={2} py={1} color='white' mb={4}>
          <Text fontSize={'xs'} fontWeight='medium'>
            {flashcardCount !== 1 ? `${flashcardCount} cards` : `${flashcardCount} card`}
          </Text>
        </Box>
        <Heading color={'black'} fontSize={'2xl'} noOfLines={1}>
          {name}
        </Heading>
        <Text color={'gray.500'} noOfLines={2}>
          In this post, we will give an overview of what is new in React 18, and what it means for
          the future.
        </Text>
      </Box>
      <HStack borderTop={'1px'} color='black'>
        <LinkBox
          p={4}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          roundedBottom={'sm'}
          cursor={'pointer'}
          w='full'
        >
          <Text fontSize={'md'} fontWeight={'semibold'}>
            <LinkOverlay href='/flashcard'>View cards</LinkOverlay>
          </Text>
          <ArrowUpRight />
        </LinkBox>
        <Flex
          p={4}
          alignItems='center'
          justifyContent={'space-between'}
          roundedBottom={'sm'}
          borderLeft={'1px'}
          cursor='pointer'
          onClick={() => setLiked(!liked)}
        >
          {liked ? <Heart fill='red' fontSize={'24px'} /> : <Heart fontSize={'24px'} />}
        </Flex>
      </HStack>
    </Box>
  );
}
