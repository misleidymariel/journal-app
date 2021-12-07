
import { initializeApp } from 'firebase/app';

import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyD7laorVZwEaYl4UySY3rHlHVemXgTgo3s",
    authDomain: "journal-app-71f4b.firebaseapp.com",
    projectId: "journal-app-71f4b",
    storageBucket: "journal-app-71f4b.appspot.com",
    messagingSenderId: "774182778670",
    appId: "1:774182778670:web:44885ae0ba61ce512eacbf"
};

  // Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    app

}