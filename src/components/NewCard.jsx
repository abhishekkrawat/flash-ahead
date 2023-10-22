import {
  IconButton,
  Stack,
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
  Input,
} from '@chakra-ui/react';

import { Plus } from 'react-feather';
import { useState } from 'react';
import { Form, Field, Formik } from 'formik';

export const NewCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const OverlayOne = () => (
    <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
  );

  const [overlay, setOverlay] = useState(<OverlayOne />);

  return (
    <>
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

        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <Formik initialValues={{ subject: '', topic: '', board: ''}}>
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

                    <Stack spacing={5}>
                      <Button
                        type='submit'
                        bg={'purple.400'}
                        color={'white'}
                        _hover={{
                          bg: 'purple.700',
                        }}
                        isDisabled={false}
                      >
                        Log in
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
