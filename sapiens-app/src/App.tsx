import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import LoginComponent from './components/Login/login';
import PropertyComponent from './components/Property/property';
// import SignupComponent from './components/Login/signup';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <nav className='container'>
          <Link to="/" className='me-2'>Home</Link>
          <Link to="/login" className='me-2'>Login</Link>
          <Link to="/signup" className='me-2'>SignUp</Link>
        </nav> */}
      </header>

      <Router>
        <Routes>
          <Route path="/login" Component={LoginComponent} />
          <Route path="/" Component={PropertyComponent} />
          {/* <Route path="/signup" Component={SignupComponent} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
