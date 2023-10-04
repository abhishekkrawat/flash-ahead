import { Divider, Text, SimpleGrid, GridItem } from '@chakra-ui/react';

/**
 * This component displays all the flashcards in a deck vertically on the left side of Flashcard route
 * @param onSelected - handle selected card
 * @param flashcards - all the flashcards
 * @param selected - the currect selected card
 * @returns
 */
export const Slides = ({ onSelected, flashcards, selected }) => {
  return (
    <SimpleGrid
      h={'100vh'}
      overflow={'scroll'}
      // to hide scrollbar
      css={{
        '&::-webkit-scrollbar': {
          width: '0px',
        },
      }}
    >
      {flashcards.map((flashcard, index) => (
        <>
          <GridItem
            w={{ base: '50px', md: '175px', lg: '200px' }}
            h='120px'
            maxH='120px'
            bg='white'
            marginY={'10px'}
            marginX={'20px'}
            borderRadius='10px'
            borderWidth='2px'
            borderColor={selected === index ? 'gray' : 'none'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            cursor={'pointer'}
            onClick={() => {
              onSelected(index);
            }}
          >
            <Text padding={2} key={flashcard.flashcard_id} align={'center'} noOfLines={3}>
              {flashcard.flashcard_front}
            </Text>
          </GridItem>
          <Divider />
        </>
      ))}
    </SimpleGrid>
  );
};
