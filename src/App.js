import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Header from './Header/Header.js';
import Get from './Components/Get/Get.js';
import Film from './Components/Film/Film.js';
import Post from './Components/Post/Post.js';
import UserList from './Components/UserList/UserList.js';
import Login from './Components/Login/Login.js';
import Dashboard from './Components/Login/Dashboard.js';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          <Route exact path='/' component={Get}/>
          <Route path='/film' component={Film}/>
          <Route path='/post' component={Post}/>
          <Route path='/users' component={UserList}/> 
          <Route path='/login' component={Login}/>  
          <Route path='/dashboard/:userId' component={Dashboard}/>   

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
