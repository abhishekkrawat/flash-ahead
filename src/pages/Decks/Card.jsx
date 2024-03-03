import {
  Avatar,
  Badge,
  Flex,
  Icon,
  Image,
  Text,
  Stack,
  Spacer,
  Box,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
  Heading,
} from '@chakra-ui/react';
import { data } from './data';
import { Download, ExternalLink, Eye, Heart, MoreVertical } from 'react-feather';
import { generatePDF } from './generatePDF';
import { supabase } from 'lib/supabaseClient';

export const Card = ({ name, date, subjectId, handleNavigation, topicId, user, views }) => {
  const subjectData = data.find((subject) => subject.subjectId === subjectId);

  const getFlashcards = async () => {
    const { data, error } = await supabase
      .from('flashcard')
      .select('flashcard_id, flashcard_front, flashcard_back, user_id')
      .eq('topic_id', topicId);

    if (error) {
      throw new Error(error);
    }

    return data;
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
        <Avatar name={user} bg={`${subjectData?.color}.400`} w={'36px'} h={'36px'} />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontSize={'sm'}>{user}</Text>

          <Text color={'gray.500'} fontSize={'xs'}>
            {new Date(date).toDateString()}
          </Text>
        </Stack>
        <Spacer />
        <Menu>
          <MenuButton mr={-1}>
            <Icon w='24px' h='24px' as={MoreVertical} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<ExternalLink />} onClick={handleNavigation}>
              View deck
            </MenuItem>
            <MenuItem icon={<Download />} onClick={async () => generatePDF(await getFlashcards())}>
              Download as PDF
            </MenuItem>
            <MenuItem icon={<Heart />}>Mark as favourite</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Image
        h='250px'
        cursor={'pointer'}
        onClick={handleNavigation}
        src={subjectData?.image}
        objectFit={'cover'}
        overflow={'hidden'}
        maxW='100%'
        mb='10px'
        transition='transform 0.6s ease-in-out'
        _hover={{
          transform: 'scale(1.15)',
        }}
      />
      <Heading
        data-testid='deck-name-label'
        cursor={'pointer'}
        onClick={handleNavigation}
        color={'gray.700'}
        fontWeight={'semibold'}
        textAlign='start'
        fontSize='xl'
        w='100%'
        noOfLines={1}
      >
        {name}
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
          data-testid='subject-name-label'
        >
          {subjectData?.subjectName}
        </Badge>
        <Box display={'inline-flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
          <Icon color={'gray.500'} width='1rem' height='1rem' as={Eye} />
          <Text fontSize={'sm'} color='gray.500'>
            {views}
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
