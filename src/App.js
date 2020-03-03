import React, { Component } from 'react';
import './App.css';
import firebase, { auth, provider } from './Database/Firebase.js';
import Admin from './Admin/Admin.js';
import Shop from './Shop/Shop.js';
import Shopsale from './Shop/Shopsale.js';
import Guide from './Guide/Guide.js';
import GuideCheckSale from './Guide/GuideCheckSale.js';

class App extends Component {
  state = {
    loggedInUserInfo: {
      email: '',
      name: '',
      photoURL: '',
      role: ''
    },      
    user: null,
    data: [],
    pendingSaleData: [],
    saleCreated: false,
    saleID: '', //implement to make stuff (re)movable
    saleFound: false,
    saleFoundSum: '',
    saleFoundShopUser: '',
    saleFoundCode: ''
  }

  constructor() {
    super();
    this.login = this.login.bind(this);   
    this.logout = this.logout.bind(this);    
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

  listUsersByRole(role) {
    this.state.data.map((item) => {
      return (
      <p>{item.user}</p>
      )
  })
  }

  componentDidMount() {
    //Connecting to and loading the firebase database users into the data[] state
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

    //Connecting to and loading the firebase database pending sales
    const itemsPendingSalesRef = firebase.database().ref('pending sales');
    itemsPendingSalesRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];      
      for (let item in items) {
        newState.push({
          id: item,
          code: items[item].code,
          sum: items[item].sum,
          user: items[item].user
        });
      }
      this.setState({
        pendingSaleData: newState
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
        this.checkPendingSale();     
      });      
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
      //Wipe state clean
      this.setState({
        loggedInUserInfo: {
          email: '',
          name: '',
          photoURL: '',
          role: ''
        }
      });
  }

  addUserHandler( event ) {
    event.preventDefault();
    const itemsRef = firebase.database().ref('users');
    const item = {
      role: event.target.role.value,
      user: event.target.user.value
    }
    itemsRef.push(item);
  }

  generateSale = ( event ) => {
    event.preventDefault();
    const itemsRef = firebase.database().ref('pending sales');
    const item = {
      sum: event.target.sum.value,
      code: Math.random().toString(36).substring(4),
      user: this.state.loggedInUserInfo.email
    }
    if (event.target.sum.value > 0)
    {
      itemsRef.push(item);
      this.setState({
        saleCreated: true
      });
    }    
  }

  checkSale = ( event ) => {
    event.preventDefault();
    this.state.pendingSaleData.map((element) => { 
      if (element.code === event.target.code.value) {
        this.setState({
          saleFound: true,
          saleFoundSum: element.sum,
          saleFoundShopUser: element.user,
          saleFoundCode: event.target.code.value
        });
        return "";
      }
      else
      {
        return "";
      }
    })    
  }

  checkPendingSale = () => {
    this.state.pendingSaleData.map((element) => { 
      if (element.user === this.state.loggedInUserInfo.email) {
        this.setState({
          saleCreated: true
        });
        return "";
      }
      else
      {
        return "";
      }
    })    
  }

  //change this, right now it deletes ALL pending sales
  cancelSale = ( event ) => {
    const itemRef = firebase.database().ref(`/pending sales/`);
    itemRef.remove(); 
    this.setState({
      saleCreated: false,
      saleFound: false
    });  
  }

  //change this
  acceptSale = ( event ) => {
    //find the pending sale
    this.state.pendingSaleData.map((element) => { 
      if (element.code === this.status.saleFoundCode) {
        //create new entry in confirmed sales
        const itemsRef = firebase.database().ref('confirmed sales');
        const item = {
          sum: event.target.sum.value,
          user: this.status.saleFoundShopUser,
          signedBy: this.state.loggedInUserInfo.email
        }
        itemsRef.push(item);
      }
    })

    //delete pending sales
    const itemRef = firebase.database().ref(`/pending sales/`);
    itemRef.remove(); 
    this.setState({
      saleCreated: false,
      saleFound: false
    });  
  }

  //change this, right now it deletes ALL pending sales
  rejectSale = ( event ) => {
    const itemRef = firebase.database().ref(`/pending sales/`);
    itemRef.remove(); 
    this.setState({
      saleCreated: false,
      saleFound: false
    });  
  }
  
  render() {
    return (
      <div className='app'>
        <header>
          {/* Is user logged in? */}
          {!this.state.user ?
          <div>
            <button onClick={this.login}>Log In</button>
          </div>          
          :           
          <div>
            <button onClick={this.logout}>Log Out</button> 
            <p>Username: {this.state.loggedInUserInfo.name}</p>
            <p>Email: {this.state.loggedInUserInfo.email}</p>        
          </div>
          }     
        </header>
        {/* Display content depending on the type of user you are */}
        {this.state.loggedInUserInfo.role == "admin" ?
        <Admin data={this.state.data} submit={this.addUserHandler} />
        : this.state.loggedInUserInfo.role == "shop" ?
          [
          (this.state.saleCreated === false ?
          <Shop generateSale={this.generateSale} />
          : 
          <Shopsale loggedInUserInfo={this.state.loggedInUserInfo} pendingSaleData={this.state.pendingSaleData} cancelSale={this.cancelSale}/>
          )]

        : this.state.loggedInUserInfo.role == "guide" ?
          [
          (this.state.saleFound === false ?
            <Guide checkSale={this.checkSale} />
            :
            <GuideCheckSale pendingSaleData={this.state.pendingSaleData} saleFoundSum={this.state.saleFoundSum} saleFoundShopUser={this.state.saleFoundShopUser} acceptSale={this.acceptSale} rejectSale={this.rejectSale} />
          )]
        : this.state.user ?
        <p>Your account has not been activated.</p>
        : 
        <p>Log in please.</p>
        }
      </div>  
    );
  }
}
export default App;