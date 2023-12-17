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
            <FormControl display={'flex'} flexDirection={'row'} alignItems={'center'}>
              <FormLabel>Subject:</FormLabel>
              <Input placeholder='eg. Mathematics' />
              <FormLabel>Topic:</FormLabel>
              <Input placeholder='eg. Algebra' />
              {/* <FormLabel>Board name</FormLabel>
              <Input placeholder='eg. Algebra' /> */}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
