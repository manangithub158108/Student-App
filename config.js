import firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDfZ5aI7iabvy1M0mVAbd6SHlrB2cF1QZ0",
    authDomain: "student-app-5eb98.firebaseapp.com",
    projectId: "student-app-5eb98",
    storageBucket: "student-app-5eb98.appspot.com",
    messagingSenderId: "854490863574",
    appId: "1:854490863574:web:a80d4a1d6cc8fdd8b3b677"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();