import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBhOdv_WXr0pRmJTvcR8OwPSdex7gCPSMo",
  authDomain: "thrivr-1fec0.firebaseapp.com",
  projectId: "thrivr-1fec0",
  storageBucket: "thrivr-1fec0.firebasestorage.app",
  messagingSenderId: "176345556833",
  appId: "1:176345556833:web:bbd647b26e8fbed6124720",
  measurementId: "G-XH3529PB3Y",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider, signInWithPopup, analytics };
