import { Box, Button, Flex, IconButton, Text } from '@chakra-ui/react';
import Navbar from '../../components/NavigationBar/Navbar';
import { supabase } from '../../supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';
import { useParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Page } from './Page';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);
  const { deckId } = useParams();

  // const downloadPDF = () => {
  //   const capture = document.querySelector('.css-txdpd1');
  //   setLoader(true);
  //   html2canvas(capture).then((canvas) => {
  //     const imgData = canvas.toDataURL('img/png');
  //     const doc = new jsPDF('l', 'mm', 'a8');
  //     const componentWidth = doc.internal.pageSize.getWidth();
  //     const componentHeight = doc.internal.pageSize.getHeight();
  //     doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
  //     setLoader(false);
  //     doc.save(`flashcard`);
  //   });
  // };

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
      <Navbar />
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
            <Button onClick={Page}>download</Button>
          </Box>

          {/* <Button onClick={downloadPDF} disabled={!loader === false}>
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </Button> */}
        </Box>
      </Flex>
    </>
  );
};
