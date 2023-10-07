import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { CreditCard, FileText, Zap } from 'react-feather';

const Card = ({ heading, description, icon }) => {
  return (
    <Box
      maxW={{ base: 'full', md: '400px' }}
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p={5}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'black'}
          rounded={'full'}
          bg={useColorModeValue('purple.100', 'black')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size='md'>{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export const Features = () => {
  return (
    <Container maxW={'8xl'} mt={12}>
      <Flex flexWrap='wrap' gridGap={10} justify='center' maxH={'20'}>
        <Card
          heading={'Create Your Own Flashcards'}
          icon={<Icon as={CreditCard} w={8} h={8} />}
          description={
            'Tailor your learning experience with custom flashcards that suit your unique needs, whether its for exam preparation, or mastering new concepts.'
          }
        />
        <Card
          heading={'Export as PDF'}
          icon={<Icon as={FileText} w={8} h={8} />}
          description={
            'Prepare for offline study or presentations by exporting your content as high-quality, print-ready PDFs.'
          }
        />
        <Card
          heading={'Boost Your Productivity'}
          icon={<Icon as={Zap} w={8} h={8} />}
          description={
            'Set clear goals, create high quality flashcards and organize them, eliminate distractions and much more.'
          }
        />
      </Flex>
    </Container>
  );
};
