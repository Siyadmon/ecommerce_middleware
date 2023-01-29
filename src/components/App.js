import React, { createContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ListProducts from './ListProducts';
import Register from './Register';
import '../css/styles.css';
import Login from './Login';
import { useSelector } from 'react-redux';
import PrivateRouting from './PrivateRouting';
import HandleProducts from './HandleProducts';

export const Context = createContext();
export const Context2 = createContext();

const App = () => {
  const navigate = useNavigate();

  const session = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (!session) {
      let status = false;
      sessionStorage.setItem('user', status);
    }
    navigate('/');
  }, []);

  const [show, setShow] = useState(false);
  const [regProduct, setRegProduct] = useState(false);

  return (
    <div>
      <Context.Provider value={[show, setShow]}>
        <Context2.Provider value={[regProduct, setRegProduct]}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register-user" element={<Register />} />
            <Route element={<PrivateRouting />}>
              <Route path="/list-products" element={<ListProducts />} />
              <Route path="/handle-products" element={<HandleProducts />} />
              <Route path="/handle-products" element={<HandleProducts />}>
                <Route path=":id" element={<HandleProducts />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Context2.Provider>
      </Context.Provider>
    </div>
  );
};

export default App;
