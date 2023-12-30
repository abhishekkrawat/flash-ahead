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
  Input,
  Flex,
} from '@chakra-ui/react';
import { Plus } from 'react-feather';

export const CreateButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
          onOpen();
        }}
        _hover={{
          bg: 'purple.500',

          transform: 'scale(1.05)',
        }}
        icon={<Plus width={'2rem'} height={'2rem'} />}
      />
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(25px)' />}

        <ModalContent>
          <ModalHeader>Create a new deckcard</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection={'row'} gap={5}>
              <FormControl>
                <FormLabel>Subject:</FormLabel>
                <Input placeholder='eg. Mathematics' />
              </FormControl>
              <FormControl>
                <FormLabel>Topic:</FormLabel>
                <Input placeholder='eg. Algebra' />
              </FormControl>
            </Flex>
            <FormControl mt={3}>
              <FormLabel>Qualification:</FormLabel>
              <Input placeholder='eg. GCSE' />
            </FormControl>
            <FormControl mt={3}>
              <FormLabel>Board:</FormLabel>
              <Input placeholder='eg. AQA' />
            </FormControl>
          </ModalBody>

          <ModalFooter gap={3} >
            <Button onClick={onClose}>Close</Button>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
