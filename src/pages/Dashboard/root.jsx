import { Container, Divider, Flex, GridItem, Heading, SimpleGrid } from '@chakra-ui/react';
import { supabase } from 'lib/supabaseClient';

import ProjectCard from './ProjectCard';
import { useEffect, useState } from 'react';
import { CreateDeck } from './CreateDeck';

export const Dashboard = () => {
  const [decks, setDecks] = useState([]);
  const [data, setData] = useState({ qualifications: [], boards: [], subjects: [] });
  const [name, setName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setName(`${user.user_metadata?.firstName} ${user.user_metadata?.lastName}`);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const getDecks = async () => {
      const { data, error } = await supabase.rpc('get_topics').select().not('user_id', 'is', null);

      if (error) {
        throw new Error(error);
      }
      setDecks(data);
    };

    const getSubjects = async () => {
      const { data, error } = await supabase.from('subject').select();
      if (error) {
        throw new Error(error);
      }
      setData((prev) => ({
        ...prev,
        subjects: data,
      }));
    };

    const getQualifications = async () => {
      const { data, error } = await supabase.from('qualification').select();
      if (error) {
        throw new Error(error);
      }
      setData((prev) => ({
        ...prev,
        qualifications: data,
      }));
    };

    const getBoards = async () => {
      const { data, error } = await supabase.from('board').select();
      if (error) {
        throw new Error(error);
      }
      setData((prev) => ({
        ...prev,
        boards: data,
      }));
    };

    getBoards();
    getQualifications();
    getSubjects();
    getDecks();
  }, []);

  return (
    <Container maxW='4xl' p={{ base: 5, md: 12 }}>
      <Flex justifyContent='space-between' alignItems='center'>
        <Heading fontSize={'2xl'}>Welcome, {name}</Heading>
        <CreateDeck initialValues={data} />
      </Flex>
      <Heading fontSize={'xl'}> Your decks </Heading>
      <Divider my={4} />
      {decks.length === 0 ? (
        <Flex
          bg={'white'}
          w={'full'}
          h={'300px'}
          rounded={'lg'}
          border={'dashed'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Heading size={'sm'} color={'gray.500'}>
            No decks found
          </Heading>
        </Flex>
      ) : (
        <SimpleGrid spacing={6} mt={8} columns={2}>
          {decks.map((deck) => (
            <GridItem key={deck.topic_id}>
              <ProjectCard key={deck.topic_id} deck={deck} />
            </GridItem>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};
