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

export const Card = ({ name, date, subjectId, handleNavigation }) => {
  const subjectData = data.find((subject) => subject.subjectId === subjectId);

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
        <Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} />
        <Stack direction={'column'} spacing={0} fontSize={'sm'}>
          <Text fontSize={'sm'}>Abhishek Rawat</Text>

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
            <MenuItem icon={<Download />}>Download as PDF</MenuItem>
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
        >
          {subjectData?.subjectName}
        </Badge>
        <Box display={'inline-flex'} justifyContent={'center'} alignItems={'center'} gap={1}>
          <Icon color={'gray.500'} width='1rem' height='1rem' as={Eye} />
          <Text fontSize={'xs'} color='gray.500'>
            10
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
