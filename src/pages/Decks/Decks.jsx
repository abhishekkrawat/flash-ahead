import { Container, Grid } from '@chakra-ui/react';
import { SidePanel } from './SidePanel';
import { MainContent } from './MainContent';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { Paginate } from './Paginate';

const Decks = () => {
  const [decks, setDecks] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({ qualifications: [], boards: [], subjects: [] });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  const filterDecks = (decks) => {
    return decks.filter((deck) => {
      if (searchParams.get('s')) {
        const selectedSubjects = searchParams.get('s').split('_');
        const getSubjectName = (id) => {
          return filters.subjects.find((s) => s.subject_id === id).subject_name;
        };
        return selectedSubjects.includes(getSubjectName(deck.subject_id));
      } else if (searchParams.get('q')) {
        const selectedQualifications = searchParams.get('q').split('_');
        const getQualificationName = (id) => {
          return filters.qualifications.find((q) => q.qualification_id === id).qualification_name;
        };
        return selectedQualifications.includes(getQualificationName(deck.qualification_id));
      } else if (searchParams.get('b')) {
        const selectedBoards = searchParams.get('b').split('_');
        const getBoardName = (id) => {
          return filters.boards.find((q) => q.board_id === id).board_name;
        };
        return selectedBoards.includes(getBoardName(deck.board_id));
      }
      return true;
    });
  };

  const getDecks = async () => {
    const { data, error } = await supabase.rpc('get_topics');

    if (error) {
      throw new Error(error);
    }
    setDecks(filterDecks(data));
  };

  const getSubjects = async () => {
    const { data, error } = await supabase.from('subject').select();

    if (error) {
      throw new Error(error);
    }
    setFilters((prev) => ({
      ...prev,
      subjects: data,
    }));
  };

  const getQualifications = async () => {
    const { data, error } = await supabase.from('qualification').select('*');

    if (error) {
      throw new Error(error);
    }
    setFilters((prev) => ({
      ...prev,
      qualifications: data,
    }));
  };

  const getBoards = async () => {
    const { data, error } = await supabase.from('board').select('*');

    if (error) {
      throw new Error(error);
    }
    setFilters((prev) => ({
      ...prev,
      boards: data,
    }));
  };

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

  useEffect(() => {
    setSearchParams();
    getBoards();
    getSubjects();
    getQualifications();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getDecks();
  }, [searchParams]);
  return (
    <>
      <Container as='section' maxW='8xl' py='50px'>
        <Grid templateColumns='repeat(4, 1fr)'>
          <SidePanel {...filters} />
          <MainContent currentDecks={currentDecks} />
        </Grid>
        <Paginate
          postsPerPage={postsPerPage}
          totalDecks={decks.length}
          currentPage={currentPage}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      </Container>
    </>
  );
};

export default Decks;
