import'./App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from './pages/Login';
import Home from './pages/authorized/Home';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Nav from './components/Nav'

import ProtectedRoute from './ProtectedRoute';


// determine the login status based on the local storage isAuthenticated and if the cookie exists and hasn't expired
function checkLoginStatus() {
  let isAuth = localStorage.getItem("isAuthenticated");
  let cookieExists = getCookie('token');
  if(isAuth && cookieExists !== null)
   return true;
  
  localStorage.setItem("isAuthenticated", false);
  return false;
}

// returns null when the cookie doesn't exist
// https://stackoverflow.com/a/52406518
function getCookie(name) {
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
  return match ? match[1] : null;
}

function App(props) {
  

  const [loggedIn, setLoggedIn] = React.useState(checkLoginStatus());

  const updateLoginState = (to) => {
    setLoggedIn(checkLoginStatus());
  };


    return (
      <div className="App">
        <Router>
        <Nav isLoggedIn={loggedIn} changeLoginStatus={updateLoginState}/>
          <Routes>
            <Route path="/" element={ <Index /> }/>
            <Route path="login" element={ <Login changeLoginStatus={updateLoginState}/> }/>
            <Route path="signup" element={ <Signup changeLoginStatus={updateLoginState} /> }/>
            <Route path="home" element={
              <ProtectedRoute redirectTo="/login">
                <Home/>
              </ProtectedRoute>
            }/>
            
          </Routes>
        </Router>
      </div>
    );
}

export default App;