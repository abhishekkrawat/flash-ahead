import {
  VStack,
  Text,
  Box,
  Checkbox,
  Divider,
  GridItem,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
} from '@chakra-ui/react';
import { Search } from 'react-feather';
import { DelimitedArrayParam, useQueryParams, withDefault } from 'use-query-params';

const FilterParam = withDefault(DelimitedArrayParam, []);

export const SidePanel = ({ qualifications, boards, subjects }) => {
  const [filters, setFilters] = useQueryParams({ q: FilterParam, b: FilterParam, s: FilterParam });

  return (
    <>
      <GridItem rowSpan={2} colSpan={1}>
        <VStack alignItems='flex-start' position={'fixed'} justify={'space-between'}>
          <Box display={'flex'} flexDirection={'column'}>
            <Text fontSize={'xl'} fontWeight={'bold'} mb={2}>
              Search
            </Text>
            <InputGroup>
              <InputLeftElement pointerEvents={'none'}>
                <Icon color={'purple.400'} w={5} h={5} as={Search}></Icon>
              </InputLeftElement>
              <Input type='text' variant={'filled'} placeholder='e.g Numbers' />
            </InputGroup>
          </Box>
          <Divider />
          <Box display={'flex'} flexDirection={'column'}>
            <Text fontSize='large' mb={5} fontWeight='bold'>
              Qualification
            </Text>
            {qualifications.map((qual) => (
              <Checkbox
                key={qual.qualification_id}
                value={qual.qualification_name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      q: [...filters.q, e.target.value],
                    });
                  } else {
                    setFilters({
                      q: filters.q.filter((item) => item !== e.target.value),
                    });
                  }
                }}
              >
                {qual.qualification_name}
              </Checkbox>
            ))}
          </Box>
          <Divider />
          <Box h='130px' display={'flex'} flexDirection={'column'}>
            <Text fontSize='xl' mb={5} fontWeight='bold'>
              Board
            </Text>
            {boards.map((board) => (
              <Checkbox
                key={board.board_id}
                value={board.board_name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      b: [...filters.b, e.target.value],
                    });
                  } else {
                    setFilters({
                      b: filters.b.filter((item) => item !== e.target.value),
                    });
                  }
                }}
              >
                {board.board_name}
              </Checkbox>
            ))}
          </Box>
          <Divider />
          <Box h='150px' display={'flex'} flexDirection={'column'}>
            <Text fontSize='xl' mb={5} fontWeight='bold'>
              Subjects
            </Text>
            {subjects.map((subject) => (
              <Checkbox
                key={subject.subject_id}
                value={subject.subject_name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      s: [...filters.s, e.target.value],
                    });
                  } else {
                    setFilters({
                      s: filters.s.filter((item) => item !== e.target.value),
                    });
                  }
                }}
              >
                {subject.subject_name}
              </Checkbox>
            ))}
          </Box>
        </VStack>
      </GridItem>
    </>
  );
};
