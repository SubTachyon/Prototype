import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './Database/Firebase.js';

class App extends Component {
  constructor() {
    super();
    
    this.constants = {
      listOfAdmins: [
        "petr.kudlacek@broadcom.com",
        "subcryptus@gmail.com"
      ],
      listOfShops: [
        "subtachyon@gmail.com",
        "sublepton@gmail.com"
      ]
    }

    this.state = {
      loggedInUserInfo: {
        email: '',
        name: '',
        photoURL: ''
      },      
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
        //Pull out relevant info into our state object
        this.setState({
          loggedInUserInfo: {
            email: user.email,
            name: user.displayName,            
            photoURL: user.photoURL
          }
        });      
      });      
  }

  isAdmin(email)
  {
    if (this.constants.listOfAdmins.includes(email)) {
      return true;
    }
    return false;
  }

  isShop(email)
  {
    if (this.constants.listOfShops.includes(email)) {
      return true;
    }
    return false;
  }
  
  render() {
    return (
      <div className='app'>
        {!this.state.user ?
        <button onClick={this.login}>Log In</button>   
         : 
        <div>
          <p>Username: {this.state.loggedInUserInfo.name}</p>
          <p>Email: {this.state.loggedInUserInfo.email}</p>
          <img src={this.state.loggedInUserInfo.photoURL} />
        </div>
        }
        <div>
          <p>Your role is:</p>
          {this.isAdmin(this.state.loggedInUserInfo.email) ?
          <p>Admin!</p>
          :
          <p>pleb...</p>
          }
        </div>
      </div>  
    );
  }
}
export default App;