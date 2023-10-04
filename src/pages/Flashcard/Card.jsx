import { Box, Text } from '@chakra-ui/react';

export const Card = ({ content, isFlipped, handleFlip }) => {
  return (
    <Box
      width={700}
      height={400}
      bg='white'
      fontSize={'4xl'}
      display={'flex'}
      borderRadius='xl'
      boxShadow='2xl'
      cursor='pointer'
      onClick={handleFlip}
      perspective='1000px'
      transition='transform 0.6s ease'
      transform={isFlipped ? 'rotateY(180deg) ScaleX(-1)' : 'rotateY(0)'}
    >
      <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text align={'center'}>{isFlipped ? content.back : content.front}</Text>
      </Box>
    </Box>
  );
};
