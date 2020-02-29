import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './Database/Firebase.js';
import Admin from './Admin/Admin.js';
import Shop from './Shop/Shop.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInUserInfo: {
        email: '',
        name: '',
        photoURL: '',
        role: ''
      },      
      user: null,
      data: []
    }

    this.login = this.login.bind(this);
  }

  //Search database for a user and return his role
  searchForRole(userEmail, objectArray) {    
    const result = objectArray.find((element) => {      
      return element.user === userEmail;      
    })
    if (result !== undefined)
    {
      return result.role;
    }
    else {
      return "No role found.";
    }
  }

  //Connecting to and loading the firebase database into the data[] state
  componentDidMount() {
    const itemsRef = firebase.database().ref('users');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          role: items[item].role,
          user: items[item].user
        });
      }
      this.setState({
        data: newState
      });
    });
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
            photoURL: user.photoURL,
            role: this.searchForRole(user.email, this.state.data)
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
        {this.state.loggedInUserInfo.role == "admin" ?
        <Admin />
        : this.state.loggedInUserInfo.role == "shop" ?
        <Shop />
        : this.state.loggedInUserInfo.role == "guide" ?
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