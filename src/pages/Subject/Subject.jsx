import Navbar from '../../components/NavigationBar/Navbar';
import { Container, Grid } from '@chakra-ui/react';
import { SidePanel } from './SidePanel';
import { Decks } from './Decks';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { transform } from '../../utils';
import { useParams } from 'react-router-dom';

const Subject = () => {
  const [decks, setDecks] = useState([]);
  const [flashcardCount, setFlashcardCount] = useState();
  const [qualifications, setQualifications] = useState([]);
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { subjectName } = useParams();

  // const subjectids = supabase.from('flashcard').select('subject_id');
  // const topicids = supabase.from('flashcard').select('topic_id');

  const getDecks = async () => {
    const { data, error } = await supabase.rpc('get_topics', {
      subjectname: transform(subjectName.trim()),
    });
    if (error) {
      throw new Error(error);
    }
    setDecks(data);
  };

  const getFlashcardCount = async () => {
    const { data, error } = await supabase.rpc('get_number_of_flashcards', {
      subjectid: 1,
      topicid: 1,
    });
    if (error) {
      throw new Error(error);
    }
    setFlashcardCount(data);
  };

  const getSubjects = async () => {
    const { data, error } = await supabase.from('subject').select('*');

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
    getDecks();
    getBoards();
    getSubjects();
    getQualifications();
    getFlashcardCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <Navbar />
      <Container as='section' maxW='8xl' py='50px'>
        <Grid templateColumns='repeat(4, 1fr)'>
          <SidePanel qualifications={qualifications} boards={boards} subjects={subjects} />
          <Decks decks={decks} flashcardNumber={flashcardCount} />
        </Grid>
      </Container>
    </>
  );
};

export default Subject;
