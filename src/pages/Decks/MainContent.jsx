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
  Spacer,
  useToast,
  Select,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Paginate } from './Paginate';
import { ChevronDown } from 'react-feather';
import { Card } from './Card';

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
      <Flex flexDirection={['column', 'row']} justify={'space-between'}>
        <Box
          display={'flex'}
          alignItems={['center', 'flex-start']}
          textAlign={['center', 'left']}
          mb={[4, 0]}
        >
          <Text fontSize={'large'} fontWeight={'semibold'}>
            {decks.length !== 0
              ? `Showing ${indexOfFirstDeck + 1} -
              ${indexOfLastDeck <= decks.length ? indexOfLastDeck : decks.length} of ${decks.length}
              decks`
              : '0 decks'}
          </Text>
        </Box>
        <Spacer />
        <Box
          display={'flex'}
          flexDirection={['column', 'row']}
          justify={'space-between'}
          gap={[4, 10]}
        >
          <Paginate
            numberOfPages={numberOfPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          {/* <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDown />}>
              Sort by
            </MenuButton>
            <MenuList>
              <MenuItem>Recommended</MenuItem>
              <MenuItem>Latest</MenuItem>
            </MenuList>
          </Menu> */}
          <Select // Use Select for responsive sorting options
            placeholder='Sort by'
          >
            <option value='recommended'>Recommended</option>
            <option value='latest'>Latest</option>
          </Select>
        </Box>
      </Flex>
      <SimpleGrid spacing={10} mt={8} columns={[1, 2, 3]}>
        {currentDecks.map((deck) => (
          <Card
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
