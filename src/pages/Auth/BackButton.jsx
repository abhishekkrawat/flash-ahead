import { Button, Flex } from '@chakra-ui/react';
// import { ArrowLeftCircle } from 'react-feather';
import { useNavigate } from 'react-router-dom';

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Flex padding={4} alignItems={'flex-start'} position={'fixed'}>
      <Button variant={'outline'} onClick={() => navigate('/')} size={'lg'} _hover={{ bg: 'none' }}>
        Back
      </Button>
    </Flex>
  );
};
