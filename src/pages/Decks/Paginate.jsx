import { Button, HStack } from '@chakra-ui/react';

export const Paginate = ({
  postsPerPage,
  totalDecks,
  currentPage,
  paginate,
  previousPage,
  nextPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDecks / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <HStack spacing={2} justify='center' mt={4}>
      <Button onClick={previousPage} variant='outline' disabled={currentPage === 1}>
        Prev
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => paginate(number)}
          variant={number === currentPage ? 'solid' : 'outline'}
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={nextPage}
        variant='outline'
        disabled={currentPage === Math.ceil(totalDecks / postsPerPage)}
      >
        Next
      </Button>
    </HStack>
  );
};
