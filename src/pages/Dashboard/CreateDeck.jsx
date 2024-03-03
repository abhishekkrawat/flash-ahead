import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { PlusCircle } from 'react-feather';
import { supabase } from 'lib/supabaseClient';

export const CreateDeck = ({ initialValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (values) => {
    const { subject_id, qualification_id, board_id, topic_name } = values;

    const { error } = await supabase.from('topic').insert([
      {
        subject_id,
        qualification_id,
        board_id,
        topic_name,
        created_at: new Date().toLocaleDateString(),
      },
    ]);

    if (error) {
      throw new Error(error);
    }
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
      <Button colorScheme='teal' size='sm' onClick={onOpen}>
        <Icon as={PlusCircle} w={4} h={4} mr={2} />
        New Deck
      </Button>
      <Modal isCentered isOpen={isOpen} size={'xl'} onClose={onClose}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(25px)' />

        <ModalContent>
          <ModalHeader>Create a new deck</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              subject_id: '',
              qualification_id: '',
              board_id: '',
              topic_name: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody display={'flex'} flexDirection={'column'} gap={4}>
                  <SimpleGrid columns={3} gap={3}>
                    <Field name='subject_id'>
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Subject</FormLabel>
                          <Select {...field}>
                            <option value='' />
                            {initialValues.subjects.map((subject) => (
                              <option key={subject.subject_id} value={subject.subject_id}>
                                {subject.subject_name}
                              </option>
                            ))}
                          </Select>
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name='qualification_id'>
                      {({ field }) => (
                        <FormControl isRequired>
                          <FormLabel>Qualification</FormLabel>
                          <Select {...field}>
                            <option value='' />
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
                            <option value='' />
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
                  <Field name='topic_name'>
                    {({ field }) => (
                      <FormControl isRequired>
                        <FormLabel>Topic</FormLabel>
                        <Input {...field} type='text' />
                      </FormControl>
                    )}
                  </Field>
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
