import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './Database/Firebase.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInUserInfo: {
        email: '',
        name: '',
        photoURL: ''
      },
      items: [],
      user: null
    }

    this.login = this.login.bind(this);
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
        this.setState({
          loggedInUserInfo: {
            email: user.email,
            name: user.displayName,            
            photoURL: user.photoURL
          }
        });
      });      
  }
  
  render() {
    return (
      <div className='app'>
        <button onClick={this.login}>Log In</button>   
        <div>
          <p>Username: {this.state.loggedInUserInfo.name}</p>
          <p>Email: {this.state.loggedInUserInfo.email}</p>
        </div>
      </div>  
    );
  }
}
export default App;