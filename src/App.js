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
class App extends React.Component {

  state = {
    loggedIn : localStorage.getItem("isAuthenticated")
  };

  constructor(props) {
    super(props);
    this.updateLoginStatus = this.updateLoginStatus.bind(this);
  }


  updateLoginStatus(to) {
    this.setState({loggedIn: to});
    console.log("updated login status")
  }


  render(){
    return (
      <div className="App">
        <Router>
        <Nav isLoggedIn={this.state.loggedIn} loginHandler={this.updateLoginStatus}/>
          <Routes>
            <Route path="/" element={ <Index /> }/>
            <Route path="login" element={ <Login loginHandler={this.updateLoginStatus}/> }/>
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
}

export default App;