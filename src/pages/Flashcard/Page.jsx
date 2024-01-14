import { Flex } from '@chakra-ui/react';

export const Page = () => {
  return (
    <Flex justify={'center'} align={'center'} height='100vh'>
      <Flex
        width={'40%'}
        height={'90%'}
        borderWidth={'2px'}
        borderColor={'black'}
        position={'fixed'}
        margin={10}
        justify={'center'}
        align={'center'}
        flexDirection={'column'}
        gap={10}
      >
        <Flex
          width={'50%'}
          height={'30%'}
          borderWidth={'1px'}
          borderColor={'black'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          hi
        </Flex>
        <Flex
          width={'50%'}
          height={'30%'}
          borderWidth={'1px'}
          borderColor={'black'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          hi
        </Flex>
      </Flex>
    </Flex>
  );
};
