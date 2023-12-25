import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Image,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import MobileNav from './MobileNav';
import { Menu, X } from 'react-feather';
import DesktopNav from './DesktopNav';
import { FlashAheadLogo } from '../../assets';

export const Root = () => {
  const { isOpen, onToggle } = useDisclosure();

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
          <LinkBox>
            <LinkOverlay href={'/'}>
              <Image blockSize={'12'} src={FlashAheadLogo} />
            </LinkOverlay>
          </LinkBox>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

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
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};
