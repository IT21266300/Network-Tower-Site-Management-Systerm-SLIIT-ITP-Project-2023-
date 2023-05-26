import React from 'react';

import { Store } from '../store';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RouteProtector = ({ children }) => {
    const location = useLocation();
  const { state } = useContext(Store);
  const { userInfo } = state;

  if (!userInfo) {
    return <Navigate to="/signin" state={{path: location.pathname}}/>;
  }

  return children;
};

export default RouteProtector;
