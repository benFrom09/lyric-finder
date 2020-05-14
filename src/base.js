import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDs6ThzhzxHxQt5BkrIC8hZWpYm9B-EgYE",
    authDomain: "lyrics-find.firebaseapp.com",
    databaseURL: "https://lyrics-find.firebaseio.com",
    projectId: "lyrics-find",
    storageBucket: "lyrics-find.appspot.com",
    messagingSenderId: "1095665025170",
    appId: "1:1095665025170:web:909d1299121ba2a10b264b"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const base = Rebase.createClass(firebase.database());

export {firebaseApp };
export default base;