import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => {
  return signOut(auth);
};

export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const changePassword = (newPassword) => {
  if (!auth.currentUser) {
    throw new Error("No authenticated user"); //TODO: better handling
  }

  return updatePassword(auth.currentUser, newPassword);
};

export const sendVerificationEmail = () => {
  if (!auth.currentUser) {
    throw new Error("No authenticated user"); //TODO: better handling
  }

  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/`,
  });
};
