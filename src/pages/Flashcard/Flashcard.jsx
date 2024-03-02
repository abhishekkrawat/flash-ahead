import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { supabase } from 'lib/supabaseClient';
import { useState, useEffect } from 'react';
import { Slides } from './Slides';
import { Card } from './Card';
import { useParams } from 'react-router';
import { ChevronLeft, ChevronRight, Edit } from 'react-feather';
import { Field, Formik, Form } from 'formik';
import jsPDF from 'jspdf';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [selected, setSelected] = useState(0);
  const { deckId } = useParams();
  const { onOpen, onClose, isOpen } = useDisclosure();

  const handleNext = () => {
    if (0 <= selected < flashcards.length - 1) {
      setSelected((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
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
        i == flashcards.length - 1 ? pdf.save('DownloadAll.pdf') : pdf.addPage();
      }
    } else {
      pdf.rect(x, y, width, height);
      pdf.setFontSize(15);
      pdf.text(`Question: ${flashcards[selected].flashcard_front}`, x + 1, y + 25);
      pdf.text(`Answer: ${flashcards[selected].flashcard_back}`, x + 1, y + 40);
      pdf.save('Download.pdf');
    }
  };

  const handlePrevious = () => {
    if (selected !== 0 && selected > 0) {
      setSelected((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const getFlashcards = async () => {
    const { data, error } = await supabase
      .from('flashcard')
      .select('flashcard_id, flashcard_front, flashcard_back')
      .eq('topic_id', deckId);

    if (error) {
      throw new Error(error);
    }
    setFlashcards(data);
  };

  const handleSubmit = async (values) => {
    const { flashcard_front, flashcard_back } = values;

    const { error } = await supabase
      .from('flashcard')
      .update({
        flashcard_front: flashcard_front,
        flashcard_back: flashcard_back,
      })
      .eq('flashcard_id', flashcards[selected].flashcard_id);

    if (error) {
      throw new Error(error);
    }
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
          <Flex gap={1}>
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
            <Tooltip label='Edit'>
              <IconButton
                p={2}
                onClick={() => {
                  onOpen();
                }}
              >
                <Edit size={30} />
              </IconButton>
            </Tooltip>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
              {<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(25px)' />}

              <ModalContent>
                <ModalHeader>Edit this Flashcard</ModalHeader>
                <ModalCloseButton />
                <Formik
                  initialValues={
                    flashcards.length && {
                      flashcard_front: flashcards[selected].flashcard_front,
                      flashcard_back: flashcards[selected].flashcard_back,
                    }
                  }
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, touched, dirty }) => (
                    <Form>
                      <ModalBody>
                        <Field name='flashcard_front'>
                          {({ field }) => (
                            <FormControl>
                              <FormLabel>Flashcard Front:</FormLabel>
                              <Input
                                // defaultValue={flashcards[selected].flashcard_front}
                                {...field}
                              />
                            </FormControl>
                          )}
                        </Field>
                        <Field name='flashcard_back'>
                          {({ field }) => (
                            <FormControl>
                              <FormLabel>Flashcard Back:</FormLabel>
                              <Input
                                // defaultValue={flashcards[selected].flashcard_back}
                                value={flashcards[selected].flashcard_back}
                                {...field}
                              />
                            </FormControl>
                          )}
                        </Field>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                        <Button
                          type='submit'
                          isLoading={isSubmitting}
                          isDisabled={!dirty || !touched}
                        >
                          Submit
                        </Button>
                      </ModalFooter>
                    </Form>
                  )}
                </Formik>
              </ModalContent>
            </Modal>
          </Flex>
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
