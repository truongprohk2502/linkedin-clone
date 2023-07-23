// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0wgH6Fth-XqH-P0y-fLfTWXCPkeS6oqY",
  authDomain: "linkedin-clone-31476.firebaseapp.com",
  projectId: "linkedin-clone-31476",
  storageBucket: "linkedin-clone-31476.appspot.com",
  messagingSenderId: "479888655396",
  appId: "1:479888655396:web:92d59219581030da0884b1",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseFirestore = getFirestore(firebaseApp);
const firebaseStorage = getStorage(firebaseApp);

export { firebaseApp, firebaseAuth, firebaseFirestore, firebaseStorage };
