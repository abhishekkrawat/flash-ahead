import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './pages/Home';
import Subject from './pages/Subject/Subject';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter6Adapter}>
          <Routes>
            <Route path='/' element={<Home />} />,
            <Route path='/login' element={<Login />} />,
            <Route path='/register' element={<Register />} />
            <Route path='/subject/:subjectName' element={<Subject />} />
          </Routes>
        </QueryParamProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

export default App;
