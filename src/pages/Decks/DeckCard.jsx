import { Box, Heading, Text, Flex, useColorModeValue, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { ArrowUpRight, Heart } from 'react-feather';
import { useNavigate } from 'react-router-dom';

/**
 * This component represents a single deckcard, which consists of the ability to
 * redirect to flashcard page by one click, and a like button on it to save the deckcard
 * @param name
 * @param flashcardCount
 * @param deckId
 * @returns
 */
export default function DeckCard({ name, flashcardCount, deckId }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

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
      _hover={{ boxShadow: useColorModeValue('8px 8px 0 lightgrey', '8px 8px 0 cyan') }}
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
        <Flex
          p={4}
          justifyContent={'space-between'}
          alignItems={'center'}
          roundedBottom={'sm'}
          cursor={'pointer'}
          w='full'
          onClick={() => navigate(`/flashcard/${deckId}`)}
        >
          <Text fontSize={'md'} fontWeight={'semibold'}>
            View cards
          </Text>
          <ArrowUpRight />
        </Flex>
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
