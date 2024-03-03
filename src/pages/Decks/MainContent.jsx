import { Box, Flex, GridItem, SimpleGrid, Text, Spacer, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Paginate } from './Paginate';
import { Card } from './Card';
import { supabase } from 'lib/supabaseClient';

export const MainContent = ({ decks, currentUser }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const numberOfPages = Math.ceil(decks.length / postsPerPage);
  const indexOfLastDeck = currentPage * postsPerPage;
  const indexOfFirstDeck = indexOfLastDeck - postsPerPage;
  const currentDecks = decks.slice(indexOfFirstDeck, indexOfLastDeck);

  const updateViewCount = async (topicid) => {
    const { error } = await supabase.rpc('increment_views', {
      topicid,
    });

    if (error) {
      throw new Error(error);
    }
  };

  return (
    <GridItem colSpan={3}>
      <Flex flexDirection={'row'} justify={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          <Text fontSize={'large'} fontWeight={'semibold'}>
            {decks.length !== 0
              ? `Showing ${indexOfFirstDeck + 1} -
              ${indexOfLastDeck <= decks.length ? indexOfLastDeck : decks.length} of ${decks.length}
              decks`
              : '0 decks'}
          </Text>
        </Box>
        <Spacer />
        <Paginate
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Flex>
      <SimpleGrid spacing={10} mt={8} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
        {currentDecks.map((deck) => (
          <Card
            key={deck.topic_id}
            topicId={deck.topic_id}
            name={deck.topic_name}
            user_id={deck.user_id}
            user={deck.user_id ? currentUser : 'Admin'}
            date={deck.created_at}
            subjectId={deck.subject_id}
            views={deck.topic_views}
            handleNavigation={async () => {
              if (deck.flashcard_count) {
                await updateViewCount(deck.topic_id);
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
