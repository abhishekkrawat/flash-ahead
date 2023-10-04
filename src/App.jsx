import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Decks from './pages/Decks/Decks';
import { Flashcard } from './pages/Flashcard/Flashcard';

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Routes>
            <Route path='/' element={<Home />} />,
            <Route path='/login' element={<Login />} />,
            <Route path='/register' element={<Register />} />
            <Route path='/decks' element={<Decks />} />
            <Route path='/flashcard/:deckId' element={<Flashcard />} />
          </Routes>
        </QueryParamProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
