import {
  Box,
  Button,
  Flex,
  GridItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
  useToast,
} from '@chakra-ui/react';
import DeckCard from './DeckCard';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Paginate } from './Paginate';
import { ChevronDown } from 'react-feather';

export const MainContent = ({ decks }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const numberOfPages = Math.ceil(decks.length / postsPerPage);
  const indexOfLastDeck = currentPage * postsPerPage;
  const indexOfFirstDeck = indexOfLastDeck - postsPerPage;
  const currentDecks = decks.slice(indexOfFirstDeck, indexOfLastDeck);

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
        <Box display={'flex'} flexDirection={'row'} justify={'space-between'} gap={10}>
          <Paginate
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDown />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem>Recommended</MenuItem>
              <MenuItem>Latest</MenuItem>
            </MenuList>
          </Menu>
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
