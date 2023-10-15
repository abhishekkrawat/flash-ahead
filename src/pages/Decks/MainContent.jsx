import { Box, Flex, GridItem, Select, SimpleGrid, Spacer, Text, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { NewCard } from './Card';

export const MainContent = ({ decks }) => {
  const navigate = useNavigate();
  const toast = useToast();

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
      <SimpleGrid
        spacing={10}
        mt={8}
        templateColumns='repeat(auto-fill, minmax(300px, 1fr))'
      >
        {decks.map((deck) => (
          <NewCard
            key={deck.topic_id}
            name={deck.topic_name}
            date={deck.created_at}
            subjectId={deck.subject_id}
            handleNavigation={() => {
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
          />
        ))}
      </SimpleGrid>
    </GridItem>
  );
};
