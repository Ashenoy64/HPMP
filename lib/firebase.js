import {initializeApp} from "firebase/app"

import {getAuth} from "firebase/auth"


  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain:process.env.NEXT_PUBLIC_AUTHD,
    projectId: process.env.NEXT_PUBLIC_PID,
    storageBucket: process.env.NEXT_PUBLIC_SB,
    messagingSenderId: process.env.NEXT_PUBLIC_MSID,
    appId: process.env.NEXT_PUBLIC_APPID,
  };
  
  const app=initializeApp(firebaseConfig)

  export const auth=getAuth(app)
