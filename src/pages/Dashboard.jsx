import { IconButton } from '@chakra-ui/button';
import Navbar from '../components/NavigationBar/Navbar';
import { Plus } from 'react-feather';

export const Dashboard = () => {
  return (
    <>
      <Navbar />
      <IconButton display={'flex'} minW={'xs'} minH={'xs'} marginLeft={'10'} marginTop={'32'}>
        <Plus size={'60px'} />
      </IconButton>
    </>
  );
};
