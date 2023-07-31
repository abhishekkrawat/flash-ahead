import { Box, Divider, Flex, Text, SimpleGrid, GridItem, IconButton } from '@chakra-ui/react';
import { ChevronRight, ChevronLeft } from 'react-feather';
import Navbar from '../components/NavigationBar/Navbar';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useEffect } from 'react';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);

  const handleNext = () => {
    if (selected !== null && selected < flashcards.length - 1) {
      setSelected((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (selected !== null && selected > 0) {
      setSelected((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

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

  const handleSelected = (index) => {
    setSelected(index);
    setIsFlipped(false); // reset card to the question face when selecting
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
          {flashcards.map((flashcard, index) => (
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
                cursor={'pointer'}
                onClick={() => handleSelected(index)}
              >
                <Text key={flashcard.flashcard_id} align={'center'} noOfLines={3}>
                  {flashcard.flashcard_front}
                </Text>
              </GridItem>
              <Divider />
            </>
          ))}
        </SimpleGrid>
        <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={10}>
          <IconButton
            _hover={{ bg: 'none' }}
            cursor={'pointer'}
            w={'5%'}
            h={'10%'}
            onClick={handlePrevious}
            isDisabled={selected === null || selected === 0}
          >
            <ChevronLeft size={'100px'} />
          </IconButton>
          <Box
            width={700}
            height={400}
            bg='white'
            fontSize={'4xl'}
            display={'flex'}
            flexDirection={'column'}
            borderRadius='xl'
            boxShadow='2xl'
            cursor='pointer'
            onClick={handleFlip}
            perspective='1000px'
            transition='transform 0.6s ease'
            transform={isFlipped ? 'rotateY(180deg) ScaleX(-1)' : 'rotateY(0)'}
          >
            <Box
              display={'flex'}
              justifyContent={'center'}
              bg={'purple.100'}
              fontSize={'lg'}
              borderTopRadius={'xl'}
            >
              <Text>
                Question {selected + 1} of {flashcards.length}
              </Text>
            </Box>
            <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              {selected !== null && flashcards.length > 0 && (
                <Text align={'center'} key={flashcards[selected].flashcard_id}>
                  {isFlipped
                    ? flashcards[selected].flashcard_back
                    : flashcards[selected].flashcard_front}
                </Text>
              )}
            </Box>
          </Box>
          <IconButton
            _hover={{ bg: 'none' }}
            w={'5%'}
            h={'10%'}
            onClick={handleNext}
            isDisabled={selected === null || selected === flashcards.length - 1}
          >
            <ChevronRight size={'100px'} />
          </IconButton>
        </Box>
      </Flex>
    </>
  );
};
