import { Box, Text } from '@chakra-ui/react';

export const Card = ({ flashcards, selected, isFlipped, handleFlip }) => {
  if (!flashcards.length) {
    return (
      <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Text fontSize={'5xl'}>No Flashcards available</Text>
      </Box>
    );
  } else {
    return (
      <Box
        width={700}
        height={400}
        bg='white'
        fontSize={'4xl'}
        display={'flex'}
        flexDirection={'column'}
        borderRadius='xl'
        boxShadow='2xl'
        cursor='pointer'
        onClick={handleFlip}
        perspective='1000px'
        transition='transform 0.6s ease'
        transform={isFlipped ? 'rotateY(180deg) ScaleX(-1)' : 'rotateY(0)'}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          bg={'purple.100'}
          fontSize={'lg'}
          borderTopRadius={'xl'}
        >
          <Text>
            Question {selected + 1} of {flashcards.length}
          </Text>
        </Box>
        <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          {selected !== null && flashcards.length > 0 && (
            <Text align={'center'} key={flashcards[selected].flashcard_id}>
              {isFlipped
                ? flashcards[selected].flashcard_back
                : flashcards[selected].flashcard_front}
            </Text>
          )}
        </Box>
      </Box>
    );
  }
};
