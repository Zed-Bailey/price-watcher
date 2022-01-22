import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Index from './pages/Index';
import Signup from './pages/Signup';
import Nav from './components/Nav'

function App() {
  return (
    <div className="App">
      <Router>
      <Nav />
        <Routes>
          <Route path="/" element={ <Index /> }/>
          <Route path="login" element={ <Login /> }/>
          <Route path="signup" element={ <Signup /> }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;