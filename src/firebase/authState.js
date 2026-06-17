import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // VERY IMPORTANT
      resolve(user);
    });
  });
};