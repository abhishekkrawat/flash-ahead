import { GridItem, SimpleGrid, useToast } from '@chakra-ui/react';
import DeckCard from './DeckCard';
import { useNavigate } from 'react-router-dom';

export const MainContent = ({ decks }) => {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <GridItem colSpan={3} rowSpan={2}>
      <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {decks.map((deck) => (
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
