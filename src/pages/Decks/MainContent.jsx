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
  const [postsPerPage] = useState(9);

  const indexOfLastDeck = currentPage * postsPerPage;
  const indexOfFirstDeck = indexOfLastDeck - postsPerPage;
  const currentDecks = decks.slice(indexOfFirstDeck, indexOfLastDeck);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(decks.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <GridItem colSpan={3}>
      <Flex flexDirection={'row'} justify={'space-between'}>
        <Box display={'flex'} alignItems={'center'}>
          <Text fontSize={'large'} fontWeight={'semibold'}>
            Showing {indexOfFirstDeck + 1} -{' '}
            {indexOfLastDeck <= decks.length ? indexOfLastDeck : decks.length} of {decks.length}{' '}
            decks
          </Text>
        </Box>
        <Box display={'flex'} flexDirection={'row'} justify={'space-between'} gap={10}>
          <Paginate
            postsPerPage={postsPerPage}
            totalDecks={decks.length}
            currentPage={currentPage}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
          />
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDown />}>
              Sort By
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
