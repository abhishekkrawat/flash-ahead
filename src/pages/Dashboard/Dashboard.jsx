import {
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { DashCard } from './DashCard';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { Plus } from 'react-feather';
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [flashcardCount, setFlashcardCount] = useState(1);

  const OverlayOne = () => (
    <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
  );

  const addFlashcard = () => {
    setFlashcardCount(flashcardCount + 1);
  };
  const [overlay, setOverlay] = useState(<OverlayOne />);
  return (
    <>
      <Container maxW='container.lg' marginTop={16}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Heading>Dashboard</Heading>
          <Spacer />
          <IconButton
            aria-label='Create Deck'
            pos={'fixed'}
            right={0}
            bottom={0}
            margin={8}
            variant={'solid'}
            bg={'purple.300'}
            color={'white'}
            rounded={'full'}
            width={14}
            height={14}
            boxShadow={'xl'}
            onClick={() => {
              setOverlay(<OverlayOne />);

              onOpen();
            }}
            _hover={{
              bg: 'purple.500',

              transform: 'scale(1.05)',
            }}
            icon={<Plus width={'2rem'} height={'2rem'} />}
          />
          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}

            <ModalContent minW={700} h={700}>
              <ModalHeader>New deckcard</ModalHeader>

              <ModalCloseButton />

              <ModalBody>
                <Formik
                  initialValues={{
                    subject: '',
                    topic: '',
                    board: '',
                    flashcardFront: '',
                    flashcardBack: '',
                  }}
                >
                  {() => (
                    <Form>
                      <Stack spacing={4}>
                        <Stack spacing={4} direction={'row'}>
                          <Field name='subject'>
                            {({ field }) => (
                              <FormControl isRequired>
                                <FormLabel>Subject:</FormLabel>

                                <Input type='text' {...field} />
                              </FormControl>
                            )}
                          </Field>

                          <Field name='topic'>
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.password && form.touched.password}
                                isRequired
                              >
                                <FormLabel>Topic:</FormLabel>

                                <Input type='text' {...field} />
                              </FormControl>
                            )}
                          </Field>

                          <Field name='board'>
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={form.errors.password && form.touched.password}
                                isRequired
                              >
                                <FormLabel>Board:</FormLabel>

                                <Input type='text' {...field} />
                              </FormControl>
                            )}
                          </Field>
                        </Stack>
                        <Spacer />
                        {Array.from({ length: flashcardCount }, (_, i) => (
                          <SimpleGrid columns={1} spacing={4} key={i}>
                            <Text fontWeight={'bold'}>Flashcard {i + 1}:</Text>
                            <Field name={`flashcards[${i}].front`}>
                              {({ field }) => (
                                <FormControl isRequired>
                                  <FormLabel>Flashcard front:</FormLabel>
                                  <Input type='text' {...field} />
                                </FormControl>
                              )}
                            </Field>
                            <Field name={`flashcards[${i}].back`}>
                              {({ field }) => (
                                <FormControl isRequired>
                                  <FormLabel>Flashcard back:</FormLabel>
                                  <Input type='text' {...field} />
                                </FormControl>
                              )}
                            </Field>
                          </SimpleGrid>
                        ))}

                        <Link onClick={addFlashcard}>Add new</Link>

                        <Stack spacing={5}>
                          <Button
                            type='submit'
                            bg={'purple.400'}
                            color={'white'}
                            _hover={{
                              bg: 'purple.700',
                            }}
                            mb={3}
                            isDisabled={false}
                          >
                            Save
                          </Button>
                        </Stack>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
        <Divider marginTop={2} marginBottom={2} />
        <SimpleGrid columns={2} spacing={5} pt={6}>
          <DashCard />
          <DashCard />
          <DashCard />
        </SimpleGrid>
      </Container>
    </>
  );
};
