import {
  Box,
  Divider,
  // IconButton,
  Flex,
  Text,
  SimpleGrid,
  GridItem,
} from '@chakra-ui/react';
// import { ChevronLeft, ChevronRight } from 'react-feather';
import Navbar from '../components/NavigationBar/Navbar';
import { useState } from 'react';

export const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cards = Array(10)
    .fill(1)
    .map((x, y) => x + y);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <Flex pos={'fixed'} w={'100%'} bg={'gray.100'}>
        <SimpleGrid
          h={'100vh'}
          overflow={'scroll'}
          // to hide scrollbar
          css={{
            '&::-webkit-scrollbar': {
              width: '0px',
            },
          }}
        >
          {cards.map((card) => (
            <>
              <GridItem
                w={{ base: '50px', md: '175px', lg: '200px' }}
                minH='120px'
                bg='white'
                marginY={'10px'}
                marginX={'20px'}
                borderRadius='10px'
                borderWidth='2px'
              >
                <Text align='center'>
                  {card} / {cards.length}
                </Text>
              </GridItem>
              <Divider />
            </>
          ))}
        </SimpleGrid>
        <Box flex={1} display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Box
            width={600}
            height={400}
            maxWidth='lg'
            bg='white'
            borderRadius='xl'
            boxShadow='2xl'
            cursor='pointer'
            onClick={handleFlip}
            transformStyle='preserve-3d'
            perspective='1000px'
            transition='transform 0.6s ease'
            transform={isFlipped ? 'rotateY(180deg) ScaleX(-1)' : 'rotateY(0)'}
          >
            <Text>{isFlipped ? 'Abhishek Rawat' : 'What is your name'}</Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};
