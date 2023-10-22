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
  Text,
} from '@chakra-ui/react';

import { Plus } from 'react-feather';
import { useState } from 'react';

export const CreateButton = () => {
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
          <ModalHeader>Modal title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Deckcard</Text>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
