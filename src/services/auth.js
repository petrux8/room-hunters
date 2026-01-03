import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

export const authServices = {
  signUp: (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  },

  signIn: (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  },

  signOutUser: () => {
    return signOut(auth);
  },

  resetPassword: (email) => {
    return sendPasswordResetEmail(auth, email);
  },

  changePassword: (newPassword) => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    return updatePassword(auth.currentUser, newPassword);
  },

  sendVerificationEmail: () => {
    if (!auth.currentUser) throw new Error("No authenticated user");
    return sendEmailVerification(auth.currentUser, {
      url: window.location.origin,
    });
  },

  signInWithGoogle: () => {
    return signInWithPopup(auth, googleProvider);
  },
};
