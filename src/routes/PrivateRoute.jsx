import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Context } from '../context/Context';

const PrivateRoute = ({children}) => {
  const {user} = useContext(Context);

  if(!user) {
    return <Navigate to="/login" replace={true} />
  }
  return children;
}

export default PrivateRoute