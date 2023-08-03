import { Box, Text, IconButton } from '@chakra-ui/react';
import { ChevronRight, ChevronLeft } from 'react-feather';

export const Card = ({
  flashcards,
  selected,
  handlePrevious,
  handleNext,
  isFlipped,
  handleFlip,
}) => {
  return (
    <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={10}>
      <IconButton
        _hover={{ bg: 'none' }}
        cursor={'pointer'}
        w={'5%'}
        h={'10%'}
        onClick={handlePrevious}
        isDisabled={selected === 0}
      >
        <ChevronLeft size={'100px'} />
      </IconButton>
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
      <IconButton
        _hover={{ bg: 'none' }}
        w={'5%'}
        h={'10%'}
        onClick={handleNext}
        isDisabled={selected === flashcards.length - 1}
      >
        <ChevronRight size={'100px'} />
      </IconButton>
    </Box>
  );
};
