

import React from 'react';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthRequire = ({children}) => {

  const user = useContext(UserContext);

  const navigate = useNavigate();

  if(user.isLoggedIn === false)
    navigate('/signin');

  return (
    <>
      {children}
    </>
  )
}

export default AuthRequire