import React from 'react';
import {Navigate} from 'react-router-dom';

// https://dev.to/olumidesamuel_/implementing-protected-route-and-authentication-in-react-js-3cl4
// https://stackoverflow.com/a/69907150
function ProtectedRoute({children, redirectTo}) {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  // if user is not authenticated, redirect them to the login page
  return isAuthenticated ? children : <Navigate to={redirectTo}/>
}

export default ProtectedRoute;