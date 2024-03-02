import { Button, HStack } from '@chakra-ui/react';
import { ChevronLeft, ChevronRight } from 'react-feather';

export const Paginate = ({ numberOfPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <HStack spacing={2} justify='center'>
      <Button onClick={previousPage} variant='outline' disabled={currentPage === 1}>
        <ChevronLeft />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          data-testid='current-page-button-label'
          key={number}
          onClick={() => setCurrentPage(number)}
          variant={number === currentPage ? 'solid' : 'outline'}
        >
          {number}
        </Button>
      ))}
      <Button
        data-testid='next-page-button-label'
        onClick={nextPage}
        variant='outline'
        disabled={currentPage === numberOfPages}
      >
        <ChevronRight />
      </Button>
    </HStack>
  );
};
