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

  const app=initializeApp(FIREBASE_CONFIG)

  export const auth=getAuth(app)