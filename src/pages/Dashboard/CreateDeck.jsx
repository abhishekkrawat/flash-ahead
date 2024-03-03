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
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { PlusCircle } from 'react-feather';
import { supabase } from 'lib/supabaseClient';
import { useEffect, useState } from 'react';

export const CreateDeck = ({ initialValues }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (values) => {
    const { subject_id, qualification_id, board_id, topic_name, subject_name } = values;

    let createdSubjectId = '';
    if (subject_name.length) {
      const { data } = await supabase
        .fromt('subject')
        .insert({
          subject_name,
        })
        .select('subject_id');

      createdSubjectId = data[0].subject_id;
    }

    const { error } = await supabase.from('topic').insert([
      {
        subject_id: subject_name.length ? createdSubjectId : subject_id,
        qualification_id,
        board_id,
        topic_name,
        is_public: false,
      },
    ]);

    if (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        position: 'top',
        duration: 4000,
        isClosable: true,
      });
      throw new Error(error);
    }
    location.reload();
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
          <ModalHeader>Create a new subject/deck</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{
              subject_id: '',
              qualification_id: '',
              subject_name: '',
              board_id: '',
              topic_name: '',
            }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <ModalBody display={'flex'} flexDirection={'column'} gap={4}>
                  <SimpleGrid columns={1} gap={3}>
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
                            <option value='other'>Other</option>
                          </Select>
                          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <SubjectField props={{ name: 'subject_name' }} />
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

function SubjectField({ props }) {
  const [show, setShow] = useState(false);

  const {
    values: { subject_id },
  } = useFormikContext();

  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(props);

  useEffect(() => {
    if (subject_id === 'other') {
      setShow(true);
    } else {
      setShow(false);
      helpers.setValue('');
    }
  }, [subject_id, helpers]);

  return (
    <>
      {' '}
      {show && (
        <FormControl isRequired>
          <FormLabel>Please add a subject name</FormLabel>
          <Input {...field} />
        </FormControl>
      )}{' '}
    </>
  );
}
