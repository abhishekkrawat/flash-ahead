import {
  Avatar,
  Badge,
  Box,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Download, ExternalLink, Eye, Heart, MoreVertical } from 'react-feather';

export const DashCard = () => {
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
            {new Date('12-12-2002').toDateString()}
          </Text>
        </Stack>
        <Spacer />
        <Menu>
          <MenuButton mr={-1}>
            <Icon w='24px' h='24px' as={MoreVertical} />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<ExternalLink />}>View deck</MenuItem>
            <MenuItem icon={<Download />}>Download as PDF</MenuItem>
            <MenuItem icon={<Heart />}>Mark as favourite</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      {/* <Image
                h='250px'
                cursor={'pointer'}
                src={subjectData?.image}
                objectFit={'cover}
                overflow={'hidden'
                maxW='100%'
                mb='10px'
            /> */}
      <Heading
        cursor={'pointer'}
        onClick={() => console.log('')}
        color={'gray.700'}
        fontWeight={'semibold'}
        textAlign='start'
        fontSize='xl'
        w='100%'
        noOfLines={1}
      >
        Anurag
      </Heading>
      <Flex mt='10px' justify='space-between' w='100%' align='center'>
        <Badge
          borderRadius='9px'
          size='md'
          color={'gray.500'}
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          px={2}
        >
          New
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
