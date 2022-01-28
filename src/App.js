import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from './pages/Login';
import Home from './pages/authorized/Home';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Nav from './components/Nav'

import ProtectedRoute from './ProtectedRoute';


/*
TODO fetch watching products from api
TODO add product to watch
TODO add delete product functionality
TODO add edit product functionality

TODO make nav buttons change based on logged in status

*/
function App(props) {
  
  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem("isAuthenticated"));

  const updateLoginState = (to) => {
    setLoggedIn(to);
  };

    return (
      <div className="App">
        <Router>
        <Nav isLoggedIn={loggedIn} changeLoginStatus={updateLoginState}/>
          <Routes>
            <Route path="/" element={ <Index /> }/>
            <Route path="login" element={ <Login changeLoginStatus={updateLoginState}/> }/>
            <Route path="signup" element={ <Signup /> }/>
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