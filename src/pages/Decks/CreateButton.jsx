import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  ModalOverlay,
  ModalHeader,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
  Input,
  SimpleGrid,
  Icon,
  useToast,
  Divider,
  AbsoluteCenter,
  Box,
  Text,
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik, useField, useFormikContext } from 'formik';
import { Plus, XCircle } from 'react-feather';
import { supabase } from 'lib/supabaseClient';
import { useEffect, useState } from 'react';

export const CreateButton = ({ initialValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (formData) => {
    const { subject_id, qualification_id, board_id, topic_id, flashcards } = formData;

    await supabase.from('flashcard').insert(
      flashcards.map((flashcard) => ({
        subject_id,
        qualification_id,
        board_id,
        topic_id,
        flashcard_front: flashcard.flashcard_front,
        flashcard_back: flashcard.flashcard_back,
        is_public: false,
      })),
    );
    onClose();
    toast({
      title: 'Deck created',
      description: 'Deck has been created successfully',
      status: 'success',
      position: 'top',
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <>
      <IconButton
        data-testid='create-deck-label'
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
          onOpen();
        }}
        _hover={{
          bg: 'purple.500',

          transform: 'scale(1.05)',
        }}
        icon={<Plus width={'2rem'} height={'2rem'} />}
      />
      <Modal
        data-testid='create-deck-modal'
        isCentered
        isOpen={isOpen}
        size={'xl'}
        onClose={onClose}
      >
        {<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(25px)' />}

        <ModalContent>
          <ModalHeader>Create new flashcard/flashcards</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              subject_name: '',
              qualification_name: '',
              board_name: '',
              topic_name: '',
              flashcards: [
                {
                  flashcard_front: '',
                  flashcard_back: '',
                },
              ],
            }}
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <ModalBody display={'flex'} flexDirection={'column'} gap={4}>
                  <SimpleGrid columns={3} gap={3}>
                    <Field name='subject_id'>
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel>Subject</FormLabel>
                          <Select {...field}>
                            <option value={''} />
                            {initialValues.subjects.map((subject) => (
                              <option key={subject.subject_id} value={subject.subject_id}>
                                {subject.subject_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='qualification_id'>
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel>Qualification</FormLabel>
                          <Select {...field}>
                            <option value={''} />
                            {initialValues.qualifications.map((qualification) => (
                              <option
                                key={qualification.qualification_id}
                                value={qualification.qualification_id}
                              >
                                {qualification.qualification_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='board_id'>
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel>Board</FormLabel>
                          <Select {...field}>
                            <option value={''} />
                            {initialValues.boards.map((board) => (
                              <option key={board.board_id} value={board.board_id}>
                                {board.board_name}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  </SimpleGrid>
                  <TopicField props={{ name: 'topic_id' }} decks={initialValues.decks} />
                  <Box position='relative' padding='4'>
                    <Divider />
                    <AbsoluteCenter bg='white' px='3'>
                      <Text color={'gray.500'} fontSize={'sm'}>
                        Add flashcards
                      </Text>
                    </AbsoluteCenter>
                  </Box>
                  <FieldArray
                    name='flashcards'
                    render={(arrayHelpers) => (
                      <>
                        {values.flashcards.map((_, index) => (
                          <SimpleGrid
                            key={index}
                            columns={3}
                            gap={2}
                            justifyItems={'center'}
                            gridTemplateColumns={'250px 250px auto'}
                            alignItems={'flex-end'}
                          >
                            <Field name={`flashcards.${index}.flashcard_front`}>
                              {({ field }) => (
                                <FormControl isRequired>
                                  <FormLabel>Question</FormLabel>
                                  <Input type='text' {...field} required />
                                </FormControl>
                              )}
                            </Field>
                            <Field name={`flashcards.${index}.flashcard_back`}>
                              {({ field }) => (
                                <FormControl isRequired>
                                  <FormLabel>Answer</FormLabel>
                                  <Input type='text' {...field} required />
                                </FormControl>
                              )}
                            </Field>
                            <IconButton
                              size={'sm'}
                              _hover={{ bg: 'none' }}
                              cursor={'pointer'}
                              onClick={() => arrayHelpers.remove(index)}
                              marginBottom={1}
                              variant={'unstyled'}
                            >
                              <XCircle size={16} />
                            </IconButton>
                          </SimpleGrid>
                        ))}
                        <Button
                          type='button'
                          variant={'link'}
                          alignItems={'center'}
                          marginRight={'auto'}
                          onClick={() =>
                            arrayHelpers.push({ flashcard_front: '', flashcard_back: '' })
                          }
                        >
                          <Icon as={Plus} width={'1rem'} height={'1rem'} marginRight={1} />
                          Add another
                        </Button>
                      </>
                    )}
                  />
                </ModalBody>

                <ModalFooter gap={3}>
                  <Button type='button' onClick={onClose}>
                    Close
                  </Button>
                  <Button type='submit' colorScheme='teal' isLoading={isSubmitting}>
                    Submit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

function TopicField({ props, decks }) {
  const {
    values: { subject_id },
  } = useFormikContext();
  const [field] = useField(props);
  const [currentDecks, setCurrentDecks] = useState([]);

  useEffect(() => {
    // set the value of textC, based on textA and textB
    if (subject_id) {
      setCurrentDecks(decks.filter((deck) => deck.subject_id === Number(subject_id)));
    }
  }, [subject_id, decks]);

  return (
    <FormControl isRequired>
      <FormLabel>Topic</FormLabel>
      <Select {...field}>
        <option value={''} />
        {currentDecks.map((deck) => (
          <option key={deck.topic_id} value={deck.topic_id}>
            {deck.topic_name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
