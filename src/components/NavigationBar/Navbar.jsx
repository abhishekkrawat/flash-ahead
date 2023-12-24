import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import MobileNav from './MobileNav';
import { Menu, X } from 'react-feather';
import DesktopNav from './DesktopNav';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [name, setName] = useState(null);

  const getUserFirstName = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setName(user.user_metadata.firstName);
    }
  };

  useEffect(() => {
    getUserFirstName();
  }, []);

  const NavAuth = () =>
    name ? (
      <Box fontSize={'md'} fontWeight={500}>
        Hi, {name}
      </Box>
    ) : (
      <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
        <Button as={'a'} fontSize={'md'} fontWeight={500} variant={'link'} href={'/login'}>
          Log In
        </Button>
        <Button
          as={'a'}
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
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <X w={3} h={3} /> : <Menu w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}
          >
            FlashAhead
          </Text>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        <NavAuth />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;
