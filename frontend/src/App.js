import React from 'react'
import { Switch , Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import './App.css';
// import Header from './Header';
import LoginUser from './login';
import RegistrationForm from './register';


function App() {

  return (
    <BrowserRouter>
     {/* <Header/> */}
     <Switch>
     <Route exact path='/' component={RegistrationForm} />
     <Route exact path='/login'component={LoginUser} />
      </Switch>
  </BrowserRouter>
  );
}

export default App;
