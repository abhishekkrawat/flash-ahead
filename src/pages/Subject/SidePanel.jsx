import { VStack, Text, Box, Checkbox, Divider, GridItem } from '@chakra-ui/react';

export const SidePanel = ({ qualifications, boards, subjects }) => {
  return (
    <>
      <GridItem rowSpan={2} colSpan={1}>
        <VStack p={5} spacing={8} align='stretch'>
          <Box h='100px' display={'flex'} flexDirection={'column'}>
            <Text fontSize='xl' mb={5} fontWeight='bold'>
              Qualification
            </Text>
            {qualifications.map((qual) => (
              <Checkbox key={qual.qualification_id}>{qual.qualification_name}</Checkbox>
            ))}
          </Box>
          <Divider />
          <Box h='130px' display={'flex'} flexDirection={'column'}>
            <Text fontSize='xl' mb={5} fontWeight='bold'>
              Board
            </Text>
            {boards.map((board) => (
              <Checkbox key={board.board_id}>{board.board_name}</Checkbox>
            ))}
          </Box>
          <Divider />
          <Box h='150px' display={'flex'} flexDirection={'column'}>
            <Text fontSize='xl' mb={5} fontWeight='bold'>
              Subjects
            </Text>
            {subjects.map((subject) => (
              <Checkbox key={subject.subject_id}>{subject.subject_name}</Checkbox>
            ))}
          </Box>
        </VStack>
      </GridItem>
    </>
  );
};
