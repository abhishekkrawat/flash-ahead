import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Subject from './pages/Subject/Subject';
import { Flashcard } from './pages/Flashcard/Flashcard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element={<Home />} />,
      <Route path='/login' element={<Login />} />,
      <Route path='/register' element={<Register />} />
      <Route path='/subject/:subjectName' element={<Subject />} />
      <Route path='/flashcard' element={<Flashcard />} />
    </Route>,
  ),
);

const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
