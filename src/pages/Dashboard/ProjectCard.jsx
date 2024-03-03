import {
  Text,
  Image,
  Flex,
  Stack,
  Heading,
  Badge,
  Avatar,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { data } from '../Decks/data';
import { supabase } from 'lib/supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ deck }) => {
  const subjectData = data.find((subject) => subject.subjectId === deck.subject_id);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

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

  const handleNavigation = () => {
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
  };

  return (
    <Flex
      bg={'white'}
      p={4}
      maxW={'445px'}
      borderWidth={'1px'}
      boxShadow={'md'}
      rounded={'md'}
      alignItems='center'
      direction='column'
    >
      <Flex w='100%' mb='25px' gap={2}>
        <Avatar name={name} w={'36px'} h={'36px'} />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontSize={'sm'}>{name}</Text>
          <Text color={'gray.500'} fontSize={'xs'}>
            {new Date().toDateString()}
          </Text>
        </Stack>
        <Spacer />
      </Flex>
      <Image
        h='200px'
        cursor={'pointer'}
        onClick={handleNavigation}
        src={subjectData?.image}
        objectFit={'cover'}
        overflow={'hidden'}
        maxW='100%'
        mb='10px'
        transition='transform 0.5s ease-in'
        _hover={{
          transform: 'scale(1.05)',
        }}
      />
      <Heading
        cursor={'pointer'}
        onClick={handleNavigation}
        color={'gray.700'}
        fontWeight={'semibold'}
        textAlign='start'
        fontSize='xl'
        w='100%'
        noOfLines={1}
      >
        {deck.topic_name}
      </Heading>
      <Flex mt='10px' justify='space-between' w='100%' align='center'>
        <Badge
          borderRadius='9px'
          size='md'
          color={`${subjectData?.color}.500`}
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          px={2}
        >
          {subjectData?.subjectName}
        </Badge>
      </Flex>
    </Flex>
  );
};

export default ProjectCard;
