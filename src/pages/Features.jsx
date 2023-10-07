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
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
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
    <Container maxW={'6xl'} mt={12}>
      <Flex flexWrap='wrap' gridGap={20} justify='center' maxH={'20'}>
        <Card
          heading={'Create Your Own Flashcards'}
          icon={<Icon as={CreditCard} w={8} h={8} />}
          description={
            'Our intuitive flashcard creator empowers you to craft personalized study materials effortlessly. Tailor your learning experience with custom flashcards that suit your unique needs, whether its for exam preparation, language learning, or mastering new concepts.'
          }
        />
        <Card
          heading={'Export as PDF'}
          icon={<Icon as={FileText} w={8} h={8} />}
          description={
            'Prepare for offline study or presentations by exporting your content as high-quality, print-ready PDFs. Maintain the same visual clarity and layout when you transition from screen to paper.'
          }
        />
        <Card
          heading={'Boost Your Productivity'}
          icon={<Icon as={Zap} w={8} h={8} />}
          description={
            'Our productivity tools are designed to supercharge your workflow. Access a suite of features that help you manage tasks, deadlines, and projects with precision.'
          }
        />
      </Flex>
    </Container>
  );
};
