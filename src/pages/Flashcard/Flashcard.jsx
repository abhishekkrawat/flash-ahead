import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import { supabase } from 'lib/supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';
import { useParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'react-feather';
import jsPDF from 'jspdf';

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

  const generatePDF = () => {
    const pdf = new jsPDF()
    const x = 25;
    const y = 70;
    const width = 150;
    const height = 75;

    if (flashcards.length > 1) {
      for (let i = 0; i < flashcards.length; i++) {
        pdf.rect(x, y, width, height);
        pdf.setFontSize(15);
        pdf.text(`Question: ${flashcards[i].flashcard_front}`, x + 1, y + 25);
        pdf.text(`Answer: ${flashcards[i].flashcard_back}`, x + 1, y + 40);
        i == flashcards.length - 1 ? pdf.save() : pdf.addPage();
      }
    } else {
      pdf.rect(x, y, width, height);
      pdf.setFontSize(15);
      pdf.text(`Question: ${flashcards[selected].flashcard_front}`, x + 1, y + 25);
      pdf.text(`Answer: ${flashcards[selected].flashcard_back}`, x + 1, y + 40);
    }

    pdf.save('exported-document.pdf');
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
          <Button onClick={generatePDF}>Download as PDF</Button>
        </Box>
      </Flex>
    </>
  );
};
