import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { Context } from '../context/Context';

const PublicRoute = ({children}) => {
  const {user, setUser} = useContext(Context);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  });
  if(user) {
    return <Navigate to="/" replace={true} />
  }
  return children;
}

export default PublicRoute