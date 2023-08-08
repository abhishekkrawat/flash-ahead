import Navbar from '../../components/NavigationBar/Navbar';
import { Container, Grid } from '@chakra-ui/react';
import { SidePanel } from './SidePanel';
import { MainContent } from './MainContent';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useSearchParams } from 'react-router-dom';

const Decks = () => {
  const [decks, setDecks] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterDecks = (decks) => {
    return decks.filter((deck) => {
      if (searchParams.get('s')) {
        const selectedSubjects = searchParams.get('s').split('_');
        const getSubjectName = (id) => {
          return subjects.find((s) => s.subject_id === id).subject_name;
        };
        return selectedSubjects.includes(getSubjectName(deck.subject_id));
      } else if (searchParams.get('q')) {
        const selectedQualifications = searchParams.get('q').split('_');
        const getQualificationName = (id) => {
          return qualifications.find((q) => q.qualification_id === id).qualification_name;
        };
        return selectedQualifications.includes(getQualificationName(deck.qualification_id));
      } else if (searchParams.get('b')) {
        const selectedBoards = searchParams.get('b').split('_');
        const getBoardName = (id) => {
          return boards.find((q) => q.board_id === id).board_name;
        };
        return selectedBoards.includes(getBoardName(deck.board_id));
      }
      return true;
    });
  };

  const getDecks = async () => {
    const { data, error } = await supabase.rpc('get_decks');

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
    setSubjects(data);
  };

  const getQualifications = async () => {
    const { data, error } = await supabase.from('qualification').select('*');

    if (error) {
      throw new Error(error);
    }
    setQualifications(data);
  };

  const getBoards = async () => {
    const { data, error } = await supabase.from('board').select('*');

    if (error) {
      throw new Error(error);
    }
    setBoards(data);
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
      <Navbar />
      <Container as='section' maxW='8xl' py='50px'>
        <Grid templateColumns='repeat(4, 1fr)'>
          <SidePanel qualifications={qualifications} boards={boards} subjects={subjects} />
          <MainContent decks={decks} />
        </Grid>
      </Container>
    </>
  );
};

export default Decks;