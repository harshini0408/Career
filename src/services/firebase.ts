import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signOut,
  setPersistence, 
  browserLocalPersistence 
} from 'firebase/auth';

// Your Firebase config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyBKIrhkniL7lEaBRFWdZLH4NgfOgfvpGjA",
  authDomain: "career-dd69a.firebaseapp.com",  
  projectId: "career-dd69a",
  storageBucket: "career-dd69a.firebasestorage.app",
  messagingSenderId: "60477443436",  
  appId: "1:60477443436:web:ffef58975b4bfafe17b749",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

// Set persistence
setPersistence(auth, browserLocalPersistence);

// Auth Functions
export const signup = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logout = () => {
  return signOut(auth);
};

export const getUserRole = async (uid: string): Promise<'school' | 'college' | 'professional'> => {
  const userDoc = doc(db, 'users', uid);
  const snapshot = await getDoc(userDoc);

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data.role;
  }
  return 'school'; // default if not found
};

export const saveUserRole = async (uid: string, role: 'school' | 'college' | 'professional') => {
  await setDoc(doc(db, 'users', uid), { role }, { merge: true });
};
