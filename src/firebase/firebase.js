import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBI9tN1ypKKJNW0kjV8mhXfiyybMkInXaI",
  authDomain: "rfid-smart-library-system.firebaseapp.com",
  databaseURL: "https://rfid-smart-library-system-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rfid-smart-library-system",
  storageBucket: "rfid-smart-library-system.firebasestorage.app",
  messagingSenderId: "189565536746",
  appId: "1:189565536746:web:e447a09317510a0ed58a93"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };

/*PS D:\vs_code_c++_codes\RFID_react_code> Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
PS D:\vs_code_c++_codes\RFID_react_code> cd smart-library
PS D:\vs_code_c++_codes\RFID_react_code\smart-library> npm start*/