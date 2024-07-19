import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  set,
  ref,
  update,
  push,
  onValue,
} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCdSTk67UNjPg4GJv9c6YmZm0PdiM82gG0",
  authDomain: "react-contact-721ed.firebaseapp.com",
  projectId: "react-contact-721ed",
  storageBucket: "react-contact-721ed.appspot.com",
  messagingSenderId: "1089149356421",
  appId: "1:1089149356421:web:15f9243ebfc971ba20dcec",
  dbURL: "",
};

const app = initializeApp(firebaseConfig);
export const fireDb = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
