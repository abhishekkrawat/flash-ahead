import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Image,
  LinkOverlay,
  LinkBox,
  Icon,
} from '@chakra-ui/react';
import { ChevronRight, LogOut } from 'react-feather';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { FlashAheadLogo } from '../../assets';

export const Root = () => {
  const [name, setName] = useState(null);
  const navigate = useNavigate();
  const getUserFirstName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setName(user.user_metadata.firstName);
    }
  };

  const userLogOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
    location.reload();
  };

  useEffect(() => {
    getUserFirstName();
  }, []);

  const NavAuth = () =>
    name ? (
      <Stack fontSize={'md'} fontWeight={500} direction='row' spacing={2}>
        <Button as={'a'} fontSize={'md'} fontWeight={500} href={'/dashboard'}>
          Dashboard
          <Icon as={ChevronRight} ml={1} />
        </Button>
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'md'}
          color={'white'}
          bg={'purple.400'}
          onClick={userLogOut}
          _hover={{ bg: 'purple.300' }}
        >
          Logout
          <Icon as={LogOut} ml={2} />
        </Button>
      </Stack>
    ) : (
      <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
        <Button
          as={'a'}
          data-testid='login-label'
          fontSize={'md'}
          fontWeight={500}
          variant={'link'}
          href={'/login'}
        >
          Log In
        </Button>
        <Button
          as={'a'}
          data-testid='register-label'
          display={{ base: 'none', md: 'inline-flex' }}
          fontSize={'md'}
          fontWeight={600}
          color={'white'}
          bg={'purple.400'}
          href={'/register'}
          _hover={{
            bg: 'purple.300',
          }}
        >
          Register
        </Button>
      </Stack>
    );

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        boxShadow={'md'}
      >
        <Flex
          flex={{ base: 1 }}
          justify={{ base: 'center', md: 'start' }}
          alignItems={'center'}
          gap={8}
        >
          <LinkBox>
            <LinkOverlay href={'/'}>
              <Image blockSize={'8'} src={FlashAheadLogo} />
            </LinkOverlay>
          </LinkBox>
          <Button as={'a'} variant={'ghost'} color={'purple.400'} cursor={'pointer'} href='/decks'>
            Decks
          </Button>
        </Flex>
        <NavAuth />
      </Flex>
    </Box>
  );
};
