import { Box, Flex, IconButton } from '@chakra-ui/react';
import Navbar from '../../components/NavigationBar/Navbar';
import { supabase } from '../../supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';
import { useParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'react-feather';

// function reducer(state, action) {
//   if (action.type === 'flipped') {
//     return {
//       flipped: !state.flipped,
//     };
//   } else if (action.type == 'not flipped') {
//     return { flipped: false };
//   }
// }

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);
  const { deckId } = useParams();
  // const [state, dispatch] = useReducer(reducer, { flipped: false });

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
      console.log(error);
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
        <Slides onSelected={handleSelected} flashcards={flashcards} selected={selected} />
        <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={10}>
          <IconButton
            _hover={{ bg: 'none' }}
            cursor={'pointer'}
            w={'5%'}
            h={'10%'}
            onClick={handlePrevious}
            isDisabled={selected === 0}
          >
            <ChevronLeft size={'100px'} />
          </IconButton>
          <Card
            flashcards={flashcards}
            selected={selected}
            isFlipped={isFlipped}
            handleFlip={handleFlip}
          />
          <IconButton
            _hover={{ bg: 'none' }}
            w={'5%'}
            h={'10%'}
            onClick={handleNext}
            isDisabled={selected === flashcards.length - 1}
          >
            <ChevronRight size={'100px'} />
          </IconButton>
        </Box>
      </Flex>
    </>
  );
};
