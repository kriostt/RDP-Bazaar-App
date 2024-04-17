// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNlRkQNW5tZr88qnrztaqHGGzyDisSoRQ",
  authDomain: "rdpuserimages.firebaseapp.com",
  projectId: "rdpuserimages",
  storageBucket: "rdpuserimages.appspot.com",
  messagingSenderId: "424863138212",
  appId: "1:424863138212:web:7f33da1c97a21971308131"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);