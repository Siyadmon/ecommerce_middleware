import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRouting = () => {
  const navigate = useNavigate();
  const sessionStatus = JSON.parse(sessionStorage.getItem('user'));

  return <div>{sessionStatus === true ? <Outlet /> : navigate('/login')}</div>;
};

export default PrivateRouting;
