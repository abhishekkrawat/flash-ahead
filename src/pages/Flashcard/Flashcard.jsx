import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { supabase } from 'lib/supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';
import { useParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'react-feather';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);
  const { deckId } = useParams();

  const handleNext = () => {
    if (0 <= selected < flashcards.length - 1) {
      setSelected((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (selected !== 0 && selected > 0) {
      setSelected((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const getFlashcards = async () => {
    const { data, error } = await supabase.rpc('get_flashcards', { topicid: deckId });

    if (error) {
      throw new Error(error);
    }

    setFlashcards(data);
  };

  useEffect(() => {
    getFlashcards();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Flex pos={'fixed'} w={'100%'} bg={'gray.100'}>
        <Slides
          onSelected={(index) => {
            setSelected(index);
            setIsFlipped(false); // reset card to the question face when selecting
          }}
          flashcards={flashcards}
          selected={selected}
        />
        <Box
          flex={1}
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={12}
          flexDirection={'column'}
        >
          <Card
            content={
              flashcards.length && {
                back: flashcards[selected].flashcard_back,
                front: flashcards[selected].flashcard_front,
              }
            }
            isFlipped={isFlipped}
            handleFlip={() => setIsFlipped((prev) => !prev)}
          />
          <Box gap={10} display={'flex'} flexDirection={'row'}>
            <IconButton
              _hover={{ bg: 'none' }}
              cursor={'pointer'}
              onClick={handlePrevious}
              isDisabled={selected === 0}
            >
              <ChevronLeft />
            </IconButton>
            <Text fontSize={'2xl'}>{selected + 1}</Text>
            <IconButton
              _hover={{ bg: 'none' }}
              onClick={handleNext}
              isDisabled={selected === flashcards.length - 1}
            >
              <ChevronRight />
            </IconButton>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
