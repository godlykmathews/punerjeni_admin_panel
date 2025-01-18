import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, AuthError } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCo0Rn2M_CFMb27olSKoTCI-72qALB7yQY",
  authDomain: "punarjani-41317.firebaseapp.com",
  projectId: "punarjani-41317",
  storageBucket: "punarjani-41317.firebasestorage.app",
  messagingSenderId: "1023874035127",
  appId: "1:1023874035127:web:553f995f8f1faa9379cc32",
  measurementId: "G-DYM1FCCXW0"
};

let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  throw error;
}

// Helper function to handle Firebase errors
export const getFirebaseErrorMessage = (error: AuthError) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Email already registered';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/operation-not-allowed':
      return 'Operation not allowed';
    case 'auth/weak-password':
      return 'Password is too weak';
    default:
      return 'An error occurred during authentication';
  }
};

// Initialize services with error handling
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics conditionally with error handling
const analytics = isSupported()
  .then(yes => yes ? getAnalytics(app) : null)
  .catch(error => {
    console.error("Error initializing analytics:", error);
    return null;
  });

export { analytics };