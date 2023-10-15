import { Box, Flex, GridItem, Select, SimpleGrid, Spacer, Text } from '@chakra-ui/react';
// import DeckCard from './DeckCard';
// import { useNavigate } from 'react-router-dom';
import { Card } from './Card';

export const MainContent = ({ decks }) => {
  // const navigate = useNavigate();
  // const toast = useToast();

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
          <Select placeholder='Sort by:' variant={'filled'}>
            <option value={1}>Recommend</option>
            <option value={2}>Latest</option>
          </Select>
        </Box>
      </Flex>
      <SimpleGrid spacingX={10} spacingY={1} mt={8} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {decks.map((deck) => (
          <Card
            key={deck.topic_id}
            name={deck.topic_name}
            date={deck.created_at}
            subjectId={deck.subject_id}
          />
          // <DeckCard
          //   key={deck.topic_id}
          //   handleError={() => {
          //     if (deck.flashcard_count) {
          //       navigate(`/flashcard/${deck.topic_id}`);s
          //     } else {
          //       return toast({
          //         title: 'No Flashcards Available',
          //         status: 'error',
          //         isClosable: true,
          //         position: 'top',
          //       });
          //     }
          //   }}
          //   name={deck.topic_name}
          //   flashcardCount={deck.flashcard_count}
          // />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};
