import {initializeApp} from "firebase/app"

import {getAuth} from "firebase/auth"
const FIREBASE_CONFIG = {
    apiKey: "AIzaSyD3juHwbpCVDzxOKvp5mGpccN9Sn58tG7U",
    authDomain: "dbms-project-397d6.firebaseapp.com",
    projectId: "dbms-project-397d6",
    storageBucket: "dbms-project-397d6.appspot.com",
    messagingSenderId: "510383273265",
    appId: "1:510383273265:web:d11cfa57119d66e8376c10"
  }

  const firebaseConfig = {
    apiKey: "AIzaSyDjoUZ2CNrmwsXl01gZHjPje9rstO9UB1A",
    authDomain: "dbms-1f315.firebaseapp.com",
    projectId: "dbms-1f315",
    storageBucket: "dbms-1f315.appspot.com",
    messagingSenderId: "769843251386",
    appId: "1:769843251386:web:823e8b9ec26d5ae7bada83"
  };
  
  const firebaseConfig1 = {
    apiKey: "AIzaSyDe2ayrcZdZykCWM276TvuVz-U7lG4gXWs",
    authDomain: "dbms-91295.firebaseapp.com",
    projectId: "dbms-91295",
    storageBucket: "dbms-91295.appspot.com",
    messagingSenderId: "976281481598",
    appId: "1:976281481598:web:8b79c76fab8c312e4cc32f"
  };
  const app=initializeApp(FIREBASE_CONFIG)
  // export const app=initializeApp(firebaseConfig)
  // const app=initializeApp(firebaseConfig1)
  export const auth=getAuth(app)
