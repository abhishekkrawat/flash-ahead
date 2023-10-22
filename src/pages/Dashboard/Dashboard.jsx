import { Container, Divider, Heading, SimpleGrid } from '@chakra-ui/react';
import { Flex, Spacer } from '@chakra-ui/react';
import { DashCard } from './DashCard';
import { NewCard } from '../../components/NewCard';

export const Dashboard = () => {
  return (
    <>
      <Container maxW='container.lg' marginTop={16}>
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Heading>Dashboard</Heading>

          <Spacer />

          {/* <Button leftIcon={<Plus />} colorScheme='purple'>
            Add new
          </Button> */}
          <NewCard />
        </Flex>
        <Divider marginTop={2} marginBottom={2} />
        <SimpleGrid columns={2} spacing={5} pt={6}>
          <DashCard />
          <DashCard />
          <DashCard />
        </SimpleGrid>
      </Container>
    </>
  );
};
