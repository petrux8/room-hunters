import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const googleProvider = new GoogleAuthProvider();

export const authServices = {
  signUp: (email, password, firstName, lastName) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const displayName = `${firstName} ${lastName}`;
        await updateProfile(user, { displayName });

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: user.email,
          displayName,
          role: "user",
          createdAt: serverTimestamp(),
        });

        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
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
    return new Promise(async (resolve, reject) => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        const userDocRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || null,
            role: "user",
            createdAt: serverTimestamp(),
          });
        }

        resolve(user);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
};
