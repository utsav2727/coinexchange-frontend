

import React from 'react';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = ({children}) => {

  const user = useContext(UserContext);

  const navigate = useNavigate();

  if(user.isLoggedIn === true)
    navigate('/');

  return (
    <>
      {children}
    </>
  )
}

export default Auth