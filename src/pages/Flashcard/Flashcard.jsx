import { Flex } from '@chakra-ui/react';
import Navbar from '../../components/NavigationBar/Navbar';
import { supabase } from '../../supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);

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
        <Slides onSelected={handleSelected} flashcards={flashcards} selected={selected} />
        <Card
          flashcards={flashcards}
          selected={selected}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          isFlipped={isFlipped}
          handleFlip={handleFlip}
        />
      </Flex>
    </>
  );
};
