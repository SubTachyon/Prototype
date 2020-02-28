import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyCjvHM8Cvd4mFoGLZjX-FUdTKX7BFuKGhQ",
    authDomain: "prototype-4442e.firebaseapp.com",
    databaseURL: "https://prototype-4442e.firebaseio.com",
    projectId: "prototype-4442e",
    storageBucket: "prototype-4442e.appspot.com",
    messagingSenderId: "720649526650",
    appId: "1:720649526650:web:1001c2a87d77b0164e0ac3"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;