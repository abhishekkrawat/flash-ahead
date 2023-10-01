import { Box, Button, Flex, IconButton } from '@chakra-ui/react';
import Navbar from '../../components/NavigationBar/Navbar';
import { supabase } from '../../supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';
import { useParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'react-feather';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Flashcard = () => {
  const [loader, setLoader] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);
  const { deckId } = useParams();

  const downloadPDF = () => {
    const capture = document.querySelector('.css-txdpd1');
    setLoader(true);
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('l', 'mm', 'a8');
      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save(`flashcard`);
    });
  };

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
          <Button onClick={downloadPDF} disabled={!loader === false}>
            {loader ? <span>Downloading</span> : <span>Download</span>}
          </Button>
        </Box>
      </Flex>
    </>
  );
};
