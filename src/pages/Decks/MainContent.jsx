import { Box, Flex, GridItem, Select, SimpleGrid, Spacer, Text, useToast } from '@chakra-ui/react';
import DeckCard from './DeckCard';
import { useNavigate } from 'react-router-dom';

export const MainContent = ({ currentDecks }) => {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <GridItem colSpan={3}>
      <Flex>
        <Box>
          <Text fontSize={'medium'} fontWeight={'black'}>
            {currentDecks.length} decks
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Select placeholder='Sort by:' variant={'filled'}>
            <option value={1}>Recommend</option>
            <option value={2}>Latest</option>
          </Select>
        </Box>
      </Flex>
      <SimpleGrid gridGap={10} mt={8} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {currentDecks.map((deck) => (
          <DeckCard
            key={deck.topic_id}
            handleError={() => {
              if (deck.flashcard_count) {
                navigate(`/flashcard/${deck.topic_id}`);
              } else {
                return toast({
                  title: 'No Flashcards Available',
                  status: 'error',
                  isClosable: true,
                  position: 'top',
                });
              }
            }}
            name={deck.topic_name}
            flashcardCount={deck.flashcard_count}
          />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};
