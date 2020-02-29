import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './Database/Firebase.js';
import Admin from './Admin/Admin.js';
import Shop from './Shop/Shop.js';

class App extends Component {
  constructor() {
    super();
    
    this.constants = {
      listOfAdmins: [
        "petr.kudlacek@broadcom.com",        
        "subtachyon@gmail.com"
      ],
      listOfShops: [
        "subcryptus@gmail.com"
      ],
      listOfGuides: [
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
  
  render() {
    return (
      <div className='app'>
        <header>
          {/* Is user logged in? */}
          {!this.state.user ?
          <button onClick={this.login}>Log In</button>   
          : 
          <div>
            <p>Username: {this.state.loggedInUserInfo.name}</p>
            <p>Email: {this.state.loggedInUserInfo.email}</p>        
          </div>
          }     
        </header>
        {/* Display content depending on the type of user you are */}
        {this.constants.listOfAdmins.includes(this.state.loggedInUserInfo.email) ?
        <Admin />
        : this.constants.listOfShops.includes(this.state.loggedInUserInfo.email) ?
        <Shop />
        : this.constants.listOfGuides.includes(this.state.loggedInUserInfo.email) ?
        <p>This is the guide app content.</p>
        : this.state.user ?
        <p>Your account is not currently active.</p>
        : 
        <p>Log in please.</p>
        }
      </div>  
    );
  }
}
export default App;