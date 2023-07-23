import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseAuth } from "../firebaseConfig";

const loginAPI = (email: string, password: string) => {
  return signInWithEmailAndPassword(firebaseAuth, email, password);
};

const registerAPI = (email: string, password: string) => {
  return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

const logoutAPI = () => {
  return signOut(firebaseAuth);
};

export { loginAPI, registerAPI, logoutAPI };
