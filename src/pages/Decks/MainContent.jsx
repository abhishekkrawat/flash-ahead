import { Box, Flex, GridItem, Select, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
import DeckCard from './DeckCard';

export const MainContent = ({ decks }) => {
  return (
    <GridItem colSpan={3}>
      <Flex>
        <Box>
          <Text fontSize={'medium'} fontWeight={'black'}>
            {decks.length} decks
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Select placeholder='Sort by:' variant={'filled'} >
            <option value={1}>Recommend</option>
            <option value={2}>Latest</option>
          </Select>
        </Box>
      </Flex>
      <SimpleGrid gridGap={10} mt={8} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {decks.map((deck) => (
          <DeckCard
            key={deck.topic_id}
            topicId={deck.topic_id}
            name={deck.topic_name}
            flashcardCount={deck.flashcard_count}
          />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};
