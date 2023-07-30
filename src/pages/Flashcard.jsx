import {
  Box,
  Divider,
  // IconButton,
  Flex,
  Text,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
// import { ChevronLeft, ChevronRight } from 'react-feather';
import Navbar from '../components/NavigationBar/Navbar';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useEffect } from 'react';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);

  const getFlashcards = async () => {
    const { data, error } = await supabase.rpc('get_flashcards', { topicid: 1, subjectid: 1 });

    if (error) {
      throw new Error(error);
    }

    setFlashcards(data);
  };

  useEffect(() => {
    getFlashcards();
  }, []);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <Flex pos={'fixed'} w={'100%'} bg={'gray.100'}>
        <SimpleGrid
          h={'100vh'}
          overflow={'scroll'}
          // to hide scrollbar
          css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
          }}
        >
          {flashcards.map((flashcard) => (
            <>
              <GridItem
                w={{ base: '50px', md: '175px', lg: '200px' }}
                minH='120px'
                bg='white'
                marginY={'10px'}
                marginX={'20px'}
                borderRadius='10px'
                borderWidth='2px'
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Text key={flashcard.flashcard_id} align={'center'} noOfLines={3}>
                  {flashcard.flashcard_front}
                </Text>
              </GridItem>
              <Divider />
            </>
          ))}
        </SimpleGrid>
        <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Box
            width={600}
            height={400}
            maxWidth='lg'
            bg='white'
            borderRadius='xl'
            boxShadow='2xl'
            cursor='pointer'
            onClick={handleFlip}
            perspective='1000px'
            transition='transform 0.6s ease'
            transform={isFlipped ? 'rotateY(180deg) ScaleX(-1)' : 'rotateY(0)'}
          >
            {flashcards.map((front) => (
              <Text key={front.flashcard_id}>
                {isFlipped ? front.flashcard_back : front.flashcard_front}
              </Text>
            ))}
          </Box>
        </Box>
      </Flex>
    </>
  );
};
