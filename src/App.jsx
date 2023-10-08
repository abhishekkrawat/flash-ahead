import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ChakraProvider } from '@chakra-ui/react';
import { Root as Home } from './pages/Home/Root';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import Decks from './pages/Decks/Decks';
import { Flashcard } from './pages/Flashcard/Flashcard';
import RootLayout from './layouts/RootLayout';

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Routes>
            <Route path='/' element={<RootLayout />}>
              <Route index element={<Home />} />,
              <Route path='/decks' element={<Decks />} />
              <Route path='/flashcard/:deckId' element={<Flashcard />} />
            </Route>
            <Route path='/login' element={<Login />} />,
            <Route path='/register' element={<Register />} />
          </Routes>
        </QueryParamProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
