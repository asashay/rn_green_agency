import * as Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCoHxNK5PT9geo7k9jyONq32ZV8D1XLKWg",
    authDomain: "rn-green-agency.firebaseapp.com",
    databaseURL: "https://rn-green-agency.firebaseio.com",
    storageBucket: "rn-green-agency.appspot.com",
    messagingSenderId: "602376811062",
};

const firebase = Firebase.initializeApp(config);

export default firebase;