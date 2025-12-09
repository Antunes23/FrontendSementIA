// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBgs19CE_RzrjYv2hJRysbTyHejtRtczI4",
  authDomain: "projeto-final-70089.firebaseapp.com",
  databaseURL: "https://projeto-final-70089-default-rtdb.firebaseio.com",
  projectId: "projeto-final-70089",
  storageBucket: "projeto-final-70089.firebasestorage.app",
  messagingSenderId: "376496447783",
  appId: "1:376496447783:web:46127a9704db6d40548902",
  measurementId: "G-XB2K2Q75RF"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);