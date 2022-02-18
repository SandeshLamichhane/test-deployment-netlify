

import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from "firebase/auth" // New import
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"


const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEYS,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_API_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});
export const auth = getAuth(app)

export const db = getFirestore(app)

export const storage = getStorage(app)