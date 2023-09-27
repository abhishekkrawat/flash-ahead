import { GridItem, SimpleGrid } from '@chakra-ui/react';
import DeckCard from './DeckCard';

export const MainContent = ({ decks }) => {
  return (
    <GridItem colSpan={3} rowSpan={2}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {decks.map((deck) => (
          <DeckCard
            key={deck.topic_id}
            name={deck.topic_name}
            flashcardCount={deck.flashcard_count}
          />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};
